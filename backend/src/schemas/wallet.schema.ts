import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { UserDocument, User } from './user.schema';

export type WalletDocument = Wallet & Document;

@Schema({ versionKey: false })
export class Wallet {
  @Prop({ required: true })
  ticker: string;

  @Prop({ required: true })
  market: string;

  @Prop({ type: Number || String, required: true })
  ea: number | string;

  // 구매가격
  @Prop({ type: Number || String, required: true })
  price: number | string;

  // 구매가격
  @Prop({ type: Number || String })
  tickerCurrentPrice: number | string;

  @Prop({ required: true })
  date: Date;

  // 입력된 DATE ( 1D 단위 ) 에 따른 가격 TICKER/BTC
  @Prop()
  avgPriceByDate: number;

  @Prop()
  convertMarket: string;

  // 입력된 DATE ( 1D 단위 ) 에 따른 가격 TICKER/BTC
  @Prop()
  USDTPricePerBTCByDate: number;

  @Prop({ required: true, type: User })
  user: UserDocument;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);
