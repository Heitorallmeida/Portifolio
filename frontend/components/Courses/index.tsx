import * as S from "./styles";
import CourseItem from "./components/CourseItem";
import useLanguage from "../../hooks/useLanguage";
import { useEffect, useState } from "react";
import useUser from "@/hooks/useUser";
import { Certificate } from "@/api/user/user.types";

function Courses() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
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
          {certificates.map((element: Certificate, index) => 
             (
              <CourseItem
                key={index}
                name={element.title}
                image={element.image}
              />
            )
        )}
        </S.coursesContainer>
      </S.container>
    </>
  );
}

export default Courses;
