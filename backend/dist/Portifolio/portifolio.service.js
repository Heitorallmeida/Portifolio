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
exports.PortifolioService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const portifolio_entity_1 = require("./portifolio.entity");
let PortifolioService = exports.PortifolioService = class PortifolioService {
    constructor(portifolioRpository) {
        this.portifolioRpository = portifolioRpository;
    }
    async findAll() {
        return this.portifolioRpository.find();
    }
    async findById(id) {
        return this.portifolioRpository.findOne({ where: { id: id }, relations: ['experiences', 'hardSkills'] });
    }
    async create(name, lastname) {
        const portifolio = new portifolio_entity_1.Portifolio();
        portifolio.name = name;
        portifolio.lastname = lastname;
        return await this.portifolioRpository.save(portifolio);
    }
};
exports.PortifolioService = PortifolioService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('PORTIFOLIO_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], PortifolioService);
//# sourceMappingURL=portifolio.service.js.map