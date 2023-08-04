import { Typography } from "@mui/material";
import styled from "styled-components";
// animation-name: ${(props) => props.animation};

type StyledDivProps = {
  animation: string;
  percentage: number;
}

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
  align-self: center;
  width: 100vw;
`;

export const divider = styled.hr`
  color: white;
`;

export const div = styled.div`
  padding-left: 4rem;
  padding-right: 4rem;
  display: flex;
  flex-direction: row;
  @media (max-width: 890px) {
    flex-direction: column;
    padding-left: 0rem;
    padding-right: 0rem;
    padding-bottom: 3rem;
  }
  background: linear-gradient(to right, #1d4350, #a43931);
  box-shadow: 4px 4px 4px #ffe3ec;
`;
export const defaultBox = styled.div`
  height: 1rem;
  width: 40vw;
  background-color: #fdfdfd;
  border-radius: 5px;
  margin-left: 1rem;
  align-self: center;
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
  font-weight: bold;
  color: white;
`;

export const markRow = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0.5rem;
  margin-left: 3vw;
  width: 45vw;
  justify-content: space-between;
  text-align: end;
  @media (max-width: 800px) {
    margin-left: 37vw;
  }
`;

export const titleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 4rem;
  margin-left: 4rem;
  @media (max-width: 500px) {
    margin-top: 2rem;
    margin-left: 2rem;
  }
`;

export const row = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0.5rem;
  @media (max-width: 800px) {
    justify-content: space-evenly;
  }
`;

export const secondText = styled(Typography)`
  margin: 1rem 2rem 2rem 4rem;
  font-weight: bold;
  color: #f40021;
  @media (max-width: 600px) {
    margin-top: 0rem;
  }
`;

export const skill = styled(Typography)`
  font-weight: bold;
  width: 7vw;
  color: white;
`;

export const smallDivider = styled.hr`
  width: 80%;
`;
