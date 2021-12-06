import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Query,
  Delete,
  UsePipes,
  ValidationPipe,
  Param,
  UseGuards,
} from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { DeleteWalletDto, DeleteTransactionDto } from './dto/delete-wallet.dto';
import { AuthGuard } from '../auth/auth.guard';
import { RateLimiterGuard } from 'src/guard/rate-limiter/rate-limiter.guard';

@Controller('wallet')
@UseGuards(AuthGuard)
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get()
  findUserWalletList(@Query('id') id: number) {
    return this.walletService.findUserWalletList(id);
  }

  @Get('/:ticker/history')
  getUserWalletItemHistory(
    @Param('ticker') ticker: string,
    @Query('id') id: number,
  ) {
    return this.walletService.getUserWalletItemHistory(id, ticker);
  }

  @UseGuards(RateLimiterGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post()
  async create(@Body() createWalletDto: CreateWalletDto) {
    return this.walletService.create(createWalletDto);
  }

  @UsePipes(new ValidationPipe({ transform: true }))
  @Patch()
  update(@Body() updateWalletDto: UpdateWalletDto) {
    return this.walletService.historyUpdate(updateWalletDto);
  }

  @Delete()
  removeTicker(@Body() deleteWalletDto: DeleteWalletDto) {
    return this.walletService.removeTicker(deleteWalletDto);
  }

  @Delete('transaction')
  removeTransaction(@Body() deleteTransactionDto: DeleteTransactionDto) {
    console.log('transaction delete...');
    return this.walletService.removeTransaction(deleteTransactionDto);
  }
}
