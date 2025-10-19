import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly repo: Repository<User>) {}

  create(name: string, age?: number): Promise<User> {
    const user = this.repo.create({ name, age });
    return this.repo.save(user);
  }

  findAll(): Promise<User[]> { return this.repo.find({ order: { createdAt: 'ASC' } }); }
  findOne(id: string): Promise<User | null> { return this.repo.findOne({ where: { id } }); }
}
