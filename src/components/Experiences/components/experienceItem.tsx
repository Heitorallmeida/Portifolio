import { CardContent, Typography } from "@material-ui/core";
import { CardMediaStyled, CardStyle } from "./styles";

interface ExperienceItemProps {
  name: string;
  image: string;
  current?: boolean;
}

function ExperienceItem(props: ExperienceItemProps) {
  const { name, image, current } = props;
  return (
    <CardStyle current={current}>
      <CardMediaStyled component="img" image={image} />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="h2"
          style={{ fontWeight: "bold" }}
        >
          {name}
        </Typography>
      </CardContent>
    </CardStyle>
  );
}

export default ExperienceItem;
