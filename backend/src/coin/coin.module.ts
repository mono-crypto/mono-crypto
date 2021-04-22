import { Module, HttpModule } from '@nestjs/common';
import { CoinController } from './coin.controller';
import { CoinService } from './coin.service';

@Module({
  imports: [HttpModule],
  controllers: [CoinController],
  providers: [CoinService],
})
export class CoinModule {}
