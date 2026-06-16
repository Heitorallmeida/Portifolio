export type Experience = {
  id: number;
  initialDate: string;
  finishDate: string;
  current: boolean;
  image: string;
  title: string;
  portifolioId: number;
};


export type HardSkills = {
  [key: string]: number;
};

export type User = {
  id: number;
  name: string;
  lastname: string;
  experiences: Experience[];
  hardSkills: HardSkills;
  profileImageUrl?: string;
};
