"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExperienceController = void 0;
const common_1 = require("@nestjs/common");
const experience_service_1 = require("./experience.service");
const create_experience_1 = require("../dto/create-experience");
let ExperienceController = exports.ExperienceController = class ExperienceController {
    constructor(experienceService) {
        this.experienceService = experienceService;
    }
    async findAll() {
        return await this.experienceService.findAll().then((p) => {
            return p;
        }).catch((e) => {
            return e;
        });
    }
    async create(createExperienceDto) {
        return await this.experienceService.create(createExperienceDto.title, createExperienceDto.initialDate, createExperienceDto.finishDate, createExperienceDto.current, createExperienceDto.portifolioId, createExperienceDto.image);
    }
    async createAll(createExperiencesDto) {
        return await this.experienceService.createAll(createExperiencesDto);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ExperienceController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_experience_1.CreateExperienceDto]),
    __metadata("design:returntype", Promise)
], ExperienceController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('experiences'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], ExperienceController.prototype, "createAll", null);
exports.ExperienceController = ExperienceController = __decorate([
    (0, common_1.Controller)('experience'),
    __metadata("design:paramtypes", [experience_service_1.ExperienceService])
], ExperienceController);
//# sourceMappingURL=experience.controller.js.map