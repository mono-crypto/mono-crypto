import { Injectable, HttpException } from '@nestjs/common';

import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class IexCloudService {
  private API_KEY: string;
  private API_SECRET_KEY: string;
  public BASE_URL: Array<string>;
  public API_LIST;

  constructor(private httpService: HttpService) {
    this.BASE_URL = ['https://cloud.iexapis.com/stable'];
    this.API_LIST = {
      cryptoCurrencyPrice: '/crypto/{symbol}/price',
      cryptoCurrencySymbols: '/ref-data/crypto/symbols',
    };
  }

  getCurrentPriceByMarket(symbol: string): Observable<AxiosResponse<any>> {
    const requestURL =
      this.BASE_URL[0] +
      this.API_LIST.cryptoCurrencyPrice.replace('{symbol}', symbol);

    return this.httpService.get(requestURL).pipe(
      map((res) => {
        return res.data.price;
      }),
      catchError((e) => {
        console.log(e);
        throw new HttpException(e.response.data, e.response.status);
      }),
    );
  }

  getCryptoSymbol(): Observable<AxiosResponse<any>> {
    const requestURL = this.BASE_URL[0] + this.API_LIST.cryptoCurrencySymbols;

    return this.httpService.get(requestURL).pipe(
      map((res) => {
        return res.data;
      }),
      catchError((e) => {
        console.log(e);
        throw new HttpException(e.response.data, e.response.status);
      }),
    );
  }
}
