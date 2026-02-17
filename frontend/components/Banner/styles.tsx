import { Container, Typography } from "@mui/material";
import Particles from "@tsparticles/react";
import styled from "styled-components";
import Image from 'next/image';

export const particles = styled(Particles)`
  background-color: #151813;
  height: 60vh !important;
  position: relative !important;
  margin-top: 0;
  display: flex;
  flex-direction: column;
   box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5), 
              0 10px 30px rgba(0, 0, 0, 0.3),
              0 0 40px rgba(255, 255, 255, 0.1);
              
  canvas {
    height: 60vh !important;
  }
`;

export const bannerTitleText = styled(Typography)`
  top: 4rem;
  color: white;
  position: absolute;
  left: 35vh;
  @media (max-width: 600px) {
    left: 5vh;
  }
`;

export const bannerSecondTitleText = styled(Typography)`
  left: 37vh;
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
  witdh: 100%;
  max-width: 100% !important;
  padding: 0 !important;
 
`;

export const image = styled(Image)`
  padding: 2rem;
  border-radius: 50px;
  width: 30vh;
  height: 30vh;

  @media (max-width: 600px) {
    display: none;
  }

  position: absolute;
  top: 2rem;
`;
