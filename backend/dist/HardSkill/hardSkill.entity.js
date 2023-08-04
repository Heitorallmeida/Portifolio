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
exports.HardSkill = void 0;
const portifolio_entity_1 = require("../Portifolio/portifolio.entity");
const typeorm_1 = require("typeorm");
let HardSkill = exports.HardSkill = class HardSkill {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], HardSkill.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], HardSkill.prototype, "initialDate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], HardSkill.prototype, "finishDate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], HardSkill.prototype, "current", void 0);
__decorate([
    (0, typeorm_1.Column)('float'),
    __metadata("design:type", Number)
], HardSkill.prototype, "percentage", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], HardSkill.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => portifolio_entity_1.Portifolio, (portifolio) => portifolio.experiences),
    __metadata("design:type", portifolio_entity_1.Portifolio)
], HardSkill.prototype, "portifolio", void 0);
exports.HardSkill = HardSkill = __decorate([
    (0, typeorm_1.Entity)()
], HardSkill);
//# sourceMappingURL=hardSkill.entity.js.map