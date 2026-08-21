
import { Injectable, Inject, ConflictException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { CreateUserDto } from 'src/dto/create-user';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private readonly usersRepository: Repository<User>,
  ) { }

  async findOne(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne({
      where: { email: username },
      relations: ['portifolio'],
    });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, password } = createUserDto;

    const existing = await this.usersRepository.findOne({ where: { email } });
    if (existing) {
      throw new ConflictException('Email already in use');
    }

    const saltRounds = 10;
    const hashed = await bcrypt.hash(password, saltRounds);

    const user = new User();
    user.email = email;
    user.password = hashed;

    return this.usersRepository.save(user);
  }

  async registerFailedLogin(user: User): Promise<boolean> {
    user.failedLoginAttempts += 1;
    if (user.failedLoginAttempts >= 3) {
      user.isLocked = true;
    }
    await this.usersRepository.save(user);
    return user.isLocked;
  }

  async resetLoginAttempts(user: User): Promise<void> {
    if (user.failedLoginAttempts === 0) return;
    user.failedLoginAttempts = 0;
    await this.usersRepository.save(user);
  }
}
