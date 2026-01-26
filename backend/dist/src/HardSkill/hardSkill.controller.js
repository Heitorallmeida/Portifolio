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
exports.HardSkillController = void 0;
const common_1 = require("@nestjs/common");
const hardSkill_service_1 = require("./hardSkill.service");
const create_hard_skill_1 = require("../dto/create-hard-skill");
let HardSkillController = class HardSkillController {
    constructor(hardSkillService) {
        this.hardSkillService = hardSkillService;
    }
    async findAll() {
        return await this.hardSkillService.findAll().then((p) => {
            return p;
        }).catch((e) => {
            return e;
        });
    }
    async create(createExperienceDto) {
        return await this.hardSkillService.create(createExperienceDto);
    }
    async createAll(createHardSkillsDto) {
        return await this.hardSkillService.createAll(createHardSkillsDto);
    }
    findOne(id) {
        return this.hardSkillService.findOne(id);
    }
};
exports.HardSkillController = HardSkillController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HardSkillController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_hard_skill_1.CreateHardSKillDto]),
    __metadata("design:returntype", Promise)
], HardSkillController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], HardSkillController.prototype, "createAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], HardSkillController.prototype, "findOne", null);
exports.HardSkillController = HardSkillController = __decorate([
    (0, common_1.Controller)('hardSkill'),
    __metadata("design:paramtypes", [hardSkill_service_1.HardSkillService])
], HardSkillController);
//# sourceMappingURL=hardSkill.controller.js.map