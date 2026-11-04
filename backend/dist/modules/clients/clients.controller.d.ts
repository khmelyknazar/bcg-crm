import { ClientsService } from './clients.service.js';
import { CreateClientDto } from './dto/create-client.dto.js';
import { UpdateClientDto } from './dto/update-client.dto.js';
export declare class ClientsController {
    private readonly clientsService;
    constructor(clientsService: ClientsService);
    create(createClientDto: CreateClientDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateClientDto: UpdateClientDto): string;
    remove(id: string): string;
}
