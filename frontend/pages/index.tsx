import { ThemeProvider, createTheme } from "@mui/material";
import Banner from "../components/Banner";
import Courses from "../components/Courses";
import Experiences from "../components/Experiences";
import Footer from "../components/Footer";
import NavBar from "../components/nav";
import Skills from "../components/Skills";
import { LanguageProvider } from "../context/languageContext";
import Layout from "./layout";
import { UserProvider } from "@/context/userContext";
export default function Home() {
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

   
  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <LanguageProvider>
            <Layout>
                <NavBar />
                <Banner />
                <Experiences />
                <Skills />
                <Courses />
                <Footer />
            </Layout>
        </LanguageProvider>
        </UserProvider>
    </ThemeProvider>
  )
}
