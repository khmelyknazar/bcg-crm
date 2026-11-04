import { CreateClientDto } from './dto/create-client.dto.js';
import { UpdateClientDto } from './dto/update-client.dto.js';
export declare class ClientsService {
    create(createClientDto: CreateClientDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateClientDto: UpdateClientDto): string;
    remove(id: number): string;
}
