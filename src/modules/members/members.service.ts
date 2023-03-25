import { Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from './entities/member.entity';

@Injectable()
export class MembersService {

  constructor(@InjectRepository(Member) private repository: Repository<Member>) {}

  create(createMemberDto: CreateMemberDto) {
    const member = this.repository.create(createMemberDto);

    return this.repository.save(member);
  }

  findAll() {
    return `This action returns all members`;
  }

  findOne(id: string) {
    return `This action returns a #${id} member`;
  }

  findByEmail(_email: string){
    return this.repository.findOne({
      where: {
        email: _email
      }
    })
  }

  findByWallet(_wallet: string){
    return this.repository.findOne({
      where: {
        wallet_address: _wallet
      }
    })
  }

  update(id: string, updateMemberDto: any) {
    return this.repository.update(id, updateMemberDto);
  }

  remove(id: string) {
    return `This action removes a #${id} member`;
  }
}
