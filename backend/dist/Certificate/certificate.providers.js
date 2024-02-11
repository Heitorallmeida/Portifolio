"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.certificateProviders = void 0;
const certificate_entity_1 = require("./certificate.entity");
exports.certificateProviders = [
    {
        provide: 'CERTIFICATE_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(certificate_entity_1.Certificate),
        inject: ['DATA_SOURCE'],
    },
];
//# sourceMappingURL=certificate.providers.js.map