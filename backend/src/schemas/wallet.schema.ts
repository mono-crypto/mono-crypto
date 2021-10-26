import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { UserDocument, User } from './user.schema';

export type WalletDocument = Wallet & Document;

@Schema()
export class Wallet {
  @Prop({ required: true })
  ticker: string;

  @Prop({ required: true })
  market: string;

  @Prop({ type: Number || String, required: true })
  ea: number | string;

  @Prop({ type: Number || String, required: true })
  price: number | string;

  @Prop({ required: true })
  date: Date;

  @Prop()
  convertPrice: number;

  @Prop({ required: true, type: User })
  user: UserDocument;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);
