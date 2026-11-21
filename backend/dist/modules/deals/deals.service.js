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
let DealsService = class DealsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(dto) {
        return this.prisma.deal.create({ data: dto });
    }
    findAll() {
        return this.prisma.deal.findMany({ orderBy: { createdAt: 'desc' } });
    }
    async findOne(id) {
        const deal = await this.prisma.deal.findUnique({ where: { id } });
        if (!deal)
            throw new NotFoundException(`Deal ${id} not found`);
        return deal;
    }
    async update(id, dto) {
        await this.findOne(id);
        const closedAt = dto.status && dto.status !== 'OPEN' ? new Date() : undefined;
        return this.prisma.deal.update({ where: { id }, data: { ...dto, closedAt } });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.deal.delete({ where: { id } });
    }
};
DealsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], DealsService);
export { DealsService };
//# sourceMappingURL=deals.service.js.map