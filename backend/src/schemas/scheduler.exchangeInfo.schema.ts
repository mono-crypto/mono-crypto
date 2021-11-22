import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type exchangeInfoDocument = exchangeInfo & Document;

@Schema()
export class exchangeInfo {
  @Prop()
  exchangeInfoArray: Array<any>;

  @Prop()
  date: Date;
}

export const exchangeInfoSchema = SchemaFactory.createForClass(exchangeInfo);
