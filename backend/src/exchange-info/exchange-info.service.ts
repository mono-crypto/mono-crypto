import { Injectable } from '@nestjs/common';
import { CreateExchangeInfoDto } from './dto/create-exchange-info.dto';
import { UpdateExchangeInfoDto } from './dto/update-exchange-info.dto';

import {
  exchangeInfo,
  exchangeInfoDocument,
} from '../schemas/scheduler.exchangeInfo.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { ConfigService } from '@nestjs/config';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ExchangeInfoService {
  constructor(
    @InjectModel(exchangeInfo.name)
    private exchangeInfoModel: Model<exchangeInfoDocument>,
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  getExchangeInfo(date: Date): Observable<AxiosResponse<any>> {
    const _date = new Date(date);

    const _dateFormat = [
      _date.getFullYear(),
      ('0' + (_date.getMonth() + 1)).slice(-2),
      ('0' + _date.getDate()).slice(-2),
    ].join('');

    return this.httpService
      .get('https://www.koreaexim.go.kr/site/program/financial/exchangeJSON', {
        params: {
          data: 'AP01',
          authkey: this.configService.get<string>('EXCHANGE_API_KEY'),
          searchdate: _dateFormat,
        },
      })
      .pipe(
        map((res) => {
          const exchangeInfoArray = res.data;
          res.data = {
            exchangeInfoArray: exchangeInfoArray,
            date: _date,
          };
          console.log('getExchangeInfo: ', res);
          return res;
        }),
        // catchError((e) => {
        //   throw new HttpException(e.response.data, e.response.status);
        // }),
      );
  }

  create(createExchangeInfoDto: CreateExchangeInfoDto) {
    return 'This action adds a new exchangeInfo';
  }

  findAll() {
    return this.exchangeInfoModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} exchangeInfo`;
  }

  findRecently() {
    return this.exchangeInfoModel.findOne().sort({ _id: -1 });
  }

  update(id: number, updateExchangeInfoDto: UpdateExchangeInfoDto) {
    return `This action updates a #${id} exchangeInfo`;
  }

  remove(id: number) {
    return `This action removes a #${id} exchangeInfo`;
  }
}
