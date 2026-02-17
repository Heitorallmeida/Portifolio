export type Experience = {
  id: number;
  initialDate: string;
  finishDate: string;
  current: boolean;
  image: string;
  title: string;
  portifolioId: number;
};

export type Certificate = {
  id: number;
  title: string;
  image_name: string;
  image: string;
};

export type ProfileImage = {
  id: number;
  fileName: string;
  contentLength: number;
  contentType: string;
  url: string;
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
  certificates: Certificate[];
  profileImage: ProfileImage;
};
