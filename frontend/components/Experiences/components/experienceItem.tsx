import { CardContent, Typography } from "@mui/material";
import { resolveImageSrc } from "@/utils/image";
import { CardMediaStyled, CardStyle, CurrentBadge, Meta } from "./styles";

interface ExperienceItemProps {
  name: string;
  image: string;
  initialDate: string;
  finishDate: string;
  current?: boolean;
}

function ExperienceItem({ name, image, initialDate, finishDate, current }: ExperienceItemProps) {
  const formatDate = (date: string) => new Intl.DateTimeFormat("pt-BR", { month: "short", year: "numeric" }).format(new Date(date));
  const imageSrc = resolveImageSrc(image);

  return (
    <CardStyle $current={Boolean(current)}>
      <CardMediaStyled src={imageSrc} alt={`Logo da ${name}`} />
      <CardContent>
        <Meta>
          <span>{formatDate(initialDate)} - {current ? "Atual" : formatDate(finishDate)}</span>
          {current && <CurrentBadge>ATUAL</CurrentBadge>}
        </Meta>
        <Typography
          gutterBottom
          variant="h5"
          component="h2"
        >
          {name}
        </Typography>
      </CardContent>
    </CardStyle>
  );
}

export default ExperienceItem;
