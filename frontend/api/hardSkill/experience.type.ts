export type HardSkill = {
    initialDate: Date;
    finishDate: Date;
    current: boolean;
    percentage: number;
    portifolioId: number;
    title: string;
}
export type HardSkillObject = Record<string, number>;