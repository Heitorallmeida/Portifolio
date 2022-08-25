import { CardContent, Typography } from "@material-ui/core";
import { StyledCardMedia, StyledCard } from "./styles";

type CourseItemProps = {
  name: string;
  image: string;
};

const CourseItem = ({ name, image }: CourseItemProps) => {
  return (
    <StyledCard>
      <StyledCardMedia component="img" image={image} />
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
    </StyledCard>
  );
};

export default CourseItem;
