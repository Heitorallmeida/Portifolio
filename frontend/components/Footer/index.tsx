import { Typography } from "@mui/material";
import useLanguage from "../../hooks/useLanguage";
import * as S from "./styles";

export default function Footer() {
  const { language } = useLanguage();
  return (
    <>
      <S.div>
        <Typography
          variant="overline"
          style={{ color: "white", cursor: "pointer" }}
          onClick={() =>
            window.open("https://github.com/Heitorallmeida/Portifolio")
          }
        >
          {language === "pt-BR"
            ? "Clique aqui para ver o código fonte!"
            : "Click here to see the source code"}
        </Typography>
      </S.div>
    </>
  );
}
