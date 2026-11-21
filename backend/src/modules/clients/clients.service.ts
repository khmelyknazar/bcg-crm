import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service.js';
import { CreateClientDto } from './dto/create-client.dto.js';
import { UpdateClientDto } from './dto/update-client.dto.js';

@Injectable()
export class ClientsService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateClientDto) {
    return this.prisma.client.create({ data: dto });
  }

  async findAll(search?: string, status?: 'active' | 'lead' | 'inactive') {
    const clients = await this.prisma.client.findMany({
      where: status ? { status } : undefined,
      orderBy: { createdAt: 'desc' },
    });
    if (!search) return clients;
    const q = search.toLowerCase();
    return clients.filter((c) =>
      [c.name, c.company, c.edrpou, c.email, c.phone].some((v) => v?.toLowerCase().includes(q)),
    );
  }

  async findOne(id: number) {
    const client = await this.prisma.client.findUnique({ where: { id } });
    if (!client) throw new NotFoundException(`Client ${id} not found`);
    return client;
  }

  async update(id: number, dto: UpdateClientDto) {
    await this.findOne(id);
    return this.prisma.client.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.client.delete({ where: { id } });
  }
}