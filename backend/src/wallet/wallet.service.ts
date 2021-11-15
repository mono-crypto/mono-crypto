import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { Injectable } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { DeleteWalletDto, DeleteTransactionDto } from './dto/delete-wallet.dto';
import { InjectModel } from '@nestjs/mongoose';

import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

import { Wallet, WalletDocument } from '../schemas/wallet.schema';

import { AuthService } from '../auth/auth.service';

@Injectable()
export class WalletService {
  constructor(
    @InjectModel(Wallet.name) private walletModel: Model<WalletDocument>,
    @InjectQueue('walletItemCalc') private audioQueue: Queue,
    private authService: AuthService,
  ) {}

  async create(createWalletDto: CreateWalletDto): Promise<any> {
    const user = await this.authService.getUserForAPIRequest(
      createWalletDto.access_token,
    );

    const newCreateWalletDto = {
      ...createWalletDto,
      user: user,
    };

    const createdWalletItem = new this.walletModel(newCreateWalletDto);

    return createdWalletItem.save(() => {
      console.log('createdWalletItem.save');
      this.audioQueue.add('updateWalletConvetPrice', {
        createdWalletItem: createdWalletItem,
      });
    });
  }

  async getUserWalletItemHistory(id: number, ticker: string) {
    return this.walletModel.find(
      {
        'user.google_id': Number(id),
        ticker: ticker,
      },
      (err, res) => {
        console.log(err, res);
      },
    );
  }

  async findUserWalletList(id: number): Promise<Wallet[]> {
    return this.walletModel.aggregate(
      [
        { $match: { 'user.google_id': Number(id) } },
        {
          $project: {
            _id: 1,
            ticker: 1,
            totalPrice: { $multiply: ['$price', '$ea'] },
            ea: 1,
            price: 1,
            market: 1,
            convertPrice: 1,
            convertMarket: 1,
          },
        },
        {
          $group: {
            _id: '$ticker',
            totalPrice: { $push: '$totalPrice' },
            price: { $push: '$price' },
            ea: { $push: '$ea' },
            market: { $push: '$market' },
            ticker: { $addToSet: '$ticker' },
            convertPriceAvg: { $avg: '$convertPrice' },
            convertMarket: { $addToSet: '$convertMarket' },
          },
        },
      ],
      (err, res) => {
        console.log(err, 'findUserWalletList:', res);
      },
    );
  }

  findOne(id: number) {
    return `This action returns a #${id} wallet`;
  }

  update(updateWalletDto: UpdateWalletDto) {
    return this.walletModel.updateOne(
      { _id: mongoose.Types.ObjectId(updateWalletDto._id) },
      updateWalletDto,
    );
  }

  async removeTicker(deleteWalletDto: DeleteWalletDto) {
    const user = await this.authService.getUserForAPIRequest(
      deleteWalletDto.access_token,
    );

    return this.walletModel.deleteMany({
      'user.google_id': user.google_id,
      ticker: deleteWalletDto.ticker,
    });
  }

  async removeTransaction(deleteTransactionDto: DeleteTransactionDto) {
    const user = await this.authService.getUserForAPIRequest(
      deleteTransactionDto.access_token,
    );

    return this.walletModel.deleteOne({
      'user.google_id': user.google_id,
      _id: deleteTransactionDto._id,
    });
  }
}
