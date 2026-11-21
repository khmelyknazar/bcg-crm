import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service.js';

@Injectable()
export class StagesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.stage.findMany({ orderBy: { position: 'asc' } });
  }
}