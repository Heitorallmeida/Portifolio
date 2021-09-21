import { Typography } from '@material-ui/core';
import * as S from './styles';

function Skills (){
    return(
        <>
            <S.divider />
            <S.div>
                <S.column>
                    <S.firstText variant = "h2">
                        Hard
                    </S.firstText>
                    <S.secondText variant = "h2">
                        Skills
                    </S.secondText>
                </S.column>
                <S.labelColumn>
                    <S.row>
                        <S.skill variant = "h7">
                            Angular
                        </S.skill>
                        <S.defaultBox>
                            <S.boxAngular>
                            </S.boxAngular> 
                        </S.defaultBox>
                    </S.row>
                    <S.row>
                        <S.skill variant = "h7">
                            React
                        </S.skill>
                        <S.defaultBox>
                            <S.boxReact>
                            </S.boxReact>    
                        </S.defaultBox>
                    </S.row>
                    <S.row>
                        <S.skill variant = "h7">
                            Rails
                        </S.skill>
                        <S.defaultBox>   
                        </S.defaultBox>
                    </S.row>
                    <S.row>
                        <S.skill variant = "h7">
                            Java
                        </S.skill>
                        <S.defaultBox>   
                        </S.defaultBox>
                    </S.row>
                    <S.row>
                        <S.skill variant = "h7">
                            Flutter
                        </S.skill>
                        <S.defaultBox>   
                        </S.defaultBox>
                    </S.row>
                </S.labelColumn>
            </S.div>
            <S.smallDivider />
            <S.divider />
        </>
    );

}

export default Skills;