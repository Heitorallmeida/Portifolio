import globalStyles from '../styles/global';
import useUser from "@/hooks/useUser";
import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode
}
const Layout = ({children}: LayoutProps) => {
  const { isLoading } = useUser();
  return (
    <div className="page-layout">
      {isLoading ? <React.Fragment><h2>Carregando</h2></React.Fragment> : <React.Fragment>{children}</React.Fragment> }
      <style jsx global>
        {globalStyles}
      </style>
    </div>
  );
}

export default Layout;

