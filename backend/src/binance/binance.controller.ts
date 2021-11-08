import { Controller } from '@nestjs/common';
import { BinanceService } from './binance.service';

@Controller()
export class BinanceController {
  constructor(private readonly binanceService: BinanceService) {}
}
