
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/dto/create-user';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    email: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(email);
    if (!user) throw new UnauthorizedException();
    const match = await bcrypt.compare(pass, user.password);
    if (!match) throw new UnauthorizedException();
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(createUserDto: CreateUserDto): Promise<{ access_token: string }> {
    const user = await this.usersService.create(createUserDto);
    const payload = { sub: (user as any).id, email: (user as any).email };
    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
