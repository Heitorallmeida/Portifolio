import { Typography } from '@material-ui/core';
import * as S from './styles' ;

export default function Footer(){
    
    return(
        <>
            <S.div>
                <Typography 
                    variant="overline" 
                    style={{color: 'white', cursor: 'pointer'}} 
                    onClick = {()=> window.open("https://github.com/Heitorallmeida/Portifolio")}
                >
                    Clique aqui para ver o código fonte!
                </Typography>
            </S.div>
        </>
    );
};