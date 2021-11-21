import { Injectable } from '@nestjs/common';
import { Spot } from '@binance/connector';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

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

  async getKlines(ticker: string, market: string, date: Date) {
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
    const timeStamp = new Date(date).getTime();
    try {
      const klinesData = await this.client.klines(
        ticker.toUpperCase() + market.toUpperCase(),
        '1m',
        {
          limit: 1,
          startTime: timeStamp - 1000 * 60 * 59,
          endTime: timeStamp,
        },
      );
      return klinesData.data;
    } catch (e) {
      this.logger.log(e);
      throw e;
    }
  }

  async getAvgPriceForTime(ticker: string, market: string, date: Date) {
    try {
      const klinesData = await this.getKlines(ticker, market, date);
      // const aggTradeData = await this.getAggTrades(ticker, market, date);
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
