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
exports.HardSkillService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const hardSkill_entity_1 = require("./hardSkill.entity");
let HardSkillService = exports.HardSkillService = class HardSkillService {
    constructor(hardSkillRepository, portifolioRepository) {
        this.hardSkillRepository = hardSkillRepository;
        this.portifolioRepository = portifolioRepository;
    }
    async findAll() {
        return this.hardSkillRepository.find();
    }
    async create(createHardSkillDto) {
        const { title, initialDate, finishDate, current = false, portifolioId } = createHardSkillDto;
        const calculateDateDiff = (initialDate, finishDate) => {
            const _MS_PER_DAY = 1000 * 60 * 60 * 24;
            const utc1 = Date.UTC(initialDate.getFullYear(), initialDate.getMonth(), initialDate.getDate());
            const utc2 = Date.UTC(finishDate.getFullYear(), finishDate.getMonth(), finishDate.getDate());
            return Math.floor((utc2 - utc1) / _MS_PER_DAY);
        };
        const calculatePercentage = (initialDateExperience, finishDateExperience) => {
            const experienceDays = calculateDateDiff(new Date(initialDateExperience), new Date(finishDateExperience));
            const initialExperience = new Date("2019-07-01T08:00:00");
            const now = new Date();
            const totalExperienceDays = calculateDateDiff(initialExperience, now);
            console.log(experienceDays);
            console.log(totalExperienceDays);
            const percentage = (experienceDays * 100) / totalExperienceDays;
            return percentage;
        };
        const experience = new hardSkill_entity_1.HardSkill();
        experience.title = title;
        experience.initialDate = initialDate;
        experience.finishDate = finishDate;
        experience.current = current;
        experience.percentage = calculatePercentage(experience.initialDate, experience.finishDate);
        const portifolio = await this.portifolioRepository.findOne({ where: { id: portifolioId } });
        experience.portifolio = portifolio;
        const experienceSaved = await this.hardSkillRepository.save(experience);
        return experienceSaved;
    }
    async createAll(createHardSkillsDto) {
        const hardSkills = [];
        createHardSkillsDto.forEach(async (hardSkill) => {
            const { title, initialDate, finishDate, current = false, portifolioId } = hardSkill;
            const calculateDateDiff = (initialDate, finishDate) => {
                const _MS_PER_DAY = 1000 * 60 * 60 * 24;
                const utc1 = Date.UTC(initialDate.getFullYear(), initialDate.getMonth(), initialDate.getDate());
                const utc2 = Date.UTC(finishDate.getFullYear(), finishDate.getMonth(), finishDate.getDate());
                return Math.floor((utc2 - utc1) / _MS_PER_DAY);
            };
            const calculatePercentage = (initialDateExperience, finishDateExperience) => {
                const experienceDays = calculateDateDiff(new Date(initialDateExperience), new Date(finishDateExperience));
                const initialExperience = new Date("2019-07-01T08:00:00");
                const now = new Date();
                const totalExperienceDays = calculateDateDiff(initialExperience, now);
                const percentage = (experienceDays * 100) / totalExperienceDays;
                return percentage;
            };
            const hardSkillEntity = new hardSkill_entity_1.HardSkill();
            hardSkillEntity.title = title;
            hardSkillEntity.initialDate = initialDate;
            hardSkillEntity.finishDate = finishDate;
            hardSkillEntity.current = current;
            hardSkillEntity.percentage = calculatePercentage(hardSkillEntity.initialDate, hardSkillEntity.finishDate);
            const portifolio = await this.portifolioRepository.findOne({ where: { id: portifolioId } });
            hardSkillEntity.portifolio = portifolio;
            const hardSkillSaved = await this.hardSkillRepository.save(hardSkillEntity);
            hardSkills.push(hardSkillSaved);
        });
        return hardSkills;
    }
    async findOne(id) {
        const portifolio = await this.portifolioRepository.findOne({ where: { id: id } });
        const hardSkills = await this.hardSkillRepository.findBy({ portifolio: portifolio });
        const resultado = hardSkills.reduce((agregado, objeto) => {
            const { title, percentage } = objeto;
            if (agregado[title]) {
                agregado[title] += percentage;
            }
            else {
                agregado[title] = percentage;
            }
            return agregado;
        }, {});
        return resultado;
    }
};
exports.HardSkillService = HardSkillService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('HARD_SKILL_REPOSITORY')),
    __param(1, (0, common_1.Inject)('PORTIFOLIO_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository])
], HardSkillService);
//# sourceMappingURL=hardSkill.service.js.map