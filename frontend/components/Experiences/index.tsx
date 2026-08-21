import ExperienceItem from "./components/experienceItem";
import { Typography } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { Carousel, CarouselButton, CarouselControls, CarouselDot, CarouselDots, CarouselSlide, CarouselTrack, CarouselViewport, ExperiencesWrapper, SectionHeader, SectionLabel } from "./styles";
import useLanguage from "../../hooks/useLanguage";
import { useState, useEffect, useMemo } from "react";
import useUser from "@/hooks/useUser";
import { Experience } from "@/api/user/user.types";

function Experiences() {
  const [experiences, setExperiences] = useState<Experience[]>();
  const [activeIndex, setActiveIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(3);
  const { language } = useLanguage();
  const { user } = useUser();

  
  useEffect(() => {
    if(user){
      setExperiences(user.experiences);
      setActiveIndex(0);
    }
     
  }, [user]);

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

  const totalExperiences = experiences?.length ?? 0;
  const sortedExperiences = useMemo(
    () => [...(experiences ?? [])].sort(
      (first, second) => new Date(second.initialDate).getTime() - new Date(first.initialDate).getTime()
    ),
    [experiences]
  );
  const lastSlideIndex = Math.max(0, totalExperiences - slidesPerView);

  useEffect(() => {
    setActiveIndex((current) => Math.min(current, lastSlideIndex));
  }, [lastSlideIndex]);

  const goToPrevious = () => setActiveIndex((current) => (current === 0 ? lastSlideIndex : current - 1));
  const goToNext = () => setActiveIndex((current) => (current === lastSlideIndex ? 0 : current + 1));
  
  return (
    <ExperiencesWrapper>
      <SectionHeader>
        <SectionLabel>{language === "pt-BR" ? "TRAJETÓRIA" : "CAREER"}</SectionLabel>
        <Typography variant="h3" component="h2">
          {language === "pt-BR" ? "Experiências" : "Experience"}
        </Typography>
        <p>{language === "pt-BR" ? "Projetos, produtos e times que fizeram parte da minha jornada." : "Projects, products, and teams that shaped my journey."}</p>
      </SectionHeader>
      {totalExperiences > 0 && (
        <Carousel aria-roledescription="carousel" aria-label="Experiências profissionais">
          <CarouselViewport>
            <CarouselTrack $activeIndex={activeIndex}>
              {sortedExperiences.map((experience, index) => (
                <CarouselSlide key={experience.id} aria-hidden={index < activeIndex || index >= activeIndex + slidesPerView}>
                  <ExperienceItem name={experience.title} image={experience.image} initialDate={experience.initialDate} finishDate={experience.finishDate} current={experience.current} />
                </CarouselSlide>
              ))}
            </CarouselTrack>
          </CarouselViewport>
          <CarouselControls>
            <CarouselButton type="button" onClick={goToPrevious} aria-label="Experiência anterior"><ArrowBackRoundedIcon /></CarouselButton>
            <CarouselDots>
              {sortedExperiences.slice(0, lastSlideIndex + 1).map((experience, index) => (
                <CarouselDot key={experience.id} type="button" $active={index === activeIndex} onClick={() => setActiveIndex(index)} aria-label={`Ir para grupo de experiências ${index + 1}`} aria-current={index === activeIndex} />
              ))}
            </CarouselDots>
            <CarouselButton type="button" onClick={goToNext} aria-label="Próxima experiência"><ArrowForwardRoundedIcon /></CarouselButton>
          </CarouselControls>
        </Carousel>
      )}
    </ExperiencesWrapper>
  );
}

export default Experiences;
