import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { LoginUserDto } from './dto/login.dto';
import * as argon2 from 'argon2';
import { JwtPayload } from './auth.types';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: CreateUserDto) {
    const user = await this.userService.createUser(dto);

    return this.generateTokens({
      id: user.id,
      email: user.email,
      role: user.role,
    });
  }

  async login(dto: LoginUserDto) {
    const user = await this.userService.findByEmail(dto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const isValid = await argon2.verify(user.passwordHash, dto.password);

    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    return this.generateTokens({
      id: user.id,
      email: user.email,
      role: user.role,
    });
  }

  refresh(refresh_token?: string) {
    if (!refresh_token) {
      throw new UnauthorizedException('Invalid or expired token.');
    }

    try {
      const payload = this.jwtService.verify<JwtPayload>(refresh_token);

      return this.generateAccessToken(payload);
    } catch {
      throw new Error('Invalid or expired token');
    }
  }

  private generateAccessToken(payload: object) {
    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '15m' }),
    };
  }

  private generateTokens(payload: object) {
    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '15m' }),
      refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }
}
