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
} from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { DeleteWalletDto, DeleteTransactionDto } from './dto/delete-wallet.dto';

@Controller('wallet')
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

  @UsePipes(new ValidationPipe({ transform: true }))
  @Post()
  async create(@Body() createWalletDto: CreateWalletDto) {
    return this.walletService.create(createWalletDto);
  }

  @Patch()
  update(@Body() updateWalletDto: UpdateWalletDto) {
    return this.walletService.update(updateWalletDto);
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
