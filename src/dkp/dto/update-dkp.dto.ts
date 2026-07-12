import { PartialType } from '@nestjs/mapped-types';
import { CreateDkpDto } from './create-dkp.dto';

export class UpdateDkpDto extends PartialType(CreateDkpDto) {}
