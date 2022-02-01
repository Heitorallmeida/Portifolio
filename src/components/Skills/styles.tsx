import { Typography } from '@material-ui/core';
import styled from 'styled-components';

const color = 'blue';

export const boxAngular = styled.div`
    background-color: ${color};
    width: 60%;
    height: inherit;
    border-radius: 5px;
`;
export const boxFlutter = styled.div`
    background-color: lightblue;
    width: 30%;
    height: inherit;
    border-radius: 5px;
`;

export const boxJava = styled.div`
    background-color: yellow;
    width: 60%;
    height: inherit;
    border-radius: 5px;
`;

export const boxRails = styled.div`
    background-color: mediumorchid;
    width: 37%;
    height: inherit;
    border-radius: 5px;
`;

export const boxReact = styled.div`
    background-color: red;
    width: 90%;
    height: inherit;
    border-radius: 5px;
`;

export const column = styled.div`
    display: flex;
    flex-direction: column;
    
`;

export const divider = styled.hr`
    color: white
`;

export const div = styled.div`
    padding-left: 4rem;
    padding-right: 4rem;
    display: flex;
    flex-direction: row;
    background: linear-gradient(to left, #1d2b64, #f8cdda);
    box-shadow: 4px 4px 4px #ffe3ec;
`;
export const defaultBox = styled.div`
    height: 1rem;
    width: 40vw;
    background-color: lightgray;
    border-radius: 5px;
    margin-left: 1rem;  
`;

export const firstText = styled(Typography)`
    margin: 3rem;
    font-weight: bold;

`;
export const labelColumn = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 4rem;
    margin-left: 4rem;  
`;

export const row = styled.div`
    display: flex;
    flex-direction: row;
    margin: 0.5rem;
`;

export const secondText = styled(Typography)`
    margin: 1rem 2rem 2rem 4rem;
    font-weight: bold;
    color: #F71735;
`;

export const skill = styled(Typography)`
    font-weight: bold;
    width: 7vw;
    color:#131a3c;
`;

export const smallDivider = styled.hr`
    width: 80%;
`;


