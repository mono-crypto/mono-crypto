import { Controller, Get, Param } from '@nestjs/common';
import { BinanceService } from './binance.service';

@Controller('binance')
export class BinanceController {
  constructor(private readonly binanceService: BinanceService) {}

  @Get('getAvgPriceForTimeTest')
  async getAvgPriceForTimeTest(@Param() params) {
    const avgPriceArray = await this.binanceService.getAvgPriceForTime(
      'BTC',
      'USDT',
      new Date('2021-03-02Z'),
      new Date('2021-03-03Z'),
      '1d',
    );

    return avgPriceArray;
  }
}
