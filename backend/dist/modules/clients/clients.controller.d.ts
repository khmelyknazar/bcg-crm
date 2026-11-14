import { ClientsService } from './clients.service.js';
import { CreateClientDto } from './dto/create-client.dto.js';
import { UpdateClientDto } from './dto/update-client.dto.js';
export declare class ClientsController {
    private readonly clientsService;
    constructor(clientsService: ClientsService);
    create(createClientDto: CreateClientDto): import("../../generated/prisma/models.js").Prisma__ClientClient<{
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
    findOne(id: string): Promise<{
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
    update(id: string, updateClientDto: UpdateClientDto): Promise<{
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
    remove(id: string): Promise<{
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
