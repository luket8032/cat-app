import React, { useEffect, useState }  from 'react'
import '../assets/css/home.css'

const Home = () => {
  const api_key = 'live_VCzktalCGYDHVGnpidpr17uDiRrkOePItc8ABgKWRzqm5jxR0QjpuUbrKwBtFCeM'
  const [results, setResults] = useState([])

  useEffect(() => {
    fetch('https://api.thecatapi.com/v1/images/search?limit=4&breed_ids=beng', {headers: {'x-api-key': api_key}})
    .then(res => res.json())
    .then(data => setResults(data))
  }, [])

  return (
    <div>
      {results.length > 0 && <img src={results[0].url} alt="kitty" />}
    </div>
  )
}

export default Home