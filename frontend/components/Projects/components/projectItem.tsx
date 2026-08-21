import GitHubIcon from "@mui/icons-material/GitHub";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import { Project } from "@/api/user/user.types";
import { resolveImageSrc } from "@/utils/image";
import * as S from "./styles";

type ProjectItemProps = Pick<Project, "title" | "description" | "image" | "repositoryUrl" | "liveUrl" | "technologies" | "featured">;

function ProjectItem({ title, description, image, repositoryUrl, liveUrl, technologies, featured }: ProjectItemProps) {
  const imageSrc = resolveImageSrc(image);

  return (
    <S.Card $featured={featured}>
      <S.Cover $hasImage={Boolean(imageSrc)} style={imageSrc ? { backgroundImage: `url(${imageSrc})` } : undefined}>
        {featured && <S.FeaturedBadge>DESTAQUE</S.FeaturedBadge>}
      </S.Cover>
      <S.Content>
        <h3>{title}</h3>
        <p>{description}</p>
        <S.Technologies>
          {technologies.map((technology) => <S.Tag key={technology}>{technology}</S.Tag>)}
        </S.Technologies>
        {(repositoryUrl || liveUrl) && (
          <S.Links>
            {repositoryUrl && <S.ProjectLink href={repositoryUrl} target="_blank" rel="noreferrer"><GitHubIcon /> Código</S.ProjectLink>}
            {liveUrl && <S.ProjectLink href={liveUrl} target="_blank" rel="noreferrer"><OpenInNewRoundedIcon /> Demo</S.ProjectLink>}
          </S.Links>
        )}
      </S.Content>
    </S.Card>
  );
}

export default ProjectItem;
