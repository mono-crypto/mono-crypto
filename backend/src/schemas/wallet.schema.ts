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

  @Prop({ required: true })
  ea: number;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  convertPrice: number;

  @Prop({ required: true, type: User })
  user: UserDocument;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);
