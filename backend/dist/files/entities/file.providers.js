"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileProviders = void 0;
const file_entity_1 = require("./file.entity");
exports.fileProviders = [
    {
        provide: 'FILE_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(file_entity_1.File),
        inject: ['DATA_SOURCE'],
    },
];
//# sourceMappingURL=file.providers.js.map