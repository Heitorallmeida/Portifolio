import * as S from "./styles";
import CourseItem from "./components/CourseItem";
import useLanguage from "../../hooks/useLanguage";
import { useEffect, useState } from "react";
import useUser from "@/hooks/useUser";

function Courses() {
  const [certificates, setCertificates] = useState([]);
  const { user } = useUser();
  const { language } = useLanguage();


  
  useEffect(() => {
    if(user){
      setCertificates(user.certificates)
    }
     
  }, [user]);

  return (
    <>
      <S.container>
        <S.certificados variant="h2">
          {language === "pt-BR" ? "Certificados" : "Certificates"}
        </S.certificados>
        <S.coursesContainer>
          {certificates.map((element: any, index) => 
             (
              <CourseItem
                key={index}
                name={element.name}
                image={element.imagem}
              />
            )
        )}
        </S.coursesContainer>
      </S.container>
    </>
  );
}

export default Courses;
