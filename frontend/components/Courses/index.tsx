import * as S from "./styles";
import CourseItem from "./components/CourseItem";
import useLanguage from "../../hooks/useLanguage";

function Courses() {
  const { language } = useLanguage();

  const courses = [
    { name: "Angular", imagem: "/static/images//alura.jpg" },
    { name: "Big Data", imagem: "/static/images//huawei.jpg" },
    { name: "Flutter", imagem: "/static/images//alura.jpg" },
    { name: "MicroServices", imagem: "/static/images//alura.jpg" },
    { name: "Ciencia de dados", imagem:  "/static/images//igti.jpg" },
    { name: "Ux", imagem: "/static/images//alura.jpg" },
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
