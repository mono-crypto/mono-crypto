import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { Injectable } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { DeleteWalletDto } from './dto/delete-wallet.dto';
import { InjectModel } from '@nestjs/mongoose';

import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

import { Wallet, WalletDocument } from '../schemas/wallet.schema';

@Injectable()
export class WalletService {
  constructor(
    @InjectModel(Wallet.name) private walletModel: Model<WalletDocument>,
    @InjectQueue('walletItemCalc') private audioQueue: Queue,
  ) {}

  async create(createWalletDto: CreateWalletDto): Promise<any> {
    const createdWalletItem = new this.walletModel(createWalletDto);

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

  remove(deleteWalletDto: DeleteWalletDto) {
    return this.walletModel.deleteOne({
      _id: mongoose.Types.ObjectId(deleteWalletDto.ObjectId),
    });
  }
}
