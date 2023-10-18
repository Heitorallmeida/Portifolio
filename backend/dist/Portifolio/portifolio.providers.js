"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.portifolioProviders = void 0;
const portifolio_entity_1 = require("./portifolio.entity");
exports.portifolioProviders = [
    {
        provide: 'PORTIFOLIO_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(portifolio_entity_1.Portifolio),
        inject: ['DATA_SOURCE'],
    },
];
//# sourceMappingURL=portifolio.providers.js.map