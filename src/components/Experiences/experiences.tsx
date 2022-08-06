import ExperienceItem from "./components/experienceItem";
import propep from "../../assets/propep.png";
import ufal from "../../assets/ufal.png";
import nti from "../../assets/nti.jpg";
import accio from "../../assets/accio.png";
import edge from "../../assets/edge.png";
import vitalis from "../../assets/vitalis.png";
import { Typography } from "@material-ui/core";
import { experiencesWrapper, row } from "./styles";

function Experiences() {
  return (
    <div className={experiencesWrapper}>
      <Typography
        variant="h3"
        component="h2"
        style={{ fontWeight: "bold", textAlign: "center", marginTop: "6rem" }}
      >
        Experiências
      </Typography>
      <Typography
        variant="h4"
        component="h2"
        style={{ fontWeight: "bold", textAlign: "center", marginTop: "1rem" }}
      >
        Iniciou Engenharia de Computação
      </Typography>
      <div className={row}>
        <ExperienceItem nome="Bolsista" imagem={propep}></ExperienceItem>
        <ExperienceItem nome="" imagem={ufal}></ExperienceItem>
        <ExperienceItem nome="Dev Full Stack" imagem={nti}></ExperienceItem>
      </div>
      <div className={row}>
        <ExperienceItem nome="Dev Full Stack" imagem={accio}></ExperienceItem>
        <ExperienceItem nome="Dev Front End" imagem={edge}></ExperienceItem>
        <ExperienceItem nome="Dev Front End" imagem={vitalis}></ExperienceItem>
      </div>
    </div>
  );
}

export default Experiences;
