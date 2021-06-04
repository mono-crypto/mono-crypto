import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { InjectModel } from '@nestjs/mongoose';

import { Wallet, WalletDocument } from '../schemas/wallet.schema';

@Injectable()
export class WalletService {
  constructor(
    @InjectModel(Wallet.name) private walletModel: Model<WalletDocument>,
  ) {}

  async create(createWalletDto: CreateWalletDto): Promise<Wallet> {
    const createdWalletItem = new this.walletModel(createWalletDto);
    return createdWalletItem.save();
  }

  async findAll(): Promise<Wallet[]> {
    return this.walletModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} wallet`;
  }

  update(id: number, updateWalletDto: UpdateWalletDto) {
    return `This action updates a #${id} wallet`;
  }

  remove(id: number) {
    return `This action removes a #${id} wallet`;
  }
}
