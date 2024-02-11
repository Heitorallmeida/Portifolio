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
exports.CertificateController = void 0;
const common_1 = require("@nestjs/common");
const certificate_service_1 = require("./certificate.service");
const create_certificate_1 = require("../dto/create-certificate");
let CertificateController = exports.CertificateController = class CertificateController {
    constructor(certificateService) {
        this.certificateService = certificateService;
    }
    async findAll() {
        return await this.certificateService.findAll().then((p) => {
            return p;
        }).catch((e) => {
            return e;
        });
    }
    async create(createCertificateDto) {
        return await this.certificateService.create(createCertificateDto);
    }
    async createAll(createCertificateDto) {
        return await this.certificateService.createAll(createCertificateDto);
    }
    findOne(id) {
        return this.certificateService.findOne(id);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CertificateController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_certificate_1.CreateCertificateDto]),
    __metadata("design:returntype", Promise)
], CertificateController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], CertificateController.prototype, "createAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CertificateController.prototype, "findOne", null);
exports.CertificateController = CertificateController = __decorate([
    (0, common_1.Controller)('certificate'),
    __metadata("design:paramtypes", [certificate_service_1.CertificateService])
], CertificateController);
//# sourceMappingURL=certoficate.controller.js.map