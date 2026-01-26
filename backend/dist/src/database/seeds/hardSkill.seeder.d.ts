import { DataSource } from 'typeorm';
export declare class HardSkillSeeder {
    run(dataSource: DataSource): Promise<void>;
    private calculatePercentage;
}
