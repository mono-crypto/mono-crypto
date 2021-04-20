import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Market } from './market.schema';

export type CatDocument = Coin & Document;

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
export class Coin {
  @Prop()
  name: string;

  @Prop([Market])
  market: Market[];
}

export const CoinSchema = SchemaFactory.createForClass(Coin);
