
import React, { useState } from 'react';
import './App.css';
import Banner from './components/Banner/banner';
import Courses from './components/Courses/courses';
import Experiences from './components/Experiences/experiences';
import  NavBar from './components/nav';
import Skills from './components/Skills/Skills';



function App() {

  return (
    <>
      <NavBar></NavBar>
      <Banner></Banner>
      <Experiences></Experiences>
      <Skills></Skills>
      <Courses></Courses>
    </> 
  );
}

export default App;
