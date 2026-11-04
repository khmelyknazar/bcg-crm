var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ClientsModule } from './modules/clients/clients.module.js';
import { DealsModule } from './modules/deals/deals.module.js';
import { TasksModule } from './modules/tasks/tasks.module.js';
import { ProductsModule } from './modules/products/products.module.js';
import { AnalyticsModule } from './modules/analytics/analytics.module.js';
import { AuthModule } from './modules/auth/auth.module.js';
export const { ObserveModule, ObserveInstrument } = createObserveModule();
let AppModule = class AppModule {
};
AppModule = __decorate([
    Module({
        imports: [
            ObserveModule.forRoot({
                appKey: process.env.OBSERVE_APP_KEY ?? 'YOUR_APP_KEY',
                appSecret: process.env.OBSERVE_APP_SECRET ?? 'YOUR_APP_SECRET',
                serviceId: 'backend',
            }),
            ClientsModule,
            DealsModule,
            TasksModule,
            ProductsModule,
            AnalyticsModule,
            AuthModule,
        ],
        controllers: [AppController],
        providers: [AppService],
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map