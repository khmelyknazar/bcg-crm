import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ClientsService } from './clients.service.js';
import { CreateClientDto } from './dto/create-client.dto.js';
import { UpdateClientDto } from './dto/update-client.dto.js';
import { CurrentUserId } from '../auth/current-user.decorator.js';
import { Roles } from '../auth/roles.decorator.js';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  create(@Body() createClientDto: CreateClientDto, @CurrentUserId() userId?: number) {
    return this.clientsService.create(createClientDto, userId);
  }

  @Get()
  findAll(
    @Query('search') search?: string,
    @Query('status') status?: 'active' | 'lead' | 'inactive',
  ) {
    return this.clientsService.findAll(search, status);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientsService.update(+id, updateClientDto);
  }

  @Delete(':id')
  @Roles('OWNER')
  remove(@Param('id') id: string) {
    return this.clientsService.remove(+id);
  }

}
