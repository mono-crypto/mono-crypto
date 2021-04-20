import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MarketDocument = Market & Document;

/*
    [
        {
            "name": "BTC",
            "market": [
                {
                    "name": "UPBIT",
                    "quotes": ["KRW", "USDT"]
                }
            ]
        }
    ]
*/

@Schema()
export class Market {
  @Prop()
  name: string;

  @Prop([String])
  quotes: string[];
}

export const MarketSchema = SchemaFactory.createForClass(Market);
