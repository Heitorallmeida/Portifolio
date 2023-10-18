"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortifolioModule = void 0;
const common_1 = require("@nestjs/common");
const database_module_1 = require("../database/database.module");
const portifolio_providers_1 = require("./portifolio.providers");
const portifolio_service_1 = require("./portifolio.service");
let PortifolioModule = exports.PortifolioModule = class PortifolioModule {
};
exports.PortifolioModule = PortifolioModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        providers: [
            ...portifolio_providers_1.portifolioProviders,
            portifolio_service_1.PortifolioService
        ],
    })
], PortifolioModule);
//# sourceMappingURL=portifolio.module.js.map