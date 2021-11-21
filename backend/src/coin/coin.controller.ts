import { Controller, Get } from '@nestjs/common';
import { CoinService } from './coin.service';

@Controller('coin')
export class CoinController {
  constructor(private readonly coinService: CoinService) {}

  @Get()
  getCoinList(): Promise<any> {
    // return this.coinService.getBinance().toPromise();
    return this.coinService.getCoinList();
  }
}
