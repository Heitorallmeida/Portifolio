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
exports.CertificateService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const certificate_entity_1 = require("./certificate.entity");
let CertificateService = class CertificateService {
    constructor(certificateRepository, portifolioRepository) {
        this.certificateRepository = certificateRepository;
        this.portifolioRepository = portifolioRepository;
    }
    async findAll() {
        return this.certificateRepository.find();
    }
    async create(createCertificateDto) {
        const { title, image_name, image, portifolioId } = createCertificateDto;
        const certificate = new certificate_entity_1.Certificate();
        certificate.title = title;
        certificate.image_name = image_name;
        certificate.image = image;
        const portifolio = await this.portifolioRepository.findOne({ where: { id: portifolioId } });
        certificate.portifolio = portifolio;
        const certificateSaved = await this.certificateRepository.save(certificate);
        return certificateSaved;
    }
    async createAll(createCertificateDto) {
        const certificates = [];
        createCertificateDto.forEach(async (createCertificate) => {
            const { title, image_name, image, portifolioId } = createCertificate;
            const certificate = new certificate_entity_1.Certificate();
            certificate.title = title;
            certificate.image_name = image_name;
            certificate.image = image;
            const portifolio = await this.portifolioRepository.findOne({ where: { id: portifolioId } });
            certificate.portifolio = portifolio;
            const certificateSaved = await this.certificateRepository.save(certificate);
            certificates.push(certificateSaved);
        });
        return certificates;
    }
    async findOne(id) {
        const portifolio = await this.portifolioRepository.findOne({ where: { id: id } });
        const certificate = await this.certificateRepository.find({ where: { portifolio: portifolio } });
        return certificate;
    }
};
exports.CertificateService = CertificateService;
exports.CertificateService = CertificateService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('CERTIFICATE_REPOSITORY')),
    __param(1, (0, common_1.Inject)('PORTIFOLIO_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository])
], CertificateService);
//# sourceMappingURL=certificate.service.js.map