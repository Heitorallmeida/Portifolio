import { Typography } from "@mui/material";
import Particles from "@tsparticles/react";
import styled from "styled-components";
import Image from 'next/image';
import Link from "next/link";

export const particles = styled(Particles)`
  position: absolute !important;
  inset: 0;
  width: 100%;
  height: 100% !important;

  canvas {
    height: 100% !important;
  }
`;

export const bannerTitleText = styled(Typography)`
  color: #f8fafc;
  font-size: clamp(2.15rem, 4.7vw, 4.3rem) !important;
  font-weight: 300 !important;
  letter-spacing: -0.06em !important;
  line-height: 1 !important;
`;

export const bannerSecondTitleText = styled(Typography)`
  color: #67e8f9;
  font-size: clamp(2.15rem, 4.7vw, 4.3rem) !important;
  font-weight: 700 !important;
  letter-spacing: -0.06em !important;
  line-height: 1 !important;
`;
export const bannerContainer = styled.section`
  position: relative;
  isolation: isolate;
  min-height: clamp(500px, 72vh, 620px);
  overflow: hidden;
  background: radial-gradient(circle at 12% 18%, #1e3a5f 0%, transparent 36%),
    linear-gradient(135deg, #0b1120 0%, #111827 55%, #0f2f42 100%);
`;

export const heroContent = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: clamp(2.5rem, 7vw, 8rem);
  width: min(1180px, calc(100% - 3rem));
  min-height: clamp(500px, 72vh, 620px);
  margin: 0 auto;

  @media (max-width: 720px) {
    min-height: 560px;
    flex-direction: column;
    justify-content: center;
    gap: 2rem;
    text-align: center;
  }
`;

export const image = styled(Image)`
  width: clamp(190px, 24vw, 320px);
  height: clamp(190px, 24vw, 320px);
  border: 1px solid rgba(103, 232, 249, 0.45);
  border-radius: 2rem;
  object-fit: cover;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.38);

  @media (max-width: 720px) {
    width: 172px;
    height: 172px;
    border-radius: 50%;
  }
`;

export const intro = styled.div`
  max-width: 700px;
`;

export const eyebrow = styled.p`
  margin: 0 0 1rem;
  color: #67e8f9;
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.18em;
`;

export const description = styled.p`
  max-width: 560px;
  margin: 1.5rem 0 0;
  color: #cbd5e1;
  font-size: clamp(1rem, 2vw, 1.2rem);
  line-height: 1.7;

  @media (max-width: 720px) {
    margin-right: auto;
    margin-left: auto;
  }
`;

export const portfolioLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1.35rem;
  padding: 0.55rem 0.85rem;
  border: 1px solid rgba(103, 232, 249, 0.5);
  border-radius: 999px;
  color: #ecfeff;
  font-size: 0.8rem;
  font-weight: 700;
  text-decoration: none;
  transition: background 160ms ease, border-color 160ms ease, transform 160ms ease;

  &:hover {
    border-color: #67e8f9;
    background: rgba(103, 232, 249, 0.14);
    transform: translateY(-2px);
  }

  span { font-size: 0.95rem; }
`;

export const generatorNote = styled.p`
  margin: 1rem 0 0;
  color: #94a3b8;
  font-size: 0.78rem;
`;
