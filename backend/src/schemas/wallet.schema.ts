import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WalletDocument = Wallet & Document;

@Schema()
export class Wallet {
  @Prop({ required: true })
  ticker: string;

  @Prop({ required: true })
  market: string;

  @Prop({ required: true })
  ea: number;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  convertPrice: number;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);
