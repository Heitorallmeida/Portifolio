"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import * as S from "./styles";
import { HardSkill, HardSkillObject } from "@/api/hardSkill/experience.type";

function Skills() {
  const [activeAnimation, setActiveAnimation] = useState(false);
  const [hardSkills, setHardSkills] = useState();

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

  async function getData() {
    const res = await fetch('http://localhost:3001/hardSkill/1')
    
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
    console.log(res)
    return res.json()
  }
  useEffect(() => {
    getData().then((res)=>{
      setHardSkills(res);
    });
  }, []);

  return (
    <>
      <S.div>
        <S.titleWrapper ref={inputEl}>
          <S.firstText
            variant="h2"
          >
            Hard
          </S.firstText>
          <S.secondText
            variant="h2"
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
                percentage={hardSkills ? hardSkills['Angular'] : 0}
              ></S.boxAngular>
            </S.defaultBox>
          </S.row>
          <S.row>
            <S.skill variant="h6">React</S.skill>
            <S.defaultBox>
              <S.boxReact
                animation={activeAnimation ? "react" : "none"}
                percentage={hardSkills ? hardSkills['React'] : 0}
              ></S.boxReact>
            </S.defaultBox>
          </S.row>
          <S.row>
            <S.skill variant="h6">Rails</S.skill>
            <S.defaultBox>
              <S.boxRails
                animation={activeAnimation ? "rails" : "none"}
                percentage={hardSkills ? hardSkills['Rails'] : 0}
              ></S.boxRails>
            </S.defaultBox>
          </S.row>
          <S.row>
            <S.skill variant="h6">Java</S.skill>
            <S.defaultBox>
              <S.boxJava
                animation={activeAnimation ? "java" : "none"}
                percentage={hardSkills ? hardSkills['Spring Boot'] : 0}
              ></S.boxJava>
            </S.defaultBox>
          </S.row>
          <S.row>
            <S.skill variant="h6">Flutter</S.skill>
            <S.defaultBox>
              <S.boxFlutter
                animation={activeAnimation ? "flutter" : "none"}
                percentage={hardSkills ? hardSkills['Flutter'] : 0}
              ></S.boxFlutter>
            </S.defaultBox>
          </S.row>
        </S.skillsWrapper>
      </S.div>
    </>
  );
}

export default Skills;
