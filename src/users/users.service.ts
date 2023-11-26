import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDTO } from './user.create.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async findByMail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOneBy({
      email: email,
    });
  }

  async create(user: CreateUserDTO): Promise<User> {
    return this.usersRepository.save(user);
  }

  async verifyToken(token: string): Promise<boolean> {
    const user = await this.usersRepository.findOneBy({ emailToken: token });

    if (user) {
      user.emailToken = 'secret';
      user.emailVerified = true;

      this.usersRepository.save(user);
    }

    return Boolean(user);
  }
}
