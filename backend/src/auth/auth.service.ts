
import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
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
  ): Promise<{ access_token: string; portifolioId: number | null }> {
    const user = await this.usersService.findOne(email);
    if (!user) throw new UnauthorizedException();
    if (user.isLocked) {
      throw new ForbiddenException('This account is locked after too many failed sign-in attempts.');
    }
    const match = await bcrypt.compare(pass, user.password);
    if (!match) {
      const isLocked = await this.usersService.registerFailedLogin(user);
      if (isLocked) {
        throw new ForbiddenException('This account has been locked after three failed sign-in attempts.');
      }
      throw new UnauthorizedException('Invalid email or password.');
    }
    await this.usersService.resetLoginAttempts(user);
    const payload = { sub: user.id, email: user.email, portifolioId: user.portifolio?.id ?? null };
    return {
      access_token: await this.jwtService.signAsync(payload),
      portifolioId: user.portifolio?.id ?? null,
    };
  }

  async signUp(createUserDto: CreateUserDto): Promise<{ access_token: string }> {
    const user = await this.usersService.create(createUserDto);
    const payload = { sub: (user as any).id, email: (user as any).email };
    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
