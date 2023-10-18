import ExperienceItem from "./components/experienceItem";
import { Typography } from "@mui/material";
import { ExperiencesWrapper, Row } from "./styles";
import useLanguage from "../../hooks/useLanguage";
import { useState, useEffect } from "react";
import { Experience } from "@/api/experience/experience.type";
import { Portifolio } from "@/api/portifolio/portifolio.types";
import useUser from "@/hooks/useUser";

function Experiences() {
  const [experiences, setExperiences] = useState<Experience[]>();
  const { language } = useLanguage();
  const { user } = useUser();

  
  useEffect(() => {
    if(user){
      setExperiences(user.experiences)
    }
     
  }, [user]);
  
  return (
    <ExperiencesWrapper>
      <Typography
        variant="h3"
        component="h2"
        style={{
          fontWeight: "bold",
          textAlign: "center",
          marginTop: "6rem",
          color: "white",
        }}
      >
        {language === "pt-BR" ? "Experiências" : "Experiences"}
      </Typography>
      <Typography
        variant="h4"
        component="h2"
        style={{
          fontWeight: "bold",
          textAlign: "center",
          marginTop: "1rem",
          color: "white",
        }}
      >
        {language === "pt-BR"
          ? "Iniciou Engenharia de Computação"
          : "Started Computer Engineering"}
      </Typography>
      {experiences?.map((experience, index)=>{
        if(index % 3 === 0){
          return (
          <Row key={index}>
            <ExperienceItem name={experience.title} image={`/static/images/${experience.image}`} current={experience.current}></ExperienceItem>
            {experiences[index+1] && <ExperienceItem name={experiences[index+1].title} image={`/static/images/${experiences[index+1].image}`} current={experiences[index+1].current}></ExperienceItem>}
            {experiences[index+2] && <ExperienceItem name={experiences[index+2].title} image={`/static/images/${experiences[index+2].image}`} current={experiences[index+2].current}></ExperienceItem>}
          </Row>
          )
        }
      })}
    </ExperiencesWrapper>
  );
}

export default Experiences;
