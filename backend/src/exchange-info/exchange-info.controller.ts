import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ExchangeInfoService } from './exchange-info.service';
import { CreateExchangeInfoDto } from './dto/create-exchange-info.dto';
import { UpdateExchangeInfoDto } from './dto/update-exchange-info.dto';

@Controller('exchange-info')
export class ExchangeInfoController {
  constructor(private readonly exchangeInfoService: ExchangeInfoService) {}

  @Post()
  create(@Body() createExchangeInfoDto: CreateExchangeInfoDto) {
    return this.exchangeInfoService.create(createExchangeInfoDto);
  }

  @Get()
  findAll() {
    return this.exchangeInfoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.exchangeInfoService.findOne(+id);
  }

  @Get('/recently')
  findRecently() {
    return this.exchangeInfoService.findRecently();
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateExchangeInfoDto: UpdateExchangeInfoDto,
  ) {
    return this.exchangeInfoService.update(+id, updateExchangeInfoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.exchangeInfoService.remove(+id);
  }
}
