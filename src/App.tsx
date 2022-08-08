import "./App.css";
import Banner from "./components/Banner/banner";
import Courses from "./components/Courses/courses";
import Experiences from "./components/Experiences/experiences";
import Footer from "./components/Footer/Footer";
import NavBar from "./components/nav";
import Skills from "./components/Skills/Skills";
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
