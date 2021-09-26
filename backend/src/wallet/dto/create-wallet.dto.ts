import { Transform } from 'class-transformer';

export class CreateWalletDto {
  @Transform(({ value }) => value.toUpperCase())
  ticker: string;
  @Transform(({ value }) => value.toUpperCase())
  market: string;
  price: number;
  ea: number;
  date: Date;
  convertPrice: number;
}
