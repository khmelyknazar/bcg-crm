import { ClientsService } from './clients.service.js';
import { CreateClientDto } from './dto/create-client.dto.js';
import { UpdateClientDto } from './dto/update-client.dto.js';
export declare class ClientsController {
    private readonly clientsService;
    constructor(clientsService: ClientsService);
    create(createClientDto: CreateClientDto): import("../../generated/prisma/models.js").Prisma__ClientClient<{
        name: string;
        phone: string | null;
        email: string | null;
        company: string | null;
        notes: string | null;
        edrpou: string | null;
        status: import("../../generated/prisma/enums.js").ClientStatus;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        ownerId: number | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
    findAll(search?: string, status?: 'active' | 'lead' | 'inactive'): Promise<{
        name: string;
        phone: string | null;
        email: string | null;
        company: string | null;
        notes: string | null;
        edrpou: string | null;
        status: import("../../generated/prisma/enums.js").ClientStatus;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        ownerId: number | null;
    }[]>;
    findOne(id: string): Promise<{
        name: string;
        phone: string | null;
        email: string | null;
        company: string | null;
        notes: string | null;
        edrpou: string | null;
        status: import("../../generated/prisma/enums.js").ClientStatus;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        ownerId: number | null;
    }>;
    update(id: string, updateClientDto: UpdateClientDto): Promise<{
        name: string;
        phone: string | null;
        email: string | null;
        company: string | null;
        notes: string | null;
        edrpou: string | null;
        status: import("../../generated/prisma/enums.js").ClientStatus;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        ownerId: number | null;
    }>;
    remove(id: string): Promise<{
        name: string;
        phone: string | null;
        email: string | null;
        company: string | null;
        notes: string | null;
        edrpou: string | null;
        status: import("../../generated/prisma/enums.js").ClientStatus;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        ownerId: number | null;
    }>;
}
