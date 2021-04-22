import { HttpService, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AxiosResponse } from 'axios';

import { Coin } from '../schemas/coin.schema';

@Injectable()
export class CoinService {
  constructor(private httpService: HttpService) {}

  getBinance(): Observable<AxiosResponse<any>> {
    return this.httpService
      .get('https://api.binance.com/api/v3/exchangeInfo')
      .pipe(
        map((res) =>
          res.data.symbols
            .filter((item) => item.status === 'TRADING')
            .reduce((result, cur, index) => {
              (result[cur.baseAsset] || (result[cur.baseAsset] = [])).push(
                cur.quoteAsset,
              );
              return result;
            }, {}),
        ),
      );
  }

  getUpbit(): Observable<AxiosResponse<any>> {
    return this.httpService.get('https://api.upbit.com/v1/market/all').pipe(
      map((res) =>
        res.data.reduce((result, cur, index) => {
          const [quoteAsset, baseAsset] = cur.market.split('-');
          (result[baseAsset] || (result[baseAsset] = [])).push(quoteAsset);
          return result;
        }, {}),
      ),
    );
  }

  async getCoinList(): Promise<Coin[]> {
    const binanceData = await this.getBinance().toPromise();
    const upbitData = await this.getUpbit().toPromise();

    const binanceKeys = Object.keys(binanceData); // baseAsset
    const upbitKeys = Object.keys(upbitData); // baseAsset

    const allKey = [...new Set([...binanceKeys, ...upbitKeys])]; //AllbaseAsset
    return allKey.map((item) => {
      const markets = [];
      if (typeof binanceData[item] !== 'undefined') {
        markets.push({
          name: 'upbit',
          quotes: upbitData[item],
        });
      }
      if (typeof upbitData[item] !== 'undefined') {
        markets.push({
          name: 'binance',
          quotes: binanceData[item],
        });
      }
      return {
        name: item,
        markets,
      };
    });
  }
}
