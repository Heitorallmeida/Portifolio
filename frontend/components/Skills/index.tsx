"use client";
import { useEffect, useRef, useState } from "react";
import * as S from "./styles";
import {  HardSkillObject } from "@/api/hardSkill/experience.type";
import useUser from "@/hooks/useUser";
import { calculateYearsOfExperience } from "@/utils/experienceCalculator";

const skillColors = ["#61dafb", "#d60029", "#31b9f5", "#5382a1", "#982633"];

function Skills() {
  const { user } = useUser();
  const [activeAnimation, setActiveAnimation] = useState(false);
  const [hardSkills, setHardSkills] = useState<HardSkillObject | undefined>(undefined);
  const [yearsOfExperience, setYearsOfExperience] = useState<number>(0);

  const inputEl = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = inputEl.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveAnimation(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  
  useEffect(() => {
    if(user){
      setHardSkills(user.hardSkills)
      if(user.experiences){
        const years = calculateYearsOfExperience(user.experiences);
        setYearsOfExperience(years);
      }
    }
     
  }, [user]);

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
          {hardSkills && Object.entries(hardSkills).map(([skillName, percentage], index) => {
            const normalizedPercentage = Math.min(100, Math.max(0, Number(percentage) || 0));
            
            return (
              <S.row key={skillName}>
                <S.skill variant="h6">{skillName}</S.skill>
                <S.defaultBox>
                  <S.progressBar
                    $active={activeAnimation}
                    $color={skillColors[index % skillColors.length]}
                    percentage={normalizedPercentage}
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
