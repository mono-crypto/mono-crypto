import { HttpModule, Module } from '@nestjs/common';
import { IexCloudService } from './iex-cloud.service';

import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [IexCloudService],
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        params: {
          token: configService.get<string>('IEXCLOUD_API_KEY'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [IexCloudService],
})
export class IexCloudModule {}
