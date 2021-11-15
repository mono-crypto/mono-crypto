import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateWalletDto } from './create-wallet.dto';

export class UpdateWalletDto extends PartialType(
  OmitType(CreateWalletDto, ['access_token'] as const),
) {
  _id: string;
}
