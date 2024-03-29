"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExperienceModule = void 0;
const common_1 = require("@nestjs/common");
const database_module_1 = require("../database/database.module");
const experience_providers_1 = require("./experience.providers");
const experience_service_1 = require("./experience.service");
const portifolio_providers_1 = require("../Portifolio/portifolio.providers");
let ExperienceModule = exports.ExperienceModule = class ExperienceModule {
};
exports.ExperienceModule = ExperienceModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        providers: [
            ...experience_providers_1.experienceProviders,
            ...portifolio_providers_1.portifolioProviders,
            experience_service_1.ExperienceService
        ],
    })
], ExperienceModule);
//# sourceMappingURL=experience.module.js.map