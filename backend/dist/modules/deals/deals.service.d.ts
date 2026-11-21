import { PrismaService } from '../../prisma.service.js';
import { CreateDealDto } from './dto/create-deal.dto.js';
import { UpdateDealDto } from './dto/update-deal.dto.js';
export declare class DealsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateDealDto): import("../../generated/prisma/models.js").Prisma__DealClient<{
        title: string;
        amount: number;
        status: import("../../generated/prisma/enums.js").DealStatus;
        createdAt: Date;
        closedAt: Date | null;
        id: number;
        clientId: number;
        stageId: number;
        ownerId: number | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
    findAll(): import("../../generated/prisma/internal/prismaNamespace.js").PrismaPromise<{
        title: string;
        amount: number;
        status: import("../../generated/prisma/enums.js").DealStatus;
        createdAt: Date;
        closedAt: Date | null;
        id: number;
        clientId: number;
        stageId: number;
        ownerId: number | null;
    }[]>;
    findOne(id: number): Promise<{
        title: string;
        amount: number;
        status: import("../../generated/prisma/enums.js").DealStatus;
        createdAt: Date;
        closedAt: Date | null;
        id: number;
        clientId: number;
        stageId: number;
        ownerId: number | null;
    }>;
    update(id: number, dto: UpdateDealDto): Promise<{
        title: string;
        amount: number;
        status: import("../../generated/prisma/enums.js").DealStatus;
        createdAt: Date;
        closedAt: Date | null;
        id: number;
        clientId: number;
        stageId: number;
        ownerId: number | null;
    }>;
    remove(id: number): Promise<{
        title: string;
        amount: number;
        status: import("../../generated/prisma/enums.js").DealStatus;
        createdAt: Date;
        closedAt: Date | null;
        id: number;
        clientId: number;
        stageId: number;
        ownerId: number | null;
    }>;
}
