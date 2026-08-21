"use client";
import React from "react";
import { useEffect } from "react";
import * as S from "./styles";
import useUser from "@/hooks/useUser";
import useLanguage from "@/hooks/useLanguage";
import { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import AnimatedText from "./components/AnimatedText";
import { PARTICLES_OPTIONS } from "./constants";

function Banner() {
  const { user } = useUser();
  const { language } = useLanguage();

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    });
  }, []);


  return (
    <S.bannerContainer>
      <S.particles id="tsparticles" options={PARTICLES_OPTIONS} />
      <S.heroContent>
        {user?.profileImageUrl && (
          <S.image
            width={480}
            height={480}
            src={user.profileImageUrl}
            alt="Foto de perfil de Heitor Almeida"
            priority
            unoptimized
          />
        )}
        <S.intro>
          <S.eyebrow>{user?.role || "SOFTWARE ENGINEER"}</S.eyebrow>
          <AnimatedText />
          <S.description>
            {user?.aboutMe || ""}
          </S.description>
          <S.portfolioLink href="/">
            {language === "pt-BR" ? "Explorar portfólios" : "Explore portfolios"}
            <span aria-hidden="true">→</span>
          </S.portfolioLink>
          <S.generatorNote>
            {language === "pt-BR" ? "Um portfólio criado com a plataforma Portifolio." : "A portfolio created with the Portifolio platform."}
          </S.generatorNote>
        </S.intro>
      </S.heroContent>
    </S.bannerContainer>
  );
}

export default Banner;
