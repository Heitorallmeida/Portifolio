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
exports.PortifolioController = void 0;
const common_1 = require("@nestjs/common");
const portifolio_service_1 = require("./portifolio.service");
const create_portifolio_1 = require("../dto/create-portifolio");
let PortifolioController = exports.PortifolioController = class PortifolioController {
    constructor(portifolioService) {
        this.portifolioService = portifolioService;
    }
    async findAll() {
        return await this.portifolioService.findAll().then((p) => {
            return p;
        }).catch((e) => {
            return e;
        });
    }
    async findOne(params) {
        return await this.portifolioService.findById(params.id).then((p) => {
            return p;
        }).catch((e) => {
            return e;
        });
    }
    async create(createPortifolioDto) {
        return await this.portifolioService.create(createPortifolioDto.name, createPortifolioDto.lastname);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PortifolioController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PortifolioController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_portifolio_1.CreatePortifolioDto]),
    __metadata("design:returntype", Promise)
], PortifolioController.prototype, "create", null);
exports.PortifolioController = PortifolioController = __decorate([
    (0, common_1.Controller)('portifolio'),
    __metadata("design:paramtypes", [portifolio_service_1.PortifolioService])
], PortifolioController);
//# sourceMappingURL=portifolio.controller.js.map