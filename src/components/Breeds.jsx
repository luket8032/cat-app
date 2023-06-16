import React, { useMemo, useState }  from 'react'
import '../assets/css/breeds.css'
import BeatLoader from "react-spinners/BeatLoader";
import Stats from './Stats';

function Breeds() {
  const api_key = process.env.REACT_APP_API_KEY; /* Key for API use */
  const [isLoading, setLoading] = useState(true);
  const [results, setResults] = useState(null);
  const [breedlist, setBreedList] = useState([]);
  const [breed, setBreed] = useState('abys');
  const [breedImg, setBreedImg] = useState([]);

  useMemo(() => {
    setLoading(true);
    /* Fetch for breed list, image, and information */
    Promise.all([
      fetch('https://api.thecatapi.com/v1/breeds', { headers: { 'x-api-key': api_key } }).then(res => res.json()),
      fetch(`https://api.thecatapi.com/v1/breeds/${breed}`, { headers: { 'x-api-key': api_key } }).then(res => res.json()),
      fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breed}`).then(res => res.json())
    ])
      .then(data => {
        setBreedList(data[0]);
        setResults(data[1]);
        setBreedImg(data[2]);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [breed]);

  if (isLoading) {
    return (
      <>
        <div className='loader'>
          <BeatLoader color='grey' />
        </div>
      </>
    );
  }

  return (
    <div id='container'>
      <div className='filter'>
        {/* SELECT component to allow users to choose breed to display */}
        <div className='breed-select'>
          <label htmlFor="breedlist" style={{ textAlign: 'center' }}>Select a breed:</label>
          <select
            name="breedlist"
            id="breedlist"
            onChange={(e) => {
              const selectedBreed = e.target.value;
              setBreed(selectedBreed);
            } }
            defaultValue={breed}
            style={{ width: '100%' }}
          >
            {breedlist.map(result => (
              <option key={result.id} value={result.id}>{result.name}</option>
            ))}
          </select>
        </div>
      </div>
      <h1 className='breed-name'>{results["name"]}</h1>
      <img className='breed-img' src={breedImg[0]["url"]} alt='breed pic' />
      {/* Content for selected breed */}
      <div className='breed-content'>
        <div className='breed-text'>
          <p><b>Description: </b>{results["description"]}</p>
          <p><b>Personality: </b>{results["temperament"]}</p>
        </div>
      </div>
      <div className='stats-container'>
        <h1 className='stats-name'>{results["name"]} Stats</h1>
        {/* Displays stars based on stat value of selected breed */}
        <div className='breed-stats'>
          <div className='stat'><b>Adaptability:</b><Stats rating={parseInt(results["adaptability"])} /></div>
          <div className='stat'><b>Affection Level:</b><Stats rating={parseInt(results["affection_level"])} /></div>
          <div className='stat'><b>Child Friendly:</b><Stats rating={parseInt(results["child_friendly"])} /></div>
          <div className='stat'><b>Dog Friendly:</b><Stats rating={parseInt(results["dog_friendly"])} /></div>
          <div className='stat'><b>Energy Level:</b><Stats rating={parseInt(results["energy_level"])} /></div>
          <div className='stat'><b>Grooming:</b><Stats rating={parseInt(results["grooming"])} /></div>
          <div className='stat'><b>Health Issues:</b><Stats rating={parseInt(results["health_issues"])} /></div>
          <div className='stat'><b>Intelligence:</b><Stats rating={parseInt(results["intelligence"])} /></div>
          <div className='stat'><b>Shedding Level:</b><Stats rating={parseInt(results["shedding_level"])} /></div>
          <div className='stat'><b>Social Needs:</b><Stats rating={parseInt(results["social_needs"])} /></div>
          <div className='stat'><b>Stranger Friendly:</b><Stats rating={parseInt(results["stranger_friendly"])} /></div>
          <div className='stat'><b>Vocalisation:</b><Stats rating={parseInt(results["vocalisation"])} /></div>
        </div>
      </div>
      
      {/* Links for additional information of selected breed */}
      <div className='links-container'>
        <h1 className='stats-name'>Other Links:</h1>
        <div className='links'>
          <a href={(results["cfa_url"])}>CFA</a>
          <a href={(results["vetstreet_url"])}>Vet Street</a>
          <a href={(results["vcahospitals_url"])}>VCA</a>
          <a href={(results["wikipedia_url"])}>Wikipedia</a>
        </div>
      </div>
    </div>
  );
}

export default Breeds