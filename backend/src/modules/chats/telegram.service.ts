import {
  BadGatewayException,
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
  ServiceUnavailableException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma.service.js';

interface TgMessage {
  message_id: number;
  date: number;
  text?: string;
  chat: {
    id: number;
    title?: string;
    first_name?: string;
    last_name?: string;
    username?: string;
  };
}

interface TgUpdate {
  update_id: number;
  message?: TgMessage;
}

@Injectable()
export class TelegramService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(TelegramService.name);
  private readonly token = process.env.TELEGRAM_BOT_TOKEN;
  private running = false;
  private offset = 0;
  private abort?: AbortController;

  constructor(private readonly prisma: PrismaService) {}

  onModuleInit() {
    if (!this.token) {
      this.logger.warn('TELEGRAM_BOT_TOKEN не задано, Telegram-бот вимкнено');
      return;
    }
    this.running = true;
    void this.pollLoop();
  }

  onModuleDestroy() {
    this.running = false;
    this.abort?.abort();
  }

  private url(method: string) {
    return `https://api.telegram.org/bot${this.token}/${method}`;
  }

  private async pollLoop() {
    while (this.running) {
      try {
        this.abort = new AbortController();
        const query = `timeout=25&offset=${this.offset}&allowed_updates=${encodeURIComponent('["message"]')}`;
        const res = await fetch(`${this.url('getUpdates')}?${query}`, {
          signal: this.abort.signal,
        });
        const data = (await res.json()) as {
          ok: boolean;
          result?: TgUpdate[];
          description?: string;
        };
        if (!data.ok) throw new Error(data.description ?? `HTTP ${res.status}`);

        for (const update of data.result ?? []) {
          this.offset = update.update_id + 1;
          const msg = update.message;
          if (msg?.text) await this.saveIncoming(msg, msg.text);
        }
      } catch (e) {
        if (!this.running) return;
        this.logger.error(`Telegram polling: ${(e as Error).message}`);
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }
    }
  }

  private async saveIncoming(msg: TgMessage, text: string) {
    const telegramChatId = String(msg.chat.id);
    const name =
      msg.chat.title ??
      ([msg.chat.first_name, msg.chat.last_name].filter(Boolean).join(' ') ||
        msg.chat.username ||
        telegramChatId);

    const chat = await this.prisma.chat.upsert({
      where: { telegramChatId },
      create: { telegramChatId, name, lastMessage: text },
      update: { name, lastMessage: text },
    });

    const exists = await this.prisma.message.findFirst({
      where: { chatId: chat.id, externalId: msg.message_id },
    });
    if (exists) return;

    await this.prisma.message.create({
      data: {
        chatId: chat.id,
        direction: 'IN',
        text,
        externalId: msg.message_id,
        createdAt: new Date(msg.date * 1000),
      },
    });
  }

  async send(telegramChatId: string, text: string): Promise<number> {
    if (!this.token) {
      throw new ServiceUnavailableException('Telegram-бот не налаштовано (TELEGRAM_BOT_TOKEN)');
    }
    const res = await fetch(this.url('sendMessage'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: Number(telegramChatId), text }),
    });
    const data = (await res.json()) as {
      ok: boolean;
      result?: { message_id: number };
      description?: string;
    };
    if (!data.ok || !data.result) {
      throw new BadGatewayException(`Telegram: ${data.description ?? res.status}`);
    }
    return data.result.message_id;
  }
}