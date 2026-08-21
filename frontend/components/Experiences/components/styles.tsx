import { Card } from "@mui/material";
import styled from "styled-components";

export const CardStyle = styled(Card)<{ $current: boolean }>`
  display: flex;
  flex-direction: column;
  min-height: 315px;
  overflow: hidden;
  border: 1px solid ${({ $current }) => ($current ? "#22d3ee" : "#e2e8f0")};
  border-radius: 1.25rem !important;
  box-shadow: 0 10px 25px rgba(15, 23, 42, 0.06) !important;
  transition: transform 180ms ease, box-shadow 180ms ease;
  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 35px rgba(15, 23, 42, 0.14) !important;
  }
  h2 { color: #0f172a; font-size: 1.28rem; font-weight: 700; line-height: 1.35; }
`;

export const CardMediaStyled = styled.img`
  display: block;
  width: calc(100% - 2.5rem);
  height: 155px;
  margin: 1.25rem 1.25rem 0;
  border-radius: 0.9rem;
  background-color: #f8fafc;
  object-fit: contain;
  object-position: center;
`;

export const Meta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 0.9rem;
  color: #64748b;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

export const CurrentBadge = styled.span`
  padding: 0.22rem 0.5rem;
  border-radius: 999px;
  background: #cffafe;
  color: #0e7490;
  font-size: 0.65rem;
`;
