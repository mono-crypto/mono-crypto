import { HttpModule, Module } from '@nestjs/common';
import { ExchangeInfoService } from './exchange-info.service';
import { ExchangeInfoController } from './exchange-info.controller';

import {
  exchangeInfo,
  exchangeInfoSchema,
} from '../schemas/scheduler.exchangeInfo.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [ExchangeInfoController],
  providers: [ExchangeInfoService],
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: exchangeInfo.name, schema: exchangeInfoSchema },
    ]),
  ],
  exports: [ExchangeInfoService],
})
export class ExchangeInfoModule {}
