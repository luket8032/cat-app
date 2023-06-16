import React, { useMemo, useState }  from 'react'
import BeatLoader from "react-spinners/BeatLoader";
import '../assets/css/home.css'

const Home = () => {
  const api_key = 'live_VCzktalCGYDHVGnpidpr17uDiRrkOePItc8ABgKWRzqm5jxR0QjpuUbrKwBtFCeM';
  const [results, setResults] = useState([])
  const [isLoading, setLoading] = useState(false);

  useMemo(() => {
    setLoading(true); /* Show loader during fetch request */
    /* Show random cat gif on page render */
    fetch('https://api.thecatapi.com/v1/images/search?limit=4&mime_types=gif', {headers: {'x-api-key': api_key}})
    .then(res => res.json())
    .then(data => setResults(data))
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setLoading(false);
    })
  }, [])

  /* Show loader while isLoading is set to true */
  if (isLoading) {
    return (
      <>
      <div className='loader'>
      <BeatLoader color='grey'/>
      </div>
      </>
    )

  }

  return (
    <div className='homepage'>
      {results.length > 0 && <img className='home-img' src={results[0].url} alt="kitty" />}
      <div>
        <h1 className='slogan'>All the cat images you'll ever need in one place. 😺</h1>
        <p className='landing-text'>Welcome to CatHub, your go-to website for exploring various cat breeds. 
        Find detailed descriptions, unique traits, and additional resources for each breed, and embark on a captivating journey into the world of cats.</p>
           <div className='homepage-btns'>
            <a href="/breeds" className='homepage-btn'>Search by breed</a>
           </div>
      </div>
    </div>
  )
}

export default Home