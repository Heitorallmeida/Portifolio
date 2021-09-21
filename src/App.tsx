import { Typography } from '@material-ui/core';
import './App.css';
import Banner from './components/banner';
import Experiences from './components/experiences';
import  NavBar from './components/nav';
import Skills from './components/Skills/Skills';

function App() {

  return (
    <>
      <NavBar></NavBar>
      <Banner></Banner>
      <Typography variant="h3" component="h2" style={{'fontWeight': 'bold', 'textAlign':'center', 'marginTop': '1rem'}}>Experiências</Typography>
      <Typography variant="h4" component="h2" style={{'fontWeight': 'bold', 'textAlign':'center', 'marginTop': '1rem'}}>Iniciou Engenharia de Computação</Typography>
      <Experiences></Experiences>
      <Skills></Skills>
    </>
  );
}

export default App;
