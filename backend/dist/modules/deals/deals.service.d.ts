import { CreateDealDto } from './dto/create-deal.dto.js';
import { UpdateDealDto } from './dto/update-deal.dto.js';
export declare class DealsService {
    create(createDealDto: CreateDealDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateDealDto: UpdateDealDto): string;
    remove(id: number): string;
}
