import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { Project } from "@/api/user/user.types";
import useLanguage from "@/hooks/useLanguage";
import useUser from "@/hooks/useUser";
import ProjectItem from "./components/projectItem";
import * as S from "./styles";

function Projects() {
  const { user } = useUser();
  const { language } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(3);

  const projects = useMemo<Project[]>(
    () => [...(user?.projects ?? [])].sort((first, second) => Number(second.featured) - Number(first.featured)),
    [user?.projects],
  );

  useEffect(() => {
    const updateSlidesPerView = () => {
      if (window.innerWidth <= 620) return setSlidesPerView(1);
      if (window.innerWidth <= 960) return setSlidesPerView(2);
      setSlidesPerView(3);
    };

    updateSlidesPerView();
    window.addEventListener("resize", updateSlidesPerView);
    return () => window.removeEventListener("resize", updateSlidesPerView);
  }, []);

  const lastSlideIndex = Math.max(0, projects.length - slidesPerView);
  useEffect(() => setActiveIndex((current) => Math.min(current, lastSlideIndex)), [lastSlideIndex]);

  if (projects.length === 0) return null;

  const goToPrevious = () => setActiveIndex((current) => (current === 0 ? lastSlideIndex : current - 1));
  const goToNext = () => setActiveIndex((current) => (current === lastSlideIndex ? 0 : current + 1));

  return (
    <S.ProjectsWrapper>
      <S.Header>
        <S.Label>{language === "pt-BR" ? "PORTFÓLIO" : "PORTFOLIO"}</S.Label>
        <Typography variant="h3" component="h2">{language === "pt-BR" ? "Projetos em destaque" : "Featured projects"}</Typography>
        <p>{language === "pt-BR" ? "Alguns produtos e experiências que ajudei a transformar em realidade." : "A selection of products and experiences I helped bring to life."}</p>
      </S.Header>
      <S.Carousel aria-roledescription="carousel" aria-label="Projetos em destaque">
        <S.Viewport>
          <S.Track $activeIndex={activeIndex}>
            {projects.map((project, index) => (
              <S.Slide key={project.id} aria-hidden={index < activeIndex || index >= activeIndex + slidesPerView}>
                <ProjectItem {...project} />
              </S.Slide>
            ))}
          </S.Track>
        </S.Viewport>
        {projects.length > slidesPerView && (
          <S.Controls>
            <S.Button type="button" onClick={goToPrevious} aria-label="Projeto anterior"><ArrowBackRoundedIcon /></S.Button>
            <S.Dots>
              {projects.slice(0, lastSlideIndex + 1).map((project, index) => (
                <S.Dot key={project.id} type="button" $active={index === activeIndex} onClick={() => setActiveIndex(index)} aria-label={`Ir para grupo de projetos ${index + 1}`} aria-current={index === activeIndex} />
              ))}
            </S.Dots>
            <S.Button type="button" onClick={goToNext} aria-label="Próximo projeto"><ArrowForwardRoundedIcon /></S.Button>
          </S.Controls>
        )}
      </S.Carousel>
    </S.ProjectsWrapper>
  );
}

export default Projects;
