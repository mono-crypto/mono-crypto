import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

import { CoinModule } from './coin/coin.module';
import { WalletModule } from './wallet/wallet.module';
import { SchedulerModule } from './scheduler/scheduler.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/mono-crypto'),
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
    }),
    CoinModule,
    WalletModule,
    SchedulerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
