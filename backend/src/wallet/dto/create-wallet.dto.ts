import { Transform } from 'class-transformer';
import { CreateAuthDto } from 'src/auth/dto/create-auth.dto';

export class CreateWalletDto {
  @Transform(({ value }) => value.toUpperCase())
  ticker: string;
  @Transform(({ value }) => value.toUpperCase())
  market: string;
  @Transform(({ value }) => parseInt(value.replace(new RegExp(',', 'g'), '')))
  price: number | string;
  @Transform(({ value }) => parseInt(value.replace(new RegExp(',', 'g'), '')))
  ea: number | string;
  date: Date;
  convertPrice?: number;
  user: CreateAuthDto;
}
