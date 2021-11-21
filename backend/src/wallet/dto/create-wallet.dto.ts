import { Transform } from 'class-transformer';

export class CreateWalletDto {
  @Transform(({ value }) => value.toUpperCase())
  ticker: string;
  @Transform(({ value }) => value.toUpperCase())
  market: string;
  @Transform(({ value }) =>
    typeof value === 'string'
      ? parseInt(value.replace(new RegExp(',', 'g'), ''))
      : value,
  )
  price: number | string;
  @Transform(({ value }) =>
    typeof value === 'string'
      ? parseInt(value.replace(new RegExp(',', 'g'), ''))
      : value,
  )
  ea: number | string;
  date: Date;
  convertPrice?: number = 0;
  access_token: string;
}
