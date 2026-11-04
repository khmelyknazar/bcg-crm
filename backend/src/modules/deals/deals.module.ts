import { Module } from '@nestjs/common';
import { DealsService } from './deals.service.js';
import { DealsController } from './deals.controller.js';

@Module({
  controllers: [DealsController],
  providers: [DealsService],
})
export class DealsModule {}
