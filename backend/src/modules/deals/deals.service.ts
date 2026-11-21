import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service.js';
import { CreateDealDto } from './dto/create-deal.dto.js';
import { UpdateDealDto } from './dto/update-deal.dto.js';

@Injectable()
export class DealsService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateDealDto) {
    return this.prisma.deal.create({ data: dto });
  }

  findAll() {
    return this.prisma.deal.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async findOne(id: number) {
    const deal = await this.prisma.deal.findUnique({ where: { id } });
    if (!deal) throw new NotFoundException(`Deal ${id} not found`);
    return deal;
  }

  async update(id: number, dto: UpdateDealDto) {
    await this.findOne(id);
    const closedAt = dto.status && dto.status !== 'OPEN' ? new Date() : undefined;
    return this.prisma.deal.update({ where: { id }, data: { ...dto, closedAt } });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.deal.delete({ where: { id } });
  }
}