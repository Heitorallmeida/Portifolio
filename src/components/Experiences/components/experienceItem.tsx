import {
  Card,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { CardMediaStyled, CardStyle } from "./styles";

const useStyles = makeStyles({});

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
