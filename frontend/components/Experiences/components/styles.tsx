import { Card, CardMedia } from "@mui/material";
import styled from "styled-components";

export const CardStyle = styled(Card)`
  max-width: 345;
  margin: auto;
  margin-bottom: 2rem;
  min-width: 30vh;
  margin-right: auto;
  &:hover {
    box-shadow: 5px 5px gray;
  }
`;

export const CardMediaStyled = styled(CardMedia)<{ link?: string }>`
  background-image
  min-width: 25vh;
  max-width: 30vh;
  height: 20vh;
  margin: 2rem;
  margin-left: auto;
  margin-right: auto;
`;
