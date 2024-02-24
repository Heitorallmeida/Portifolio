import globalStyles from '../styles/global';
import useUser from "@/hooks/useUser";
import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode
}
const Layout = ({children}: LayoutProps) => {
  const { isLoading, hasError } = useUser();

  const renderPage = () => {
    if(isLoading) return <h4>Carregando...</h4>;
    if(hasError) return <h4>Erro ao carregar página</h4>;
    return children;
  }

  return (
    <div className="page-layout" style={{width: '100%', padding: '0'}}>
      {renderPage()}
      <style jsx global>
        {globalStyles}
      </style>
    </div>
  );
}

export default Layout;

