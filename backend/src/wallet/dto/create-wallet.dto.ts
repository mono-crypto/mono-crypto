import { Transform } from 'class-transformer';
import { CreateAuthDto } from 'src/auth/dto/create-auth.dto';

export class CreateWalletDto {
  @Transform(({ value }) => value.toUpperCase())
  ticker: string;
  @Transform(({ value }) => value.toUpperCase())
  market: string;
  price: number;
  ea: number;
  date: Date;
  convertPrice: number;
  user: CreateAuthDto;
}
