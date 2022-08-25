import alura from "../../assets/alura.jpg";
import huawei from "../../assets/huawei.jpg";
import igti from "../../assets/igti.jpg";
import * as S from "./styles";
import CourseItem from "./components/CourseItem";
import useLanguage from "../../hooks/useLanguage";

function Courses() {
  const { language } = useLanguage();

  const courses = [
    { name: "Angular", imagem: alura },
    { name: "Big Data", imagem: huawei },
    { name: "Flutter", imagem: alura },
    { name: "MicroServices", imagem: alura },
    { name: "Ciencia de dados", imagem: igti },
    { name: "Ux", imagem: alura },
  ];

  return (
    <>
      <S.container>
        <S.certificados variant="h2">
          {language === "pt-BR" ? "Certificados" : "Certificates"}
        </S.certificados>
        <S.coursesContainer>
          {courses.map((element, index) => {
            return (
              <CourseItem
                key={index}
                name={element.name}
                image={element.imagem}
              ></CourseItem>
            );
          })}
        </S.coursesContainer>
      </S.container>
    </>
  );
}

export default Courses;
