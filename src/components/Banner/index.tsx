import imagem from "../../assets/eu.jpeg";
import React, { useCallback } from "react";
import { useEffect } from "react";
import * as S from "./styles";
import useLanguage from "../../hooks/useLanguage";

function Banner() {
  const [firstText, setFirstText] = React.useState<string>("");
  const [secondText, setSecondText] = React.useState<string>("");
  const [renderTextInterval, setRenderTextInterval] =
    React.useState<NodeJS.Timer>();
  const { language } = useLanguage();

  const writeText = useCallback(() => {
    let index = 1;
    if (renderTextInterval) {
      clearTimeout(renderTextInterval);
    }

    const text =
      language === "pt-BR"
        ? "Olá, Sou Heitor Almeida"
        : "Hi,  I'm Heitor Almeida";
    const processaTexto = () => {
      if (index <= 4) {
        setFirstText(text.substring(0, index));
        index = index + 1;
      } else if (index <= text.length) {
        setSecondText(text.substring(5, index));
        index = index + 1;
      }
    };
    const interval = setInterval(processaTexto, 150);
    setRenderTextInterval(interval);
  }, [language, renderTextInterval]);

  useEffect(() => {
    writeText();
  }, [language]);

  return (
    <S.bannerContainer>
      <div>
        {
          <S.particles
            id="tsparticles"
            style={{ position: "relative", color: "white" }}
            canvasClassName={"canvas"}
            options={{
              style: { position: "relative" },
              fpsLimit: 60,
              position: "initial",
              background: {
                color: "#000",
              },
              interactivity: {
                events: {
                  onClick: { enable: true, mode: "push" },
                  onHover: {
                    enable: true,
                    mode: "repulse",
                    parallax: { enable: false, force: 60, smooth: 10 },
                  },
                  resize: true,
                },
                modes: {
                  push: { quantity: 4 },
                  repulse: { distance: 200, duration: 0.4 },
                },
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
                  straight: false,
                },
                number: {
                  density: {
                    enable: true,
                    area: 800,
                  },
                  value: 80,
                },
                opacity: {
                  animation: {
                    enable: true,
                    speed: 0.05,
                    sync: true,
                    startValue: "max",
                    count: 1,
                    destroy: "none",
                  },
                  value: {
                    min: 0.5,
                    max: 0.7,
                  },
                },
                shape: {
                  type: "circle",
                },
                size: {
                  value: { min: 1, max: 5 },
                },
              },
            }}
          />
        }
        <S.image src={imagem}></S.image>,
        <S.bannerTitleText variant="h2" color="secondary">
          {firstText}
        </S.bannerTitleText>
        <S.bannerSecondTitleText variant="h2" color="secondary">
          {secondText}
        </S.bannerSecondTitleText>
      </div>
    </S.bannerContainer>
  );
}

export default Banner;
