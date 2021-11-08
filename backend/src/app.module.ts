import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

import { CoinModule } from './coin/coin.module';
import { WalletModule } from './wallet/wallet.module';
import { SchedulerModule } from './scheduler/scheduler.module';
import { ConfigModule } from '@nestjs/config';
import { ExchangeInfoModule } from './exchange-info/exchange-info.module';
import { AuthModule } from './auth/auth.module';
import { BinanceModule } from './binance/binance.module';

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
    ExchangeInfoModule,
    AuthModule,
    BinanceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
