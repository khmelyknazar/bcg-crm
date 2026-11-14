import { PrismaService } from '../../prisma.service.js';
import { CreateClientDto } from './dto/create-client.dto.js';
import { UpdateClientDto } from './dto/update-client.dto.js';
export declare class ClientsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateClientDto): import("../../generated/prisma/models.js").Prisma__ClientClient<{
        id: number;
        email: string | null;
        name: string;
        createdAt: Date;
        phone: string | null;
        company: string | null;
        notes: string | null;
        ownerId: number | null;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
    findAll(): import("../../generated/prisma/internal/prismaNamespace.js").PrismaPromise<{
        id: number;
        email: string | null;
        name: string;
        createdAt: Date;
        phone: string | null;
        company: string | null;
        notes: string | null;
        ownerId: number | null;
        updatedAt: Date;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        email: string | null;
        name: string;
        createdAt: Date;
        phone: string | null;
        company: string | null;
        notes: string | null;
        ownerId: number | null;
        updatedAt: Date;
    }>;
    update(id: number, dto: UpdateClientDto): Promise<{
        id: number;
        email: string | null;
        name: string;
        createdAt: Date;
        phone: string | null;
        company: string | null;
        notes: string | null;
        ownerId: number | null;
        updatedAt: Date;
    }>;
    remove(id: number): Promise<{
        id: number;
        email: string | null;
        name: string;
        createdAt: Date;
        phone: string | null;
        company: string | null;
        notes: string | null;
        ownerId: number | null;
        updatedAt: Date;
    }>;
}
