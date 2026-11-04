import { TasksService } from './tasks.service.js';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { UpdateTaskDto } from './dto/update-task.dto.js';
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    create(createTaskDto: CreateTaskDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateTaskDto: UpdateTaskDto): string;
    remove(id: string): string;
}
