import { Typography } from "@mui/material";
import styled from "styled-components";

export const certificados = styled(Typography)`
  margin: 2.5rem;
  margin-top: 5rem;
  font-weight: bold;
  color: white;
  @media (max-width: 320px) {
    font-size: 3rem;
  }
`;

export const container = styled.div`
  padding: 2rem;
  display: flex;
  @media (max-width: 850px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const coursesContainer = styled.div`
  min-width: 50vw;
  display: flex;
  @media (max-width: 850px) {
    flex-direction: column;
    align-items: center;
  }
  overflow-x: scroll;
  scrollbar-color: #051932 white;
`;
