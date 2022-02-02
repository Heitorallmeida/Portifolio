import alura from "../../assets/alura.jpg";
import huawei from "../../assets/huawei.jpg";
import igti from "../../assets/igti.jpg";
import * as S from './styles';
import CourseItem from './courseItem';


function Courses (){


    const courses = [
        {name: "Angular", imagem: alura},
        {name: "Flutter", imagem: alura},
        {name: "MicroServices", imagem: alura},
        {name: "Ux", imagem: alura},
        {name: "Big Data", imagem: huawei},
        {name: "Ciencia de dados", imagem: igti}
    ];

    return(
        <>
            <S.container>
                <S.certificados variant = "h2">
                    Certificados
                </S.certificados>
                <S.coursesContainer>
                    {
                        courses.map((element, index)=>{
                            return (<CourseItem 
                                            key = {index}
                                            nome = {element.name}
                                            imagem={element.imagem}
                                        ></CourseItem>)
                                    
                        })
                    }
                </S.coursesContainer>
            </S.container>
        </>
    );
    

}

export default Courses;
