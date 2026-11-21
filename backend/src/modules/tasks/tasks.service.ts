import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service.js';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { UpdateTaskDto } from './dto/update-task.dto.js';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateTaskDto) {
    const { dueDate, ...rest } = dto;
    return this.prisma.task.create({
      data: { ...rest, dueDate: dueDate ? new Date(dueDate) : undefined },
    });
  }

  findAll() {
    return this.prisma.task.findMany({
      orderBy: [{ done: 'asc' }, { dueDate: 'asc' }],
    });
  }

  async findOne(id: number) {
    const task = await this.prisma.task.findUnique({ where: { id } });
    if (!task) throw new NotFoundException(`Task ${id} not found`);
    return task;
  }

  async update(id: number, dto: UpdateTaskDto) {
    await this.findOne(id);
    const { dueDate, ...rest } = dto;
    return this.prisma.task.update({
      where: { id },
      data: { ...rest, dueDate: dueDate ? new Date(dueDate) : undefined },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.task.delete({ where: { id } });
  }
}