import { Container, Typography } from "@material-ui/core";
import Particles from "react-tsparticles";
import styled from "styled-components";

export const particles = styled(Particles)`
  background-color: #151813;
  height: 60vh !important;
  position: relative !important;
  margin-top: 0;
  display: flex;
  flex-direction: column;
`;

export const bannerTitleText = styled(Typography)`
  top: 4rem;
  color: white;
  position: absolute;
  left: 32vh;
  @media (max-width: 600px) {
    left: 5vh;
  }
`;

export const bannerSecondTitleText = styled(Typography)`
  left: 35vh;
  @media (max-width: 600px) {
    left: 8vh;
  }
  color: white;
  position: absolute;
  top: 9.5rem;
`;
export const bannerContainer = styled(Container)`
  padding: 0;
  max-width: inherit;
  height: 50vh;
`;

export const image = styled.img`
  padding: 2rem;
  border-radius: 50px;
  width: 25vh;
  @media (max-width: 600px) {
    display: none;
  }

  position: absolute;
  top: 2rem;
`;
