import styled from "styled-components";

export const ProjectsWrapper = styled.section`
  padding: 6rem max(1.5rem, calc((100vw - 1180px) / 2));
  background: #fff;
`;

export const Header = styled.header`
  max-width: 620px;
  margin: 0 auto 3.5rem;
  text-align: center;
  h2 { margin: 0; color: #0f172a; font-size: clamp(2.25rem, 5vw, 3.5rem); font-weight: 700; letter-spacing: -0.055em; }
  p { margin: 1rem 0 0; color: #64748b; font-size: 1.05rem; line-height: 1.7; }
`;

export const Label = styled.span`
  display: block;
  margin-bottom: 0.75rem;
  color: #0891b2;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.16em;
`;

export const Carousel = styled.div`
  width: min(1180px, 100%);
  margin: 0 auto;
`;

export const Viewport = styled.div`
  overflow: hidden;
  padding: 0.5rem;
`;

export const Track = styled.div<{ $activeIndex: number }>`
  display: flex;
  transition: transform 420ms cubic-bezier(0.22, 1, 0.36, 1);
  transform: translateX(${({ $activeIndex }) => `-${$activeIndex * 33.333333}%`});
  @media (max-width: 960px) { transform: translateX(${({ $activeIndex }) => `-${$activeIndex * 50}%`}); }
  @media (max-width: 620px) { transform: translateX(${({ $activeIndex }) => `-${$activeIndex * 100}%`}); }
`;

export const Slide = styled.div`
  flex: 0 0 33.333333%;
  min-width: 0;
  padding: 0 0.75rem;
  @media (max-width: 960px) { flex-basis: 50%; }
  @media (max-width: 620px) { flex-basis: 100%; }
`;

export const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 1.25rem;
`;

export const Button = styled.button`
  display: grid;
  width: 42px;
  height: 42px;
  place-items: center;
  border: 1px solid #cbd5e1;
  border-radius: 50%;
  background: #fff;
  color: #0f172a;
  cursor: pointer;
  &:hover { border-color: #0891b2; background: #0891b2; color: #fff; }
`;

export const Dots = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const Dot = styled.button<{ $active: boolean }>`
  width: ${({ $active }) => ($active ? "1.6rem" : "0.55rem")};
  height: 0.55rem;
  padding: 0;
  border: 0;
  border-radius: 999px;
  background: ${({ $active }) => ($active ? "#0891b2" : "#cbd5e1")};
  cursor: pointer;
  transition: width 160ms ease, background 160ms ease;
`;
