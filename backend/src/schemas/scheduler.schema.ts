import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type exchangeInfoDocument = exchangeInfo & Document;
export type iexCloudCryptoSymbolInfoDocument = iexCloudCryptoSymbolInfo &
  Document;

@Schema({ versionKey: false })
export class exchangeInfo {
  @Prop()
  exchangeInfoArray: Array<any>;

  @Prop()
  date: Date;
}
export const exchangeInfoSchema = SchemaFactory.createForClass(exchangeInfo);

@Schema({ versionKey: false })
export class iexCloudCryptoSymbolInfo {
  @Prop()
  data: Array<any>;

  @Prop()
  date: Date;
}
export const iexCloudCryptoSymbolInfoSchema = SchemaFactory.createForClass(
  iexCloudCryptoSymbolInfo,
);
