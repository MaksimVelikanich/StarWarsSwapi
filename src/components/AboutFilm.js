import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import star from '../img/star.jpeg';

const API_URL = 'https://swapi.dev/api/films/';

const AboutFilm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const filmFromLocation = location.state ? location.state.film : null;
  const episode_id = filmFromLocation ? filmFromLocation.url : null;
  const filmIdFromUrl = episode_id ? episode_id.split('/').slice(-2, -1)[0] : null;
  const { id } = useParams();

  const [film, setFilm] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [starships, setStarships] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [species, setSpecies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}${id || filmIdFromUrl}/`);
        const filmData = response.data;
        setFilm(filmData);
        const charactersData = await Promise.all(filmData.characters.map(url => axios.get(url).then(res => res.data)));
        setCharacters(charactersData);
        const planetsData = await Promise.all(filmData.planets.map(url => axios.get(url).then(res => res.data)));
        setPlanets(planetsData);
        const starshipsData = await Promise.all(filmData.starships.map(url => axios.get(url).then(res => res.data)));
        setStarships(starshipsData);
        const vehiclesData = await Promise.all(filmData.vehicles.map(url => axios.get(url).then(res => res.data)));
        setVehicles(vehiclesData);
        const speciesData = await Promise.all(filmData.species.map(url => axios.get(url).then(res => res.data)));
        setSpecies(speciesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id, filmIdFromUrl]);

  const navigateToCharacter = (url) => {
    const match = url.match(/\/people\/(\d+)/);
    if (match) {
      const id = match[1];
      navigate(`/character/${id}`);
    }
  };

  if (!film) {
    return <p>Loading</p>;
  }

  return (
    <div className='block'>
      <img src={star} alt='star' className='backStar' />
      <div className='filmInfo'>
        <p id="mainTitle"><span id = 'tekst'>{film.title}</span></p>
        <p id="mainDirector"><span id = 'tekst'>Director:</span> {film.director}</p>
        <p id="mainReleaseDate"><span id = 'tekst'>Release Date:</span> {film.release_date}</p>
        <p id="mainProducer"><span id = 'tekst'>Producer:</span> {film.producer}</p>
        <p id="mainOpening"><span id = 'tekst'>Opening:</span> {film.opening_crawl}</p>

        <div className='detailsInfo'>
          <div className='planets'>
            <p id="details" >Planets:</p>
            {planets.map((planet, filmIndex) => (
              <p key={filmIndex}>{planet.name}</p>
            ))}
          </div>

          <div className="starships">
            <p id="details">Starships:</p>
            {starships.map((starship, filmIndex) => (
              <p key={filmIndex}>{starship.name}</p>
            ))}
          </div>

          <div className="vehicles">
            <p id="details">Vehicles:</p>
            {vehicles.map((vehicle, filmIndex) => (
              <p key={filmIndex}>{vehicle.name}</p>
            ))}
          </div>

          <div className="species">
            <p id="details">Species:</p>
            {species.map((specie, filmIndex) => (
              <p key={filmIndex}>{specie.name}</p>
            ))}
          </div>

          <div className="hero">
            <p id="details">Characters:</p>
            {characters.map((character, filmIndex) => (
              <p id="focus" key={filmIndex} onClick={() => navigateToCharacter(character.url)}>{character.name}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutFilm;
