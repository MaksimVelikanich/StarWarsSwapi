import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import space from '../img/space.jpeg';

const swapiUrl = 'https://swapi.dev/api/films';

function Films() {
  const [films, setFilms] = useState([]);  

  useEffect(() => {
    axios.get(swapiUrl)
      .then((res) => {
        setFilms(res.data.results);
      })
      .catch((error) => {
        console.error('Error', error);
      });
  }, []);
  const navigate = useNavigate();

  const navigateToAboutFilm = (film, index) => {
    navigate('/about-film', { state: { film, filmIndex: index } });
  };


  return (
    <div className="container">
    
      <img src={space} alt='space' className='backSpace' />
      <div className="content">
        <div className='filmsInfo'>
          {films.map((film, index) => (
            <div key={index} className="filmsAbout" onClick={() => navigateToAboutFilm(film)}>
              <p id="title">{film.title}</p>
              <p id="director"> {film.director}</p>
              <p id="release"> {film.release_date}</p>
              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Films;