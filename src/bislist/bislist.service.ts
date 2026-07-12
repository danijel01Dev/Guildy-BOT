import { Injectable } from '@nestjs/common';
import { CreateBislistDto } from './dto/create-bislist.dto';
import { UpdateBislistDto } from './dto/update-bislist.dto';

@Injectable()
export class BislistService {
  create(createBislistDto: CreateBislistDto) {
    return 'This action adds a new bislist';
  }

  findAll() {
    return `This action returns all bislist`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bislist`;
  }

  update(id: number, updateBislistDto: UpdateBislistDto) {
    return `This action updates a #${id} bislist`;
  }

  remove(id: number) {
    return `This action removes a #${id} bislist`;
  }
}
