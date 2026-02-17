import { useState, useCallback, useEffect } from "react";
import useLanguage from "../../../hooks/useLanguage";
import useUser from "../../../hooks/useUser";

export const useAnimatedText = () => {
  const [firstText, setFirstText] = useState<string>("");
  const [secondText, setSecondText] = useState<string>("");
  const [renderTextInterval, setRenderTextInterval] = useState<NodeJS.Timer>();
  const { language } = useLanguage();
  const { user } = useUser();

  const writeText = useCallback((name: string) => {
    let index = 1;
    if (renderTextInterval) {
      clearTimeout(renderTextInterval);
    }

    const text =
      language === "pt-BR"
        ? "Olá, Sou" + name
        : "Hi,  I'm" + name;
    const processaTexto = () => {
      if (index <= 4) {
        setFirstText(text.substring(0, index));
        index = index + 1;
      } else if (index <= text.length) {
        setSecondText(text.substring(5, index));
        index = index + 1;
      }
    };
    const interval = setInterval(processaTexto, 150);
    setRenderTextInterval(interval);
  }, [language, renderTextInterval]);

  useEffect(() => {
    if (user) {
      writeText(` ${user.name} ${user.lastname}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return { firstText, secondText };
};
