"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import * as S from "./styles";
import {  HardSkillObject } from "@/api/hardSkill/experience.type";
import useUser from "@/hooks/useUser";
import { calculateYearsOfExperience } from "@/utils/experienceCalculator";

function Skills() {
  const { user } = useUser();
  const [activeAnimation, setActiveAnimation] = useState(false);
  const [hardSkills, setHardSkills] = useState<HardSkillObject | undefined>(undefined);
  const [yearsOfExperience, setYearsOfExperience] = useState<number>(0);

  console.log(user)




  const inputEl = useRef<HTMLDivElement | null>(null);

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

  

  
  useEffect(() => {
    if(user){
      setHardSkills(user.hardSkills)
      if(user.experiences){
        const years = calculateYearsOfExperience(user.experiences);
        console.info(years)
        setYearsOfExperience(years);
      }
    }
     
  }, [user]);

  console.info(yearsOfExperience)

  return (
    <>
      <S.div>
        <S.titleWrapper ref={inputEl}>
          <S.firstText
            variant="h2"
            animation={"none"}
            percentage={0}
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
            {Array.from({ length: yearsOfExperience }, (_, i) => (
              <S.skill key={i} variant="h6">{i + 1}</S.skill>
            ))}
          </S.markRow>
          {hardSkills && Object.entries(hardSkills).map(([skillName, percentage]) => {
            const skillKey = skillName.toLowerCase();
            const BoxComponent = (S as any)[`box${skillName}`] || S.boxAngular;
            
            return (
              <S.row key={skillName}>
                <S.skill variant="h6">{skillName}</S.skill>
                <S.defaultBox>
                  <BoxComponent
                    animation={activeAnimation ? skillKey : "none"}
                    percentage={percentage}
                  />
                </S.defaultBox>
              </S.row>
            );
          })}
        </S.skillsWrapper>
      </S.div>
    </>
  );
}

export default Skills;
