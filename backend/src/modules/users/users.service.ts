import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service.js';

const select = { id: true, email: true, name: true, role: true, createdAt: true };

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.user.findMany({ select, orderBy: { id: 'asc' } });
  }

  async updateRole(id: number, role: 'OWNER' | 'MANAGER') {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException(`User ${id} not found`);

    if (user.role === 'OWNER' && role !== 'OWNER') {
      const owners = await this.prisma.user.count({ where: { role: 'OWNER' } });
      if (owners <= 1) throw new ConflictException('Має лишитися хоча б один власник');
    }
    return this.prisma.user.update({ where: { id }, data: { role }, select });
  }
}