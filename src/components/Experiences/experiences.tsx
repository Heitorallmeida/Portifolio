import ExperienceItem from "./experienceItem";
import propep from "../../assets/propep.png";
import ufal from "../../assets/ufal.png";
import nti from "../../assets/nti.jpg";
import accio from "../../assets/accio.png";
import edge from "../../assets/edge.png";
import vitalis from "../../assets/vitalis.png";
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles({
    row: {
      display: 'flex',
      flexDirection: 'row',
    },
    experiencesWrapper: {
        background: "linear-gradient(to right, #ece9e6, #fff)"
    }
});

function Experiences(){
    
    const classes = useStyles();
    
    return(
        <div className = {classes.experiencesWrapper}>
            <Typography variant="h3" component="h2" style={{'fontWeight': 'bold', 'textAlign':'center', 'marginTop': '5rem'}}>Experiências</Typography>
            <Typography variant="h4" component="h2" style={{'fontWeight': 'bold', 'textAlign':'center', 'marginTop': '1rem'}}>Iniciou Engenharia de Computação</Typography>
            <div className = {classes.row}>
                <ExperienceItem nome = "Bolsista" imagem = {propep}></ExperienceItem>
                <ExperienceItem nome = "" imagem = {ufal}></ExperienceItem>
                <ExperienceItem nome = "Dev Full Stack" imagem = {nti}></ExperienceItem>
            </div>
            <div className = {classes.row}>
                <ExperienceItem nome = "Dev Full Stack" imagem = {accio}></ExperienceItem>
                <ExperienceItem nome = "Dev Front End" imagem = {edge}></ExperienceItem>
                <ExperienceItem nome = "Dev Front End" imagem = {vitalis}></ExperienceItem>
            </div>
        </div>
    );
}

export default Experiences;
