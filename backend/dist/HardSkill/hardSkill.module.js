"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HardSkillModule = void 0;
const common_1 = require("@nestjs/common");
const database_module_1 = require("../database/database.module");
const hardSkill_providers_1 = require("./hardSkill.providers");
const hardSkill_service_1 = require("./hardSkill.service");
const portifolio_providers_1 = require("../Portifolio/portifolio.providers");
let HardSkillModule = class HardSkillModule {
};
exports.HardSkillModule = HardSkillModule;
exports.HardSkillModule = HardSkillModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        providers: [
            ...hardSkill_providers_1.hardSkillProviders,
            ...portifolio_providers_1.portifolioProviders,
            hardSkill_service_1.HardSkillService
        ],
    })
], HardSkillModule);
//# sourceMappingURL=hardSkill.module.js.map