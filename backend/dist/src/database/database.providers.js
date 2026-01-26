"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseProviders = void 0;
const typeorm_1 = require("typeorm");
exports.databaseProviders = [
    {
        provide: 'DATA_SOURCE',
        useFactory: async () => {
            const dataSource = new typeorm_1.DataSource({
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'postgres',
                password: 'psql',
                database: 'portifolio',
                entities: [
                    __dirname + '/../**/*.entity{.ts,.js}',
                ],
                migrations: [__dirname + '/migrations/*{.ts,.js}'],
                synchronize: false,
            });
            return dataSource.initialize();
        },
    },
];
//# sourceMappingURL=database.providers.js.map