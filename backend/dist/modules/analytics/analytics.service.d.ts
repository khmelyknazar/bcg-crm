import { CreateAnalyticsDto } from './dto/create-analytics.dto.js';
import { UpdateAnalyticsDto } from './dto/update-analytics.dto.js';
export declare class AnalyticsService {
    create(createAnalyticsDto: CreateAnalyticsDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateAnalyticsDto: UpdateAnalyticsDto): string;
    remove(id: number): string;
}
