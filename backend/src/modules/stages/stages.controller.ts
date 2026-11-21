import { Controller, Get } from '@nestjs/common';
import { StagesService } from './stages.service.js';

@Controller('stages')
export class StagesController {
  constructor(private readonly stagesService: StagesService) {}

  @Get()
  findAll() {
    return this.stagesService.findAll();
  }
}