import { Processor, Process, OnQueueFailed } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { BinanceService } from 'src/binance/binance.service';
import { WalletService } from 'src/wallet/wallet.service';

// import * as mongoose from 'mongoose';
// import { WalletSchema } from 'src/schemas/wallet.schema';

@Processor('walletItemCalc')
export class WalletConsumer {
  constructor(
    private readonly binanceService: BinanceService,
    private readonly walletService: WalletService,
  ) {}
  private readonly logger = new Logger(this.constructor.name);
  // private walletModel = mongoose.model('walletModel', WalletSchema)

  @Process('updateWalletConvetPrice')
  async updateWalletConvetPrice(job: Job<any>) {
    const createdWalletItem = job.data.createdWalletItem;
    const defaultConvertMarket = 'BTC';

    const avgPriceArray = await this.binanceService.getAvgPriceForTime(
      createdWalletItem.ticker,
      defaultConvertMarket,
      createdWalletItem.date,
    );

    const updateObj = {
      _id: createdWalletItem._id,
      convertPrice: avgPriceArray.length > 0 ? avgPriceArray[0] : 0,
      convertMarket: defaultConvertMarket,
    };

    await this.walletService.update(updateObj);
  }

  @OnQueueFailed()
  onFailed(job: Job, err: Error) {
    console.log('failed: ', job, err);
  }
}
