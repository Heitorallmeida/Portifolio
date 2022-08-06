import styled from "styled-components";

export const row = styled.div`
  display: "flex";
  flex-direction: "row";
  flex-wrap: wrap;
  @media (max-width: 600px) {
    flex-direction: "column";
  }
`;

export const experiencesWrapper = styled.div`
  background: "linear-gradient(to right, #ece9e6, #fff)";
`;
