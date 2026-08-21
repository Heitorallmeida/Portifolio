import styled from "styled-components";

export const ExperiencesWrapper = styled.section`
  padding: 6rem max(1.5rem, calc((100vw - 1180px) / 2));
  background: #f8fafc;
`;

export const SectionHeader = styled.header`
  max-width: 620px;
  margin: 0 auto 3.5rem;
  text-align: center;
  h2 { margin: 0; color: #0f172a; font-size: clamp(2.25rem, 5vw, 3.5rem); font-weight: 700; letter-spacing: -0.055em; }
  p { margin: 1rem 0 0; color: #64748b; font-size: 1.05rem; line-height: 1.7; }
`;

export const SectionLabel = styled.span`
  display: block;
  margin-bottom: 0.75rem;
  color: #0891b2;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.16em;
`;

export const Carousel = styled.section`
  width: min(1180px, 100%);
  margin: 0 auto;
`;

export const CarouselViewport = styled.div`
  overflow: hidden;
  padding: 0.5rem;
`;

export const CarouselTrack = styled.div<{ $activeIndex: number }>`
  display: flex;
  transition: transform 420ms cubic-bezier(0.22, 1, 0.36, 1);
  transform: translateX(${({ $activeIndex }) => `-${$activeIndex * 33.333333}%`});

  @media (max-width: 960px) {
    transform: translateX(${({ $activeIndex }) => `-${$activeIndex * 50}%`});
  }

  @media (max-width: 620px) {
    transform: translateX(${({ $activeIndex }) => `-${$activeIndex * 100}%`});
  }
`;

export const CarouselSlide = styled.div`
  flex: 0 0 33.333333%;
  min-width: 0;
  padding: 0 0.75rem;

  @media (max-width: 960px) { flex-basis: 50%; }
  @media (max-width: 620px) { flex-basis: 100%; }
`;

export const CarouselControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 1.25rem;
`;

export const CarouselButton = styled.button`
  display: grid;
  width: 42px;
  height: 42px;
  place-items: center;
  border: 1px solid #cbd5e1;
  border-radius: 50%;
  background: #fff;
  color: #0f172a;
  cursor: pointer;
  transition: background 160ms ease, border-color 160ms ease, color 160ms ease;

  &:hover { border-color: #0891b2; background: #0891b2; color: #fff; }
`;

export const CarouselDots = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const CarouselDot = styled.button<{ $active: boolean }>`
  width: ${({ $active }) => ($active ? "1.6rem" : "0.55rem")};
  height: 0.55rem;
  padding: 0;
  border: 0;
  border-radius: 999px;
  background: ${({ $active }) => ($active ? "#0891b2" : "#cbd5e1")};
  cursor: pointer;
  transition: width 160ms ease, background 160ms ease;
`;
