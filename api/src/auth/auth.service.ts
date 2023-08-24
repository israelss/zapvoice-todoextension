import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { Hash } from '../utils/hash';
import { CurrentUser } from './current-user/current-user.interface';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<CurrentUser | null> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) return null;

    const isValidPassword = await Hash.validate(password, user.password_hash);
    if (!isValidPassword) return null;

    return {
      user_id: user.id,
      email: user.email,
    };
  }

  async login(user: CurrentUser) {
    return {
      access_token: this.jwtService.sign(user),
    };
  }

  async register(registerDto: RegisterDto) {
    const password_hash = await Hash.createHash(registerDto.password);

    const payload: CreateUserDto = {
      email: registerDto.email,
      password_hash,
    };

    const user = await this.usersService.create(payload);

    const jwtPayload: CurrentUser = { email: user.email, user_id: user.id };

    return {
      access_token: this.jwtService.sign(jwtPayload),
    };
  }
}
