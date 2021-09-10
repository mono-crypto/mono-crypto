import { Module } from '@nestjs/common';

import { ScheduleModule } from '@nestjs/schedule';

import { HttpModule } from '@nestjs/axios';
import { SchedulerService } from './scheduler.service';
import { SchedulerController } from './scheduler.controller';

import {
  exchangeInfo,
  exchangeInfoSchema,
} from '../schemas/scheduler.exchangeInfo.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    HttpModule,
    ScheduleModule.forRoot(),
    MongooseModule.forFeature([
      { name: exchangeInfo.name, schema: exchangeInfoSchema },
    ]),
  ],
  providers: [SchedulerService],
  controllers: [SchedulerController],
})
export class SchedulerModule {}
