import { Injectable } from '@nestjs/common';
import { CreateExchangeInfoDto } from './dto/create-exchange-info.dto';
import { UpdateExchangeInfoDto } from './dto/update-exchange-info.dto';

import {
  exchangeInfo,
  exchangeInfoDocument,
} from '../schemas/scheduler.exchangeInfo.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ExchangeInfoService {
  constructor(
    @InjectModel(exchangeInfo.name)
    private exchangeInfoModel: Model<exchangeInfoDocument>,
  ) {}

  create(createExchangeInfoDto: CreateExchangeInfoDto) {
    return 'This action adds a new exchangeInfo';
  }

  findAll() {
    return `This action returns all exchangeInfo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} exchangeInfo`;
  }

  findRecently() {
    return this.exchangeInfoModel.find().limit(1).sort({ $natural: -1 });
  }

  update(id: number, updateExchangeInfoDto: UpdateExchangeInfoDto) {
    return `This action updates a #${id} exchangeInfo`;
  }

  remove(id: number) {
    return `This action removes a #${id} exchangeInfo`;
  }
}
