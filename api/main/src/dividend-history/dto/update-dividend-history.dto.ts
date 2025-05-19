import { PartialType } from '@nestjs/mapped-types';
import { CreateDividendHistoryDto } from './create-dividend-history.dto';

export class UpdateDividendHistoryDto extends PartialType(CreateDividendHistoryDto) {}
