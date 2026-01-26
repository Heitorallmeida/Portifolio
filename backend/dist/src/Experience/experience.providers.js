"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.experienceProviders = void 0;
const experience_entity_1 = require("./experience.entity");
exports.experienceProviders = [
    {
        provide: 'EXPERIENCE_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(experience_entity_1.Experience),
        inject: ['DATA_SOURCE'],
    },
];
//# sourceMappingURL=experience.providers.js.map