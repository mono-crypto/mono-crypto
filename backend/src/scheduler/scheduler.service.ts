import { Logger, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { HttpService } from '@nestjs/axios';
import { Cron } from '@nestjs/schedule';

import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

import {
  exchangeInfo,
  exchangeInfoDocument,
} from '../schemas/exchangeInfo.schema';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SchedulerService {
  private readonly logger = new Logger(SchedulerService.name);
  constructor(
    @InjectModel(exchangeInfo.name)
    private exchangeInfoModel: Model<exchangeInfoDocument>,
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  exchangeInfo(): Observable<AxiosResponse<any>> {
    const cur_date = new Date();

    const cur_date_format = [
      cur_date.getFullYear(),
      ('0' + (cur_date.getMonth() + 1)).slice(-2),
      ('0' + cur_date.getDate()).slice(-2),
    ].join('');

    return this.httpService.get(
      'https://www.koreaexim.go.kr/site/program/financial/exchangeJSON',
      {
        params: {
          data: 'AP01',
          authkey: this.configService.get<string>('EXCHANGE_API_KEY'),
          searchdate: cur_date_format,
        },
      },
    );
  }

  configServiceTest(): string {
    const cur_date = new Date();

    const cur_date_format = [
      cur_date.getFullYear(),
      ('0' + (cur_date.getMonth() + 1)).slice(-2),
      ('0' + cur_date.getDate()).slice(-2),
    ].join('');
    return cur_date_format;
  }

  @Cron('0 */50 * * * *')
  async cronEveryHour() {
    const res = await this.exchangeInfo().toPromise();

    const dto = {
      data: res.data,
    };

    const saveFlag = dto.data.some((item) => {
      return item.result != 1;
    });

    if (saveFlag) {
      this.logger.log('crawling error');
    } else {
      const exchangeInfoItems = new this.exchangeInfoModel(dto);
      exchangeInfoItems.save();
      this.logger.log('crawling...');
    }
  }
}
