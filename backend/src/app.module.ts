import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

import { CoinModule } from './coin/coin.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/mono-crypto'),
    CoinModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
