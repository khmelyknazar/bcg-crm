var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service.js';
let ClientsService = class ClientsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(dto) {
        return this.prisma.client.create({ data: dto });
    }
    async findAll(search, status) {
        const clients = await this.prisma.client.findMany({
            where: status ? { status } : undefined,
            orderBy: { createdAt: 'desc' },
        });
        if (!search)
            return clients;
        const q = search.toLowerCase();
        return clients.filter((c) => [c.name, c.company, c.edrpou, c.email, c.phone].some((v) => v?.toLowerCase().includes(q)));
    }
    async findOne(id) {
        const client = await this.prisma.client.findUnique({ where: { id } });
        if (!client)
            throw new NotFoundException(`Client ${id} not found`);
        return client;
    }
    async update(id, dto) {
        await this.findOne(id);
        return this.prisma.client.update({ where: { id }, data: dto });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.client.delete({ where: { id } });
    }
};
ClientsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], ClientsService);
export { ClientsService };
//# sourceMappingURL=clients.service.js.map