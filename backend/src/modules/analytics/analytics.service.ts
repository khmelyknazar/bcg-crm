import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service.js';

@Injectable()
export class AnalyticsService {
  constructor(private readonly prisma: PrismaService) {}

  async summary() {
    const [clients, open, won, lost, overdueTasks] = await Promise.all([
      this.prisma.client.count(),
      this.prisma.deal.aggregate({
        where: { status: 'OPEN' },
        _sum: { amount: true },
        _count: true,
      }),
      this.prisma.deal.aggregate({
        where: { status: 'WON' },
        _sum: { amount: true },
        _count: true,
      }),
      this.prisma.deal.count({ where: { status: 'LOST' } }),
      this.prisma.task.count({
        where: { done: false, dueDate: { lt: new Date() } },
      }),
    ]);

    const closed = won._count + lost;

    return {
      clients,
      openDeals: open._count,
      openAmount: open._sum.amount ?? 0,
      wonDeals: won._count,
      revenue: won._sum.amount ?? 0,
      lostDeals: lost,
      conversion: closed > 0 ? Math.round((won._count / closed) * 100) : 0,
      overdueTasks,
    };
  }

  async funnel() {
    const stages = await this.prisma.stage.findMany({
      orderBy: { position: 'asc' },
      include: {
        deals: { where: { status: 'OPEN' }, select: { amount: true } },
      },
    });

    return stages.map((s) => ({
      stageId: s.id,
      stage: s.name,
      deals: s.deals.length,
      amount: s.deals.reduce((sum, d) => sum + d.amount, 0),
    }));
  }
}