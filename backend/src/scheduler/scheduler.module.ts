import { Module } from '@nestjs/common';

import { ScheduleModule } from '@nestjs/schedule';

import { HttpModule } from '@nestjs/axios';
import { SchedulerService } from './scheduler.service';
import { SchedulerController } from './scheduler.controller';

import {
  exchangeInfo,
  exchangeInfoSchema,
  iexCloudCryptoSymbolInfo,
  iexCloudCryptoSymbolInfoSchema,
} from '../schemas/scheduler.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ExchangeInfoModule } from 'src/exchange-info/exchange-info.module';
import { IexCloudModule } from 'src/iex-cloud/iex-cloud.module';

@Module({
  imports: [
    HttpModule,
    ScheduleModule.forRoot(),
    MongooseModule.forFeature([
      { name: exchangeInfo.name, schema: exchangeInfoSchema },
      {
        name: iexCloudCryptoSymbolInfo.name,
        schema: iexCloudCryptoSymbolInfoSchema,
      },
    ]),
    ExchangeInfoModule,
    IexCloudModule,
  ],
  providers: [SchedulerService],
  controllers: [SchedulerController],
})
export class SchedulerModule {}
