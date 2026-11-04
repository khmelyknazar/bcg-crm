import { DealsService } from './deals.service.js';
import { CreateDealDto } from './dto/create-deal.dto.js';
import { UpdateDealDto } from './dto/update-deal.dto.js';
export declare class DealsController {
    private readonly dealsService;
    constructor(dealsService: DealsService);
    create(createDealDto: CreateDealDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateDealDto: UpdateDealDto): string;
    remove(id: string): string;
}
