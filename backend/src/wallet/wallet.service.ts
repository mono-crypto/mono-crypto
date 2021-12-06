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
import { IexCloudService } from '../iex-cloud/iex-cloud.service';

@Injectable()
export class WalletService {
  constructor(
    @InjectModel(Wallet.name) private walletModel: Model<WalletDocument>,
    @InjectQueue('walletItemCalc') private audioQueue: Queue,
    private authService: AuthService,
    private iexCloudService: IexCloudService,
  ) {}

  async create(createWalletDto: CreateWalletDto): Promise<any> {
    const user = await this.authService.getUserForAPIRequest(
      createWalletDto.access_token,
    );

    //current MARKET to BTC data
    const tickerCurrentPrice = await this.iexCloudService
      .getCurrentPriceByMarket(createWalletDto.ticker + createWalletDto.market)
      .toPromise();

    //current MARKET to BTC data
    const btcPrice = await this.iexCloudService
      .getCurrentPriceByMarket(createWalletDto.market + 'BTC')
      .toPromise();

    // console.log('btcPrice: ', btcPrice)
    const newCreateWalletDto = {
      ...createWalletDto,
      tickerCurrentPrice: tickerCurrentPrice,
      user: user,
    };
    // console.log('newCreateWalletDto: ', newCreateWalletDto)

    const createdWalletItem = new this.walletModel(newCreateWalletDto);

    return createdWalletItem.save(() => {
      console.log('createdWalletItem.save');
      this.audioQueue.add('updateWalletConvetPrice', {
        updatedWalletItem: createdWalletItem,
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
            tickerCurrentPrice: 1,
            avgPriceByDate: 1,
            convertMarket: 1,
            USDTPricePerBTCByDate: 1,
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
            avgPriceByDate: { $push: '$avgPriceByDate' },
            convertMarket: { $addToSet: '$convertMarket' },
            USDTPricePerBTCByDate: { $push: '$USDTPricePerBTCByDate' },
            tickerCurrentPrice: { $addToSet: '$tickerCurrentPrice' },
            purchaseAmount: {
              $sum: {
                $multiply: [
                  '$USDTPricePerBTCByDate',
                  '$tickerCurrentPrice',
                  '$price',
                  '$ea',
                ],
              },
            }, // 삭제필요
          },
        },
        { $sort: { purchaseAmount: -1 } },
      ],
      (err, res) => {
        console.log(err, 'findUserWalletList:', res);
      },
    );
  }

  findOne(id: number) {
    return `This action returns a #${id} wallet`;
  }

  historyUpdate(updateWalletDto: UpdateWalletDto) {
    return this.walletModel.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(updateWalletDto._id) },
      updateWalletDto,
      null,
      (err, res) => {
        const updatedWalletItem = res;
        this.audioQueue.add('updateWalletConvetPrice', {
          updatedWalletItem: updatedWalletItem,
        });
      },
    );
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
