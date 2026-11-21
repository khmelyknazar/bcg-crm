import { Module } from '@nestjs/common';
import { StagesService } from './stages.service.js';
import { StagesController } from './stages.controller.js';

@Module({
  controllers: [StagesController],
  providers: [StagesService],
})
export class StagesModule {}
