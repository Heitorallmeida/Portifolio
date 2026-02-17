"use client";
import { useParams } from "next/navigation";
import { createContext, useCallback, useEffect, useState } from "react";
import { useRouter } from 'next/router'
import { User } from "@/api/user/user.types";

interface IUserProvider {
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  isLoading: boolean;
  hasError: boolean;
}

export const UserContext = createContext<IUserProvider>(
  {} as IUserProvider
);

type UserProviderProps = {
  children: JSX.Element;
}
export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const router = useRouter()
  const { id } = router.query

  const getData = useCallback(async () => {
    fetch(`http://localhost:3001/portifolio/${id ? id : 1}`).then(async (res)=>{
      const user = await res.json();
      const hardSkills: any[] = user.hardSkills;
  
      const skillMonths = hardSkills.reduce((acc, skill) => {
        const { title, initialDate, finishDate, current } = skill;
        const start = new Date(initialDate);
        const end = current ? new Date() : new Date(finishDate);
        const months = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 30.44);
        
        if (!acc[title]) {
          acc[title] = 0;
        }
        acc[title] += months;
        return acc;
      }, {} as { [title: string]: number });
  
      const maxMonths = Math.max(...Object.values(skillMonths) as number[]);
  
      const resultado = Object.keys(skillMonths).reduce((acc, title) => {
        acc[title] = Math.round((skillMonths[title] / maxMonths) * 100);
        return acc;
      }, {} as { [title: string]: number });
      
      setUser({...user, hardSkills: resultado});
    }).catch(()=>{setHasError(true)}).finally(()=>setIsLoading(false))
    
   
    
   
  },[id])

  useEffect(()=>{
    void getData();
  }, [getData])

  return (
    <UserContext.Provider value={{ user, setUser, isLoading, hasError }}>
      {children}
    </UserContext.Provider>
  );
};
