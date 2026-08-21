export type Experience = {
  title: string;
  initialDate: string;
  finishDate: string;
  current: boolean;
  image: string;
};

export type HardSkill = {
  title: string;
  initialDate: string;
  finishDate: string;
  current: boolean;
  percentage: number;
};

export type Project = {
  title: string;
  description: string;
  image: string;
  repositoryUrl: string;
  liveUrl: string;
  technologies: string[];
  initialDate: string;
  finishDate: string;
  current: boolean;
  featured: boolean;
};
