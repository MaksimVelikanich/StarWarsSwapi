import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './css/style.css';
import Header from './components/Header';
import Films from './components/Films';
import AboutFilm from './components/AboutFilm';
import Hero from './components/Hero'; 

class App extends React.Component {
  render() {
    return (
      <Router>
        <Header />
        <Routes>
          <Route path="/films" element={<Films />}  />
          <Route path="/about-film" element={<AboutFilm />} />
          <Route path="/character/:id" element={<Hero />} /> 
          <Route path="/about-film/:id" element={<AboutFilm />} />
        </Routes>
      </Router>
    );
  }
}

export default App;