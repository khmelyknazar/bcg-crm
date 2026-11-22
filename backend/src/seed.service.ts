import { Injectable, OnModuleInit } from '@nestjs/common';
import { hash } from 'bcryptjs';
import { PrismaService } from './prisma.service.js';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(private readonly prisma: PrismaService) {}

  async onModuleInit() {
    await this.seedProducts();
    await this.seedUsers();

    if ((await this.prisma.client.count()) > 0) return;

    await this.prisma.stage.createMany({
      data: [
        { id: 1, name: 'Нова', position: 1 },
        { id: 2, name: 'Переговори', position: 2 },
        { id: 3, name: 'Пропозиція', position: 3 },
        { id: 4, name: 'Договір', position: 4 },
      ],
    });

    await this.prisma.client.createMany({
      data: [
        { id: 1, name: 'Олександр Коваленко', company: 'ТОВ "Меридіан"', edrpou: '34567812', email: 'o.kovalenko@meridian.ua', phone: '+380 50 123 45 67', status: 'active', createdAt: new Date('2026-09-02') },
        { id: 2, name: 'Ірина Шевченко', company: 'Аргус Груп', edrpou: '41234905', email: 'i.shevchenko@argus.com', phone: '+380 67 234 56 78', status: 'lead', createdAt: new Date('2026-09-15') },
        { id: 3, name: 'Дмитро Бондаренко', company: 'ФОП Бондаренко', edrpou: '2987654321', email: 'd.bondarenko@gmail.com', phone: '+380 63 345 67 89', status: 'active', createdAt: new Date('2026-09-21') },
        { id: 4, name: 'Марія Ткаченко', company: 'Логістик Плюс', edrpou: '37654321', email: 'm.tkachenko@logplus.ua', phone: '+380 93 456 78 90', status: 'inactive', createdAt: new Date('2026-08-11') },
        { id: 5, name: 'Андрій Мельник', company: 'ТОВ "Побутсервіс"', edrpou: '40123456', email: 'a.melnyk@pobut.ua', phone: '+380 97 567 89 01', status: 'lead', createdAt: new Date('2026-10-03') },
        { id: 6, name: 'Наталія Кравченко', company: 'Вектор', edrpou: '35678901', email: 'n.kravchenko@vector.ua', phone: '+380 50 678 90 12', status: 'active', createdAt: new Date('2026-10-18') },
        { id: 7, name: 'Сергій Олійник', company: 'Техно-Строй', edrpou: '38901234', email: 's.oliynyk@tehno.ua', phone: '+380 66 789 01 23', status: 'inactive', createdAt: new Date('2026-07-25') },
        { id: 8, name: 'Оксана Гончар', company: 'Едельвейс', edrpou: '42345670', email: 'o.gonchar@edelweiss.ua', phone: '+380 68 890 12 34', status: 'active', createdAt: new Date('2026-11-01') },
      ],
    });

    await this.prisma.deal.createMany({
      data: [
        { id: 1, title: 'Розробка сайту', amount: 85000, status: 'OPEN', clientId: 1, stageId: 2, createdAt: new Date('2026-10-02') },
        { id: 2, title: 'Підтримка CRM, річний пакет', amount: 36000, status: 'OPEN', clientId: 2, stageId: 1, createdAt: new Date('2026-11-03') },
        { id: 3, title: 'Консалтинг з логістики', amount: 120000, status: 'OPEN', clientId: 4, stageId: 3, createdAt: new Date('2026-10-14') },
        { id: 4, title: 'Інтеграція з обліковою системою', amount: 54000, status: 'WON', clientId: 3, stageId: 4, createdAt: new Date('2026-09-25'), closedAt: new Date('2026-10-20') },
        { id: 5, title: 'Мобільний застосунок', amount: 210000, status: 'OPEN', clientId: 6, stageId: 3, createdAt: new Date('2026-10-22') },
        { id: 6, title: 'Аудит безпеки', amount: 28000, status: 'LOST', clientId: 7, stageId: 2, createdAt: new Date('2026-09-18'), closedAt: new Date('2026-10-05') },
        { id: 7, title: 'Навчання персоналу', amount: 15000, status: 'OPEN', clientId: 8, stageId: 1, createdAt: new Date('2026-11-10') },
        { id: 8, title: 'Редизайн корпоративного порталу', amount: 97000, status: 'OPEN', clientId: 5, stageId: 2, createdAt: new Date('2026-11-01') },
        { id: 9, title: 'Розширення ліцензій', amount: 42000, status: 'WON', clientId: 1, stageId: 4, createdAt: new Date('2026-10-28'), closedAt: new Date('2026-11-05') },
      ],
    });

    await this.prisma.task.createMany({
      data: [
        { id: 1, title: 'Зателефонувати щодо договору', done: false, dueDate: new Date('2026-11-18'), clientId: 1 },
        { id: 2, title: 'Надіслати комерційну пропозицію', done: false, dueDate: new Date('2026-11-15'), clientId: 2 },
        { id: 3, title: 'Узгодити акт виконаних робіт', done: true, dueDate: new Date('2026-11-10'), clientId: 3 },
        { id: 4, title: 'Підготувати презентацію логістики', done: false, dueDate: new Date('2026-11-20'), clientId: 4 },
        { id: 5, title: 'Уточнити вимоги до порталу', done: false, dueDate: new Date('2026-11-17'), clientId: 5 },
        { id: 6, title: 'Погодити етапи мобільного застосунку', done: false, dueDate: new Date('2026-11-25'), clientId: 6 },
        { id: 7, title: 'Надіслати рахунок за навчання', done: true, dueDate: new Date('2026-11-12'), clientId: 8 },
      ],
    });
  }

  private async seedUsers() {
    const demo = [
      { email: 'owner@bcg.ua', name: 'Власник', password: 'owner123', role: 'OWNER' as const },
      { email: 'manager@bcg.ua', name: 'Михайло', password: 'manager123', role: 'MANAGER' as const },
    ];
    for (const u of demo) {
      const exists = await this.prisma.user.findUnique({ where: { email: u.email } });
      if (exists) continue;
      await this.prisma.user.create({
        data: {
          email: u.email,
          name: u.name,
          role: u.role,
          passwordHash: await hash(u.password, 10),
        },
      });
    }
  }

  private async seedProducts() {
    if ((await this.prisma.product.count()) > 0) return;
    await this.prisma.product.createMany({
      data: [
        { id: 1, name: 'Розробка веб-сайту', price: 60000 },
        { id: 2, name: 'Мобільний застосунок', price: 180000 },
        { id: 3, name: 'Технічна підтримка (місяць)', price: 8000 },
        { id: 4, name: 'Аудит безпеки', price: 28000 },
        { id: 5, name: 'Інтеграція з обліковою системою', price: 45000 },
        { id: 6, name: 'Навчання персоналу', price: 15000 },
        { id: 7, name: 'Консультація (година)', price: 1500 },
      ],
    });
  }
}