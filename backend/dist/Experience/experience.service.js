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
exports.ExperienceService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const experience_entity_1 = require("./experience.entity");
let ExperienceService = exports.ExperienceService = class ExperienceService {
    constructor(experienceRpository, portifolioRepository) {
        this.experienceRpository = experienceRpository;
        this.portifolioRepository = portifolioRepository;
    }
    async findAll() {
        return this.experienceRpository.find();
    }
    async create(title, initialDate, finishDate, current = false, portifolioId, image) {
        const experience = new experience_entity_1.Experience();
        experience.title = title;
        experience.initialDate = initialDate;
        experience.finishDate = finishDate;
        experience.current = current;
        experience.image = image;
        const portifolio = await this.portifolioRepository.findOne({ where: { id: portifolioId } });
        experience.portifolio = portifolio;
        const experienceSaved = await this.experienceRpository.save(experience);
        return experienceSaved;
    }
    async createAll(createExperiencesDto) {
        const experiences = [];
        createExperiencesDto.forEach(async (experiencesItem) => {
            const experience = new experience_entity_1.Experience();
            experience.title = experiencesItem.title;
            experience.initialDate = experiencesItem.initialDate;
            experience.finishDate = experiencesItem.finishDate;
            experience.current = experiencesItem.current;
            experience.image = experiencesItem.image;
            const portifolio = await this.portifolioRepository.findOne({ where: { id: experiencesItem.portifolioId } });
            experience.portifolio = portifolio;
            const experienceSaved = await this.experienceRpository.save(experience);
            experiences.push(experienceSaved);
        });
        return experiences;
    }
};
exports.ExperienceService = ExperienceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('EXPERIENCE_REPOSITORY')),
    __param(1, (0, common_1.Inject)('PORTIFOLIO_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository])
], ExperienceService);
//# sourceMappingURL=experience.service.js.map