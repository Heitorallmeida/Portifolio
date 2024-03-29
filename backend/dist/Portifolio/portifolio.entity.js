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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Portifolio = void 0;
const certificate_entity_1 = require("../Certificate/certificate.entity");
const experience_entity_1 = require("../Experience/experience.entity");
const hardSkill_entity_1 = require("../HardSkill/hardSkill.entity");
const typeorm_1 = require("typeorm");
let Portifolio = exports.Portifolio = class Portifolio {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Portifolio.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], Portifolio.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Portifolio.prototype, "lastname", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => experience_entity_1.Experience, (experience) => experience.portifolio),
    __metadata("design:type", Array)
], Portifolio.prototype, "experiences", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => hardSkill_entity_1.HardSkill, (hardSkills) => hardSkills.portifolio),
    __metadata("design:type", Array)
], Portifolio.prototype, "hardSkills", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => certificate_entity_1.Certificate, (certificates) => certificates.portifolio),
    __metadata("design:type", Array)
], Portifolio.prototype, "certificates", void 0);
exports.Portifolio = Portifolio = __decorate([
    (0, typeorm_1.Entity)()
], Portifolio);
//# sourceMappingURL=portifolio.entity.js.map