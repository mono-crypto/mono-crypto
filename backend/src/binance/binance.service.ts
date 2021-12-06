import { Injectable } from '@nestjs/common';
import { Spot } from '@binance/connector';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Timestamp } from 'rxjs/internal/operators/timestamp';

const interValType = {
  '1m': '1m',
  '3m': '3m',
  '5m': '5m',
  '15m': '15m',
  '30m': '30m',
  '1h': '1h',
  '2h': '2h',
  '4h': '4h',
  '6h': '6h',
  '8h': '8h',
  '12h': '12h',
  '1d': '1d',
  '3d': '3d',
  '1w': '1w',
  '1M': '1M',
} as const;

export type interValType = typeof interValType[keyof typeof interValType];

@Injectable()
export class BinanceService {
  private client;
  private readonly logger = new Logger(BinanceService.name);
  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('BINANCE_API_KEY');
    const apiSecret = this.configService.get<string>('BINANCE_API_SECRET_KEY');
    const baseTestURL = 'https://testnet.binance.vision';
    const baseURL = [
      'https://api1.binance.com',
      'https://api2.binance.com',
      'https://api3.binance.com',
    ];

    this.client = new Spot(apiKey, apiSecret, { baseURL: baseURL[0] });
    this.client.verbose = true;
  }

  getCurrentAvgPrice() {
    return this.client
      .avgPrice('BTCUSDT')
      .then((response) => this.logger.log(response.data));
  }

  getCurrentPrice() {
    return this.client
      .tickerPrice('BTCUSDT')
      .then((response) => this.logger.log(response.data));
  }

  async getAggTrades(ticker: string, market: string, date: Date) {
    // [
    //   {
    //     "a": 26129,         // Aggregate tradeId
    //     "p": "0.01633102",  // Price
    //     "q": "4.70443515",  // Quantity
    //     "f": 27781,         // First tradeId
    //     "l": 27781,         // Last tradeId
    //     "T": 1498793709153, // Timestamp
    //     "m": true,          // Was the buyer the maker?
    //     "M": true           // Was the trade the best price match?
    //   }
    // ]

    const timeStamp = new Date(date).getTime();

    try {
      const aggTradeData = await this.client.aggTrades(
        ticker.toUpperCase() + market.toUpperCase(),
        {
          limit: 1,
          startTime: timeStamp - 1000 * 60 * 59,
          endTime: timeStamp,
        },
      );
      console.log('aggTradeData: ', aggTradeData);

      return aggTradeData.data;
    } catch (e) {
      console.log('aggTradeData Error: ', e);
      this.logger.log(e);
      throw e;
    }
  }

  async getKlines(
    ticker: string,
    market: string,
    startTime: Date,
    endTime: Date,
    interval: interValType,
  ) {
    // [
    //   [
    //     1499040000000,      // Open time
    //     "0.01634790",       // Open
    //     "0.80000000",       // High
    //     "0.01575800",       // Low
    //     "0.01577100",       // Close
    //     "148976.11427815",  // Volume
    //     1499644799999,      // Close time
    //     "2434.19055334",    // Quote asset volume
    //     308,                // Number of trades
    //     "1756.87402397",    // Taker buy base asset volume
    //     "28.46694368",      // Taker buy quote asset volume
    //     "17928899.62484339" // Ignore.
    //   ]
    // ]
    try {
      const klinesData = await this.client.klines(
        ticker.toUpperCase() + market.toUpperCase(),
        interval,
        {
          limit: 1,
          startTime: new Date(startTime).getTime(),
          endTime: new Date(endTime).getTime(),
        },
      );
      return klinesData.data;
    } catch (e) {
      this.logger.log(e);
      throw e;
    }
  }

  async getAvgPriceForTime(
    ticker: string,
    market: string,
    startTime: Date,
    endTime: Date,
    interval: interValType = '1m',
  ): Promise<Array<number>> {
    try {
      const klinesData = await this.getKlines(
        ticker,
        market,
        startTime,
        endTime,
        interval,
      );
      console.log('klinesData: ', klinesData);

      return klinesData.map((item: Array<number | string>, index) => {
        return (Number(item[3]) + Number(item[4])) / 2;
      });
    } catch (e) {
      throw e;
    }
  }

  async getBinanceExchangInfo(exchangeInfo: Array<string>) {
    try {
      return await this.client.exchangeInfo({ symbol: exchangeInfo });
    } catch (e) {
      throw e;
    }
  }
}
