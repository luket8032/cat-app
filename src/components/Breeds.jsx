import React, { useEffect, useMemo, useState }  from 'react'
import '../assets/css/breeds.css'
import BeatLoader from "react-spinners/BeatLoader";

const Breeds = () => {
  const [isLoading, setLoading] = useState(false);
  const [breedlist, setBreedList] = useState([]);
  const [results, setResults] = useState([]);
  const [breed, setBreed] = useState('');

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch('https://api.thecatapi.com/v1/breeds').then(res => res.json()),
      fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breed}`).then(res => res.json())
    ])
    .then(data => {
      setBreedList(data[0]);
      setResults(data[1]);
      console.log(data[0]);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setLoading(false);
    })
  }, [breed])

  if (isLoading) {
    return (
      <>
      <div className='findacat-loader'>
      <BeatLoader color='grey'/>
      </div>
      </>
    )
  }

   
  return (
    <div id='breed-content'>
      <label htmlFor="breedlist">Select a breed:</label>
      <select name="breedlist"
      id="breedlist"
      onChange={(e) => {
        const selectedBreed = e.target.value;
        setBreed(selectedBreed);
      }}
      defaultValue={breed}
      >
        {breedlist.map(result => (
          <option key={result.id} value={result.id}>{result.name}</option>
        ))}
      </select>

      
      {results.map(result => (
        <img className='breed-img' src={result.url} alt="random breed pic" />
      ))}
    </div>
  )
}

export default Breeds