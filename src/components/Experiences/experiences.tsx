import ExperienceItem from "./components/experienceItem";
import propep from "../../assets/propep.png";
import ufal from "../../assets/ufal.png";
import nti from "../../assets/nti.jpg";
import accio from "../../assets/accio.png";
import edge from "../../assets/edge.png";
import vitalis from "../../assets/vitalis.png";
import sambatech from "../../assets/sambatech.jpg";
import { Typography } from "@material-ui/core";
import { ExperiencesWrapper, Row } from "./styles";

function Experiences() {
  return (
    <ExperiencesWrapper>
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
      <Row>
        <ExperienceItem name="Bolsista" image={propep}></ExperienceItem>
        <ExperienceItem name="" image={ufal}></ExperienceItem>
        <ExperienceItem name="Dev Full Stack" image={nti}></ExperienceItem>
      </Row>
      <Row>
        <ExperienceItem name="Dev Full Stack" image={accio}></ExperienceItem>
        <ExperienceItem name="Dev Front End" image={edge}></ExperienceItem>
        <ExperienceItem name="Dev Front End" image={vitalis}></ExperienceItem>
      </Row>
      <Row>
        <ExperienceItem
          name="Dev Frontend"
          image={sambatech}
          current={true}
        ></ExperienceItem>
      </Row>
    </ExperiencesWrapper>
  );
}

export default Experiences;
