import { Logger, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Cron } from '@nestjs/schedule';

import {
  exchangeInfo,
  exchangeInfoDocument,
} from '../schemas/scheduler.exchangeInfo.schema';
import { ExchangeInfoService } from 'src/exchange-info/exchange-info.service';

@Injectable()
export class SchedulerService {
  private readonly logger = new Logger(SchedulerService.name);
  constructor(
    @InjectModel(exchangeInfo.name)
    private exchangeInfoModel: Model<exchangeInfoDocument>,
    private exchangeInfoService: ExchangeInfoService,
  ) {}

  @Cron('0 */50 * * * *')
  async cronEveryHour() {
    const cur_date = new Date();
    const res = await this.exchangeInfoService
      .getExchangeInfo(cur_date)
      .toPromise();

    const dto = {
      exchangeInfoArray: res.data.exchangeInfoArray,
      date: res.data.date,
    };

    const saveFlag = dto.exchangeInfoArray.some((item) => {
      return item.result != 1;
    });

    if (saveFlag || dto.exchangeInfoArray.length == 0) {
      this.logger.log('crawling error : ', JSON.stringify(dto));
    } else {
      const exchangeInfoItems = new this.exchangeInfoModel(dto);
      exchangeInfoItems.save();
      this.logger.log('crawling...');
    }
  }
}
