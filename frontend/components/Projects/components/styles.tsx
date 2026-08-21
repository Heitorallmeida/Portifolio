import styled from "styled-components";

export const Card = styled.article<{ $featured: boolean }>`
  height: 100%;
  overflow: hidden;
  border: 1px solid ${({ $featured }) => ($featured ? "#22d3ee" : "#e2e8f0")};
  border-radius: 1.25rem;
  background: #fff;
  box-shadow: 0 10px 25px rgba(15, 23, 42, 0.06);
  transition: transform 180ms ease, box-shadow 180ms ease;

  &:hover { transform: translateY(-6px); box-shadow: 0 20px 35px rgba(15, 23, 42, 0.14); }
`;

export const Cover = styled.div<{ $hasImage: boolean }>`
  position: relative;
  height: 170px;
  background: ${({ $hasImage }) => ($hasImage ? "center / cover no-repeat" : "linear-gradient(135deg, #0f3040, #0f172a)")};
`;

export const FeaturedBadge = styled.span`
  position: absolute;
  top: 0.9rem;
  right: 0.9rem;
  padding: 0.28rem 0.55rem;
  border-radius: 999px;
  background: #cffafe;
  color: #0e7490;
  font-size: 0.64rem;
  font-weight: 800;
  letter-spacing: 0.08em;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 280px;
  padding: 1.35rem;
  h3 { margin: 0; color: #0f172a; font-size: 1.25rem; line-height: 1.3; }
  p { margin: 0.75rem 0 1rem; color: #64748b; font-size: 0.92rem; line-height: 1.6; }
`;

export const Technologies = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
`;

export const Tag = styled.span`
  padding: 0.28rem 0.55rem;
  border-radius: 999px;
  background: #e0f2fe;
  color: #0369a1;
  font-size: 0.7rem;
  font-weight: 700;
`;

export const Links = styled.div`
  display: flex;
  gap: 0.9rem;
  margin-top: auto;
  padding-top: 1.25rem;
`;

export const ProjectLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  color: #0e7490;
  font-size: 0.82rem;
  font-weight: 700;
  text-decoration: none;
  svg { font-size: 1rem; }
  &:hover { color: #0f172a; }
`;
