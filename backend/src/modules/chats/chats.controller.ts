import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ChatsService } from './chats.service.js';
import { SendMessageDto } from './dto/send-message.dto.js';

@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Get()
  list() {
    return this.chatsService.list();
  }

  @Get(':id/messages')
  messages(@Param('id', ParseIntPipe) id: number) {
    return this.chatsService.messages(id);
  }

  @Post(':id/messages')
  send(@Param('id', ParseIntPipe) id: number, @Body() dto: SendMessageDto) {
    return this.chatsService.send(id, dto.text);
  }
}