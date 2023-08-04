import { Card, CardMedia } from "@mui/material";
import styled from "styled-components";

export const StyledCard = styled(Card)`
  max-width: 345;
  margin: 0.75rem;
  min-width: 25vh;
`;

export const StyledCardMedia = styled(CardMedia)`
  min-width: 25vh;
  max-width: 30vh;
  height: 20vh;
  margin: 2rem;
  margin-left: auto;
  margin-right: auto;
`;
