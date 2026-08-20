import { Injectable } from '@nestjs/common';
import { CreateDkpDto } from './dto/create-dkp.dto';
import { UpdateDkpDto } from './dto/update-dkp.dto';

@Injectable()
export class DkpService {
  create(createDkpDto: CreateDkpDto) {
    return 'This action adds a new dkp';
  }

  findAll() {
    return `This action returns all dkp`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dkp`;
  }

  update(id: number, updateDkpDto: UpdateDkpDto) {
    return `This action updates a #${id} dkp`;
  }

  remove(id: number) {
    return `This action removes a #${id} dkp`;
  }
}
