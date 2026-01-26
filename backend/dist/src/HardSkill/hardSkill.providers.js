"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hardSkillProviders = void 0;
const hardSkill_entity_1 = require("./hardSkill.entity");
exports.hardSkillProviders = [
    {
        provide: 'HARD_SKILL_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(hardSkill_entity_1.HardSkill),
        inject: ['DATA_SOURCE'],
    },
];
//# sourceMappingURL=hardSkill.providers.js.map