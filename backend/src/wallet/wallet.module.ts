import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';

import { MongooseModule } from '@nestjs/mongoose';
import { Wallet, WalletSchema } from '../schemas/wallet.schema';

import { BullModule } from '@nestjs/bull';
import { BinanceModule } from '../binance/binance.module';
import { WalletConsumer } from './wallet.processor';
import { AuthModule } from 'src/auth/auth.module';
import { IexCloudModule } from 'src/iex-cloud/iex-cloud.module';

import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 600,
      limit: 10,
    }),
    MongooseModule.forFeature([{ name: Wallet.name, schema: WalletSchema }]),
    BinanceModule,
    BullModule.registerQueue({
      name: 'walletItemCalc',
      redis: {
        host: 'localhost',
        port: 6379,
      },
      limiter: {
        max: 600, // Max number of jobs processed
        duration: 1000 * 60, // for minute
        bounceBack: false,
      },
    }),
    AuthModule,
    IexCloudModule,
  ],
  controllers: [WalletController],
  providers: [WalletService, WalletConsumer],
})
export class WalletModule {}
