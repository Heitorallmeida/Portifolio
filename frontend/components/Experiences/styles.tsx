import styled from "styled-components";

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: 600px) {
    flex-wrap: wrap;
  }
`;

export const ExperiencesWrapper = styled.div`
  margin-bottom: 4px;
  box-shadow: 4px 4px 4px #ffe3ec;
  hr {
    margin: 0 2rem 1rem 2rem;
  }
`;
