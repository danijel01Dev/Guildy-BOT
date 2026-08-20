import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DkpService } from './dkp.service';
import { CreateDkpDto } from './dto/create-dkp.dto';
import { UpdateDkpDto } from './dto/update-dkp.dto';

@Controller('dkp')
export class DkpController {
  constructor(private readonly dkpService: DkpService) {}

  @Post()
  create(@Body() createDkpDto: CreateDkpDto) {
    return this.dkpService.create(createDkpDto);
  }

  @Get()
  findAll() {
    return this.dkpService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dkpService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDkpDto: UpdateDkpDto) {
    return this.dkpService.update(+id, updateDkpDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dkpService.remove(+id);
  }
}
