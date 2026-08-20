import { PartialType } from '@nestjs/mapped-types';
import { CreateBislistDto } from './create-bislist.dto';

export class UpdateBislistDto extends PartialType(CreateBislistDto) {}
