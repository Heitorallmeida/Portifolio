import * as S from './styles';

function Skills (){
    return(
        <>
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
                        <S.skill variant = "h6">
                            Angular
                        </S.skill>
                        <S.defaultBox>
                            <S.boxAngular>
                            </S.boxAngular> 
                        </S.defaultBox>
                    </S.row>
                    <S.row>
                        <S.skill variant = "h6">
                            React
                        </S.skill>
                        <S.defaultBox>
                            <S.boxReact>
                            </S.boxReact>    
                        </S.defaultBox>
                    </S.row>
                    <S.row>
                        <S.skill variant = "h6">
                            Rails
                        </S.skill>
                        <S.defaultBox>   
                            <S.boxRails>
                            </S.boxRails> 
                        </S.defaultBox>
                    </S.row>
                    <S.row>
                        <S.skill variant = "h6">
                            Java
                        </S.skill>
                        <S.defaultBox>   
                            <S.boxJava>
                            </S.boxJava> 
                        </S.defaultBox>
                    </S.row>
                    <S.row>
                        <S.skill variant = "h6">
                            Flutter
                        </S.skill>
                        <S.defaultBox>   
                            <S.boxFlutter>
                            </S.boxFlutter> 
                        </S.defaultBox>
                    </S.row>
                </S.labelColumn>
            </S.div>
        </>
    );

}

export default Skills;