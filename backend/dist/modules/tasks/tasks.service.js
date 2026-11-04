var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@nestjs/common';
let TasksService = class TasksService {
    create(createTaskDto) {
        return 'This action adds a new task';
    }
    findAll() {
        return `This action returns all tasks`;
    }
    findOne(id) {
        return `This action returns a #${id} task`;
    }
    update(id, updateTaskDto) {
        return `This action updates a #${id} task`;
    }
    remove(id) {
        return `This action removes a #${id} task`;
    }
};
TasksService = __decorate([
    Injectable()
], TasksService);
export { TasksService };
//# sourceMappingURL=tasks.service.js.map