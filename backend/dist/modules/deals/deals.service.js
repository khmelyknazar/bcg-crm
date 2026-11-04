var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@nestjs/common';
let DealsService = class DealsService {
    create(createDealDto) {
        return 'This action adds a new deal';
    }
    findAll() {
        return `This action returns all deals`;
    }
    findOne(id) {
        return `This action returns a #${id} deal`;
    }
    update(id, updateDealDto) {
        return `This action updates a #${id} deal`;
    }
    remove(id) {
        return `This action removes a #${id} deal`;
    }
};
DealsService = __decorate([
    Injectable()
], DealsService);
export { DealsService };
//# sourceMappingURL=deals.service.js.map