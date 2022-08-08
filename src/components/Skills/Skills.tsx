import { useCallback, useEffect, useRef, useState } from "react";
import * as S from "./styles";

function Skills() {
  const [activeAnimation, setActiveAnimation] = useState(false);

  const inputEl = useRef<HTMLDivElement | undefined>(null);

  const handleScroll = useCallback(() => {
    const position = window.pageYOffset;
    if (inputEl?.current?.offsetTop !== undefined) {
      const divPosition =
        inputEl?.current?.offsetTop - inputEl?.current?.scrollHeight;
      if (position * 1.5 > divPosition) {
        setActiveAnimation(true);
        window.removeEventListener("scroll", handleScroll);
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
  }, [handleScroll]);

  return (
    <>
      <S.div>
        <S.titleWrapper ref={inputEl}>
          <S.firstText
            variant="h2"
            animation={activeAnimation ? "animation" : "none"}
          >
            Hard
          </S.firstText>
          <S.secondText
            variant="h2"
            animation={activeAnimation ? "animation" : "none"}
          >
            Skills
          </S.secondText>
        </S.titleWrapper>
        <S.skillsWrapper>
          <S.markRow>
            <S.skill variant="h6">0</S.skill>
            <S.skill variant="h6">1</S.skill>
            <S.skill variant="h6">2</S.skill>
            <S.skill variant="h6">3</S.skill>
            <S.skill variant="h6">4</S.skill>
          </S.markRow>
          <S.row>
            <S.skill variant="h6">Angular</S.skill>
            <S.defaultBox>
              <S.boxAngular
                animation={activeAnimation ? "angular" : "none"}
              ></S.boxAngular>
            </S.defaultBox>
          </S.row>
          <S.row>
            <S.skill variant="h6">React</S.skill>
            <S.defaultBox>
              <S.boxReact
                animation={activeAnimation ? "react" : "none"}
              ></S.boxReact>
            </S.defaultBox>
          </S.row>
          <S.row>
            <S.skill variant="h6">Rails</S.skill>
            <S.defaultBox>
              <S.boxRails
                animation={activeAnimation ? "rails" : "none"}
              ></S.boxRails>
            </S.defaultBox>
          </S.row>
          <S.row>
            <S.skill variant="h6">Java</S.skill>
            <S.defaultBox>
              <S.boxJava
                animation={activeAnimation ? "java" : "none"}
              ></S.boxJava>
            </S.defaultBox>
          </S.row>
          <S.row>
            <S.skill variant="h6">Flutter</S.skill>
            <S.defaultBox>
              <S.boxFlutter
                animation={activeAnimation ? "flutter" : "none"}
              ></S.boxFlutter>
            </S.defaultBox>
          </S.row>
        </S.skillsWrapper>
      </S.div>
    </>
  );
}

export default Skills;
