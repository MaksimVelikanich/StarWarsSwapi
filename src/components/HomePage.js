import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [films, setFilms] = useState([]);
  const [selectedFilm, setSelectedFilm] = useState(null);

  useEffect(() => {
    fetch('https://swapi.dev/api/films')
      .then(response => response.json())
      .then(data => setFilms(data.results));
  }, []);

  const handleFilmClick = (film) => {
    setSelectedFilm(film.url);
  };

  return (
    <div className='Fillm'>
      <h1>Star Wars Films</h1>
      <ul>
        {films.map(film => (
          <li key={film.episode_id}>
            Episode {film.episode_id}: {film.title}
            <p>Director: {film.director}</p>
            <p>Release Date: {film.release_date}</p>
            <Link to={{ pathname: `/about-film/${film.episode_id}`, state: { film } }}>View Details</Link>
            <button onClick={() => handleFilmClick(film)}>Select Film</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
