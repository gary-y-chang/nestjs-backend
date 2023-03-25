import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Group } from './entities/group.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class GroupsService {

  constructor(@InjectRepository(Group) private repository: Repository<Group>) {}

  create(createGroupDto: CreateGroupDto) {
    return 'This action adds a new group';
  }

  findAll(offset: number, limit: number, orderby: string) {
    let obj = {};
    obj[orderby] = 'ASC';
    let ord_para = JSON.stringify(obj);

    return this.repository.find({
     order: JSON.parse(ord_para),
     skip: offset,
     take: limit, 
    })
    return `This action returns all groups`;
  }

  findOne(id: number) {
    return `This action returns a #${id} group`;
  }

  update(id: number, updateGroupDto: UpdateGroupDto) {
    return `This action updates a #${id} group`;
  }

  remove(id: number) {
    return `This action removes a #${id} group`;
  }
}
