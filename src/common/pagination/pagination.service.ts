import { Injectable } from '@nestjs/common';

@Injectable()
export class PaginationService {
  constructor() {}

  getSkip(page: number, take: number): number {
    return (page - 1) * take;
  }

  getTotalPages(totalItems: number, take: number): number {
    return Math.ceil(totalItems / take);
  }

  getCurrentPage(skip: number, take: number): number {
    return Math.max(1, Math.floor(skip / take) + 1);
  }
}
