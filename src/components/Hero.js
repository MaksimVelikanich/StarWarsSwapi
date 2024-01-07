import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Hero = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [character, setCharacter] = useState(null);
  const [films, setFilms] = useState([]);

  useEffect(() => {
    const fetchCharacter = async () => {
      const data = await axios.get(`https://swapi.dev/api/people/${id}/`);
      setCharacter(data.data);

      const filmData = await Promise.all(data.data.films.map(film => axios.get(film)));
      setFilms(filmData.map(response => response.data));
    };

    fetchCharacter();
  }, [id]);

  const handleFilmClick = (id) => {
    navigate(`/about-film/${id}`);
  };

  if (!character) {
    return <div>Loading...</div>;
  }

  return (
    <div className='box'>
        <div className='character'>
        <h1 id = "heroName">{character.name}</h1>
        <div className="details">
            <p><span className="label">Height:</span> {character.height}</p>
            <p><span className="label">Mass:</span> {character.mass}</p>
            <p><span className="label">Hair color:</span> {character.hair_color}</p>
            <p><span className="label">Skin color:</span> {character.skin_color}</p>
            <p><span className="label">Eyes color:</span> {character.eye_color}</p>
            <p><span className="label">Birth Year:</span> {character.birth_year}</p>
            <p><span className="label">Gender:</span> {character.gender}</p>
        </div>
        <div className="filmInclude">
            <h2 id="labelFilm">Films:</h2>
            {films.map((film, index) => (
                <div className = "AllFilms"key={index} onClick={() => handleFilmClick(film.episode_id)}>
                    <p>{film.title}</p>
                </div>
            ))}
        </div>
        </div>
    </div>
  );
};

export default Hero;
