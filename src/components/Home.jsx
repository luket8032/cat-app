import React, { useEffect, useState }  from 'react'
import '../assets/css/home.css'

const Home = () => {
  const [results, setResults] = useState([])

  useEffect(() => {
    fetch('https://api.thecatapi.com/v1/images/search')
    .then(res => res.json())
    .then(data => setResults(data));
  }, [])

  return (
    <div>
      {results.length > 0 && <img src={results[0].url} alt="kitty" />}
    </div>
  )
}

export default Home