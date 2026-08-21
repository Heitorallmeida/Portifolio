import { Typography } from "@mui/material";
import styled from "styled-components";
// animation-name: ${(props) => props.animation};

type StyledDivProps = {
  animation: string;
  percentage: number;
}

type ProgressBarProps = {
  $active: boolean;
  $color: string;
  percentage: number;
};

export const progressBar = styled.div<ProgressBarProps>`
  width: ${({ $active, percentage }) => ($active ? `${percentage}%` : "0%")};
  height: 100%;
  border-radius: inherit;
  background-color: ${({ $color }) => $color};
  transition: width 1s ease-out;
`;

export const boxAngular = styled.div<StyledDivProps>`
  @keyframes angular {
    from {
      width: 0%;
    }
    to {
      width: ${(props) => props.percentage}%;
    }
  }
  
  animation-name: ${(props) => props.animation};
  animation-fill-mode: forwards;
  animation-duration: 1s;
  width: 0%;
  background-color: #d60029;
  height: inherit;
  border-radius: 5px;
`;
export const boxFlutter = styled.div<StyledDivProps>`
  @keyframes flutter {
    from {
      width: 0%;
    }
    to {
      width: ${(props) => props.percentage}%;
    }
  }
  
  animation-name: ${(props) => props.animation};
  animation-fill-mode: forwards;
  animation-duration: 1s;
  width: 0%;
  background-color: #31b9f5;
  height: inherit;
  border-radius: 5px;
`;

export const boxJava = styled.div<StyledDivProps>`
  @keyframes java {
    from {
      width: 0%;
    }
    to {
      width: ${(props) => props.percentage}%;
    }
  }
  
  animation-name: ${(props) => props.animation};
  animation-fill-mode: forwards;
  animation-duration: 1s;
  width: 0%;
  background-color: #5382a1;
  height: inherit;
  border-radius: 5px;
`;

export const boxRails = styled.div<StyledDivProps>`
  @keyframes rails {
    from {
      width: 0%;
    }
    to {
      width: ${(props) => props.percentage}%;
    }
  }
  
  animation-name: ${(props) => props.animation};
  animation-fill-mode: forwards;
  animation-duration: 1s;
  width: 0%;
  background-color: #982633;
  height: inherit;
  border-radius: 5px;
`;

export const boxReact = styled.div<StyledDivProps>`
  @keyframes react {
    from {
      width: 0%;
    }
    to {
      width: ${(props) => props.percentage}%;
    }
  }
  
  animation-name: ${(props) => props.animation};
  animation-fill-mode: forwards;
  animation-duration: 1s;
  width: 0%;
  background-color: #61dafb;
  height: inherit;
  border-radius: 5px;
`;

export const skillsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: min(760px, 100%);
  padding: 4.5rem 0;
`;

export const divider = styled.hr`
  color: white;
`;

export const div = styled.div`
  padding: 2rem max(1.5rem, calc((100vw - 1180px) / 2));
  display: flex;
  align-items: center;
  gap: clamp(2rem, 7vw, 7rem);
  background: linear-gradient(135deg, #0f3040 0%, #182335 48%, #542d3f 100%);
  box-shadow: none;
  @media (max-width: 890px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0;
    padding-bottom: 1rem;
  }
`;
export const defaultBox = styled.div`
  height: 0.72rem;
  flex: 1;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.16);
  border-radius: 999px;
`;

export const firstText = styled(Typography)<StyledDivProps>`
  @keyframes animation {
    from {
      margin: 0rem;
    }
    to {
      margin: 3rem;
    }
  }
  
  animation-name: ${(props) => props.animation};
  animation-fill-mode: forwards;
  animation-duration: 1s;
  font-weight: 700;
  color: white;
  font-size: clamp(2.4rem, 4vw, 4rem) !important;
  line-height: 1 !important;
`;

export const markRow = styled.div`
  display: none;
`;

export const titleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 190px;
  @media (max-width: 500px) {
    min-width: 0;
  }
`;

export const row = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
  margin: 0.75rem 0;
  @media (max-width: 800px) {
    gap: 0.85rem;
  }
`;

export const secondText = styled(Typography)`
  margin: 0.5rem 0 0;
  font-weight: 700;
  color: #67e8f9;
  font-size: clamp(2.4rem, 4vw, 4rem) !important;
  line-height: 1 !important;
  @media (max-width: 600px) {
    margin-top: 0rem;
  }
`;

export const skill = styled(Typography)`
  width: 130px;
  color: #e2e8f0;
  font-weight: 600;
  @media (max-width: 500px) { width: 94px; font-size: 0.9rem !important; }
`;

export const smallDivider = styled.hr`
  width: 80%;
`;
