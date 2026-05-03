import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  public prisma!: PrismaClient;

  constructor() {}

  async onModuleInit() {
    this.prisma = new PrismaClient();
    await this.prisma.$connect();
  }

  async onModuleDestroy() {
    await this.prisma?.$disconnect();
  }
}
