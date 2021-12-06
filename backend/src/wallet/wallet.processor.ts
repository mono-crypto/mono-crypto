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
    const updatedWalletItem = job.data.updatedWalletItem;
    console.log('processor: ', updatedWalletItem);
    const defaultConvertMarket = 'BTC';
    const defaultBTCConvertMarket = 'USDT';

    const endDate = new Date(updatedWalletItem.date);
    endDate.setDate(endDate.getDate() + 1);

    const avgCurrencyPriceArray = await this.binanceService.getAvgPriceForTime(
      updatedWalletItem.ticker,
      defaultConvertMarket,
      updatedWalletItem.date,
      endDate,
      '1d',
    );

    const avgBTCPriceToUSDTArray = await this.binanceService.getAvgPriceForTime(
      'BTC',
      defaultBTCConvertMarket,
      updatedWalletItem.date,
      endDate,
      '1d',
    );

    const updateObj = {
      _id: updatedWalletItem._id,
      avgPriceByDate:
        avgCurrencyPriceArray.length > 0 ? avgCurrencyPriceArray[0] : 0,
      USDTPricePerBTCByDate:
        avgBTCPriceToUSDTArray.length > 0 ? avgBTCPriceToUSDTArray[0] : 0,
      convertMarket: defaultConvertMarket,
    };

    await this.walletService.update(updateObj);
  }

  @OnQueueFailed()
  onFailed(job: Job, err: Error) {
    console.log('failed: ', job, err);
  }
}
