import { PartialType } from '@nestjs/mapped-types';
import { CreateExchangeInfoDto } from './create-exchange-info.dto';

export class UpdateExchangeInfoDto extends PartialType(CreateExchangeInfoDto) {}
