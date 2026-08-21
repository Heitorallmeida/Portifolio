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

export type Project = {
  id: number;
  title: string;
  description: string;
  image?: string | null;
  repositoryUrl?: string | null;
  liveUrl?: string | null;
  technologies: string[];
  initialDate: string;
  finishDate?: string | null;
  current: boolean;
  featured: boolean;
};

export type User = {
  id: number;
  name: string;
  lastname: string;
  experiences: Experience[];
  hardSkills: HardSkills;
  projects?: Project[];
  profileImageUrl?: string;
  aboutMe?: string | null;
  role?: string | null;
};
