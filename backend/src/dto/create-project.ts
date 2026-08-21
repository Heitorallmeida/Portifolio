export class CreateProjectDto {
  title: string;
  description: string;
  image?: string;
  repositoryUrl?: string;
  liveUrl?: string;
  technologies?: string[];
  initialDate: Date;
  finishDate?: Date;
  current?: boolean;
  featured?: boolean;
  portifolioId: number;
}
