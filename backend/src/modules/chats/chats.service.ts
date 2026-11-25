import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service.js';
import { TelegramService } from './telegram.service.js';

const messageSelect = { id: true, direction: true, text: true, createdAt: true } as const;

@Injectable()
export class ChatsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly telegram: TelegramService,
  ) {}

  list() {
    return this.prisma.chat.findMany({
      select: { id: true, name: true, lastMessage: true, updatedAt: true },
      orderBy: { updatedAt: 'desc' },
    });
  }

  private async getChat(id: number) {
    const chat = await this.prisma.chat.findUnique({ where: { id } });
    if (!chat) throw new NotFoundException(`Chat ${id} not found`);
    return chat;
  }

  async messages(chatId: number) {
    await this.getChat(chatId);
    return this.prisma.message.findMany({
      where: { chatId },
      select: messageSelect,
      orderBy: [{ createdAt: 'asc' }, { id: 'asc' }],
    });
  }

  async send(chatId: number, text: string) {
    const chat = await this.getChat(chatId);
    const externalId = await this.telegram.send(chat.telegramChatId, text);
    const message = await this.prisma.message.create({
      data: { chatId, direction: 'OUT', text, externalId },
      select: messageSelect,
    });
    await this.prisma.chat.update({ where: { id: chatId }, data: { lastMessage: text } });
    return message;
  }
}