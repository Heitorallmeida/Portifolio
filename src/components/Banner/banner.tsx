import imagem from "../../assets/eu.jpeg";
import React from "react";
import { useEffect } from "react";
import * as S from './styles';



function Banner(){
    const [primeiroTexto, setPrimeiroTexto] = React.useState("");
    const [segundoTexto, setSegundoTexto] = React.useState("");
    const texto: string = "Olá, Sou Heitor Almeida";
    var indice: number = 1;


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
    setInterval(processaTexto,150);
    },[]);

    return(
        <S.bannerContainer>
            <div>{
            <S.particles
              id="tsparticles"
              style= {{position: "relative", color: "white"}}
              canvasClassName ={"canvas"}
              options={{
                style: {position: "relative"},
                fpsLimit: 60,
                position: "initial",
                background: {
                  color: "#000"
                },
                interactivity: {
                  events: {
                    onClick: { enable: true, mode: "push" },
                    onHover: {
                      enable: true,
                      mode: "repulse",
                      parallax: { enable: false, force: 60, smooth: 10 }
                    },
                    resize: true
                  },
                  modes: {
                    push: { quantity: 4 },
                    repulse: { distance: 200, duration: 0.4 }
                  }
                },
                particles: {
                  refresh: false,
                  color: { value: "#ffffff" },
                  reduceDuplicates: false,
                  move: {
                    direction: "none",
                    enable: true,
                    outModes: "out",
                    random: false,
                    speed: 2,
                    straight: false
                  },
                  number: {
                    density: {
                      enable: true,
                      area: 800
                    },
                    value: 80
                  },
                  opacity: {
                    animation: {
                      enable: true,
                      speed: 0.05,
                      sync: true,
                      startValue: "max",
                      count: 1,
                      destroy: "none"
                    },
                    value: {
                      min: 0.5,
                      max: 0.7
                    }
                  },
                  shape: {
                    type: "circle"
                  },
                  size: {
                    value: { min: 1, max: 5 }
                  }
                }
              }}
            />}
            <S.image src={imagem}></S.image>,
            <S.bannerTitleText variant = "h2" color= "secondary">
              {primeiroTexto}
            </S.bannerTitleText>
            <S.bannerSecondTitleText variant = "h2" color= "secondary">
              {segundoTexto}
            </S.bannerSecondTitleText>
        </div>
        </S.bannerContainer>
        
    );
}

export default Banner;
