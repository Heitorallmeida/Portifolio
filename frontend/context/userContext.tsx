"use client";
import { useParams } from "next/navigation";
import { createContext, useCallback, useEffect, useState } from "react";
import { useRouter } from 'next/router'

interface IUserProvider {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
}

export const UserContext = createContext<IUserProvider>(
  {} as IUserProvider
);

type UserProviderProps = {
  children: JSX.Element;
}
export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState();
  const router = useRouter()
  const { id } = router.query

  const getData = useCallback(async () => {
    const res = await fetch(`http://localhost:3001/portifolio/${id ? id : 1}`)
    
    
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
    
    const user = await res.json();
    const hardSkills: any[] = user.hardSkills;

    const resultado = hardSkills.reduce((acc, objeto) => {
      const { title, percentage } = objeto;
      if (acc[title]) {
        acc[title] += percentage;
      } else {
        acc[title] = percentage;
      }
      return acc;
    }, {} as { [title: string]: number });


    setUser({...user, hardSkills: resultado});
  },[id])

  useEffect(()=>{
    void getData();
  }, [getData])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
