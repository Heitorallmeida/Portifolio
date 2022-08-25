import "./App.css";
import Banner from "./components/Banner";
import Courses from "./components/Courses";
import Experiences from "./components/Experiences";
import Footer from "./components/Footer";
import NavBar from "./components/nav";
import Skills from "./components/Skills";
import { LanguageProvider } from "./context/languageContext";

function App() {
  return (
    <>
      <LanguageProvider>
        <NavBar />
        <Banner />
        <Experiences />
        <Skills />
        <Courses />
        <Footer />
      </LanguageProvider>
    </>
  );
}

export default App;
