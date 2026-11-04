import { CreateTaskDto } from './dto/create-task.dto.js';
import { UpdateTaskDto } from './dto/update-task.dto.js';
export declare class TasksService {
    create(createTaskDto: CreateTaskDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateTaskDto: UpdateTaskDto): string;
    remove(id: number): string;
}
