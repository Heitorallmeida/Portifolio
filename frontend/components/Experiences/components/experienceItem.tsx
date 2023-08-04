import { CardContent, Typography } from "@mui/material";
import { StaticImageData } from "next/image";
import { CardMediaStyled, CardStyle } from "./styles";

interface ExperienceItemProps {
  name: string;
  image: string;
  current?: boolean;
}

function ExperienceItem(props: ExperienceItemProps) {
  const { name, image, current } = props;
  return (
    <CardStyle 
      style={{
        border: current ? "solid" : "none",
        borderWidth: current ? "thin" : "none",
        borderColor:
        current ? "cornflowerblue" : "none"}}
    >
        <CardMediaStyled image={image} />
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
