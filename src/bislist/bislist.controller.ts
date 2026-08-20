import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BislistService } from './bislist.service';
import { CreateBislistDto } from './dto/create-bislist.dto';
import { UpdateBislistDto } from './dto/update-bislist.dto';

@Controller('bislist')
export class BislistController {
  constructor(private readonly bislistService: BislistService) {}

  @Post()
  create(@Body() createBislistDto: CreateBislistDto) {
    return this.bislistService.create(createBislistDto);
  }

  @Get()
  findAll() {
    return this.bislistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bislistService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBislistDto: UpdateBislistDto) {
    return this.bislistService.update(+id, updateBislistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bislistService.remove(+id);
  }
}
