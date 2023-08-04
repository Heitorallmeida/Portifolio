"use client";
import { createContext, useState } from "react";

interface ILanguageProvider {
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
}

export const LanguageContext = createContext<ILanguageProvider>(
  {} as ILanguageProvider
);

type LanguageProviderProps = {
  children: JSX.Element;
}
export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState("pt-BR");

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
