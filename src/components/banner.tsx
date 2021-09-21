import { Container, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { useEffect } from "react";
import imagem from '../assets/Eu.jpeg'

const useStyles = makeStyles((theme) => ({
    banner: {
      backgroundColor: '#151813', 
      height: '60vh',
      marginTop: '0',
      display: 'flex',
      flexDirection: 'row',
    },
    bannerTitleText:{
      marginTop:'2rem',
    },
    bannerSubTitleText:{
      marginLeft: '1.5rem',
      marginTop:'7rem',
    },
    texto:{
      display: 'flex',
      flexDirection: 'column',
      marginLeft: '1.5rem',
      marginTop:'4rem'
    }
    
  }));

function Banner(){
    const [primeiroTexto, setPrimeiroTexto] = React.useState("");
    const [segundoTexto, setSegundoTexto] = React.useState("");
    const texto: string = "Olá, Sou Heitor Almeida";
    var indice: number = 1;
    
    const classes = useStyles();

    const processaTexto = () =>{
        if(indice <= 4){
          setPrimeiroTexto(texto.substring(0,indice));
          indice = indice +1;
        } else if(indice <= texto.length){
          setSegundoTexto(texto.substring(5,indice));
          indice = indice +1;
        }
    }

    useEffect(()=>{
    setInterval(processaTexto,300);
    },[]);

    return(
        <Container style={{padding:0, maxWidth: 'inherit'}}>
            <Typography component="div" className = {classes.banner}>
            <img src={imagem} width = "200vw" style={{padding: '2rem', borderRadius: '50px'}}></img>
            <Typography variant = "h2" color= "secondary" className = {classes.bannerTitleText}>
                {primeiroTexto}
            </Typography>
            <Typography variant = "h2" color= "secondary" className = {classes.bannerSubTitleText}>
                {segundoTexto}
            </Typography>
            </Typography>
        </Container>
    );
}

export default Banner;
