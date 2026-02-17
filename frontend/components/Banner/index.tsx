"use client";
import imagem from "static/images/eu.jpeg";
import React from "react";
import { useEffect } from "react";
import * as S from "./styles";
import type { Portifolio } from "@/api/portifolio/portifolio.types";
import useUser from "@/hooks/useUser";
import { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import AnimatedText from "./components/AnimatedText";
import { PARTICLES_OPTIONS } from "./constants";

function Banner() {
  const { user } = useUser();

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        });
    }, []);


  return (
    <S.bannerContainer>
      <div>
        {
          <S.particles
            id="tsparticles"
            style={{ position: "relative", color: "white", height: "60vh !important" }}
            className={"canvas"}
            options={PARTICLES_OPTIONS}
          />
        }
        {user?.profileImage?.url && <S.image width={500} height={400} src={user?.profileImage?.url} alt="Heitor imagem" />}
        <AnimatedText />
      </div>
    </S.bannerContainer>
  );
}

export default Banner;
