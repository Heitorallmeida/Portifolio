"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const portifolio_controller_1 = require("./Portifolio/portifolio.controller");
const portifolio_module_1 = require("./Portifolio/portifolio.module");
const portifolio_service_1 = require("./Portifolio/portifolio.service");
const portifolio_providers_1 = require("./Portifolio/portifolio.providers");
const database_providers_1 = require("./database/database.providers");
const experience_controller_1 = require("./Experience/experience.controller");
const experience_module_1 = require("./Experience/experience.module");
const experience_providers_1 = require("./Experience/experience.providers");
const experience_service_1 = require("./Experience/experience.service");
const hardSkill_controller_1 = require("./HardSkill/hardSkill.controller");
const hardSkill_module_1 = require("./HardSkill/hardSkill.module");
const hardSkill_service_1 = require("./HardSkill/hardSkill.service");
const hardSkill_providers_1 = require("./HardSkill/hardSkill.providers");
const files_module_1 = require("./files/files.module");
const files_controller_1 = require("./files/files.controller");
const file_providers_1 = require("./files/entities/file.providers");
const files_service_1 = require("./files/files.service");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [portifolio_module_1.PortifolioModule, experience_module_1.ExperienceModule, hardSkill_module_1.HardSkillModule, files_module_1.FilesModule],
        controllers: [app_controller_1.AppController, portifolio_controller_1.PortifolioController, experience_controller_1.ExperienceController, hardSkill_controller_1.HardSkillController, files_controller_1.FilesController],
        providers: [...portifolio_providers_1.portifolioProviders, ...file_providers_1.fileProviders, ...experience_providers_1.experienceProviders, ...database_providers_1.databaseProviders, ...hardSkill_providers_1.hardSkillProviders, app_service_1.AppService, portifolio_service_1.PortifolioService, experience_service_1.ExperienceService, hardSkill_service_1.HardSkillService, files_service_1.FilesService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map