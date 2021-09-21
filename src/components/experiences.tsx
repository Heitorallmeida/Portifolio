import ExperienceItem from "./experienceItem";
import propep from "../assets/propep.png";
import ufal from "../assets/ufal.png";
import nti from "../assets/nti.jpg";
import accio from "../assets/accio.png";
import edge from "../assets/edge.png";
import vitalis from "../assets/vitalis.png";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    row: {
      display: 'flex',
      flexDirection: 'row',
    },
});

function Experiences(){
    
    const classes = useStyles();
    
    return(
        <>  
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
        </>
    );
}

export default Experiences;
