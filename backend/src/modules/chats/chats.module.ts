import { Module } from '@nestjs/common';
import { ChatsController } from './chats.controller.js';
import { ChatsService } from './chats.service.js';
import { TelegramService } from './telegram.service.js';

@Module({
  controllers: [ChatsController],
  providers: [ChatsService, TelegramService],
})
export class ChatsModule {}