import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { SafeUser } from './user.types';
import { CreateUserDto } from './dto/create-user.dto';
import { hash } from 'argon2';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(dto: CreateUserDto): Promise<SafeUser> {
    const existing = await this.prismaService.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existing) {
      throw new ConflictException('Email already exists.');
    }

    const passwordHash = await hash(dto.password);

    const user = await this.prismaService.prisma.user.create({
      data: {
        email: dto.email,
        name: dto.name,
        passwordHash: passwordHash,
      },
    });

    return this.toSafeUser(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prismaService.prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) return null;

    return user;
  }

  private toSafeUser(user: User): SafeUser {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      createdAt: user.createdAt,
    };
  }
}
