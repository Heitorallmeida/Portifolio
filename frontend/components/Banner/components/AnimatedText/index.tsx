"use client";
import React from "react";
import * as S from "../../styles";
import { useAnimatedText } from "./hooks/useAnimatedText";

function AnimatedText() {
  const { firstText, secondText } = useAnimatedText();

  return (
    <>
      <S.bannerTitleText variant="h2" color="secondary">
        {firstText}
      </S.bannerTitleText>
      <S.bannerSecondTitleText variant="h2" color="secondary">
        {secondText}
      </S.bannerSecondTitleText>
    </>
  );
}

export default AnimatedText;
