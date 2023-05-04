import React, { useEffect, useState }  from 'react'
import '../assets/css/home.css'

const Home = () => {
  const api_key = 'live_VCzktalCGYDHVGnpidpr17uDiRrkOePItc8ABgKWRzqm5jxR0QjpuUbrKwBtFCeM';
  const [results, setResults] = useState([])

  useEffect(() => {
    fetch('https://api.thecatapi.com/v1/images/search?limit=4&mime_types=gif', {headers: {'x-api-key': api_key}})
    .then(res => res.json())
    .then(data => setResults(data))
  }, [])

  return (
    <div className='homepage'>
      {results.length > 0 && <img className='home-img' src={results[0].url} alt="kitty" />}
      <div>
        <h1 className='slogan'>All the cat images you'll ever need in one place. 😺</h1>
        <p className='landing-text'>Welcome to CatHub, your one-stop-shop for downloading all your favorite cat images.
           With our powerful search feature and free downloads, finding and using the perfect kitty picture has never been easier. So why wait? 
           Start browsing our collection of adorable feline friends today! </p>
           <div className='homepage-btns'>
            <a href="/findacat" className='homepage-btn'>Find a cat here</a>
            <a href="/breeds" className='homepage-btn'>Search by breed</a>
           </div>
      </div>
    </div>
  )
}

export default Home