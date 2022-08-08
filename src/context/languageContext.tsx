import { createContext, useState } from "react";

interface ILanguageProvider {
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
}

export const LanguageContext = createContext<ILanguageProvider>(
  {} as ILanguageProvider
);
export const LanguageProvider: React.FC = ({ children }) => {
  const [language, setLanguage] = useState("pt-BR");

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
