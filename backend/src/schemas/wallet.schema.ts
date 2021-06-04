import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WalletDocument = Wallet & Document;

@Schema()
export class Wallet {
  @Prop()
  market: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  convertPrice: number;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);
