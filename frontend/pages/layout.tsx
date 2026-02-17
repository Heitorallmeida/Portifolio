import globalStyles from '../styles/global';
import useUser from "@/hooks/useUser";
import React, { ReactNode } from 'react';
import { ThemeProvider, createTheme } from "@mui/material";

interface LayoutProps {
  children: ReactNode
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#FFFFFF',
    },
  },
});

const Layout = ({children}: LayoutProps) => {
  const { isLoading, hasError } = useUser();

  const renderPage = () => {
    if(isLoading) return <h4>Carregando...</h4>;
    if(hasError) return <h4>Erro ao carregar página</h4>;
    return children;
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="page-layout" style={{width: '100%', padding: '0'}}>
        {renderPage()}
        <style jsx global>
          {globalStyles}
        </style>
      </div>
    </ThemeProvider>
  );
}

export default Layout;

