import React, { useEffect, useState }  from 'react'
import '../assets/css/findacat.css'

const Findacat = () => {
  const api_key = 'live_VCzktalCGYDHVGnpidpr17uDiRrkOePItc8ABgKWRzqm5jxR0QjpuUbrKwBtFCeM';
  const [results, setResults] = useState([])

  useEffect(() => {
    fetch('https://api.thecatapi.com/v1/images/search?limit=10', {headers: {'x-api-key': api_key}})
    .then(res => res.json())
    .then(data => setResults(data))
  }, [])

  return (
    <div className='image-grid'>
      {results.map(result => (
        <img className='findacat-img' key={result.id} src={result.url} alt='kitty' />
      ))}
    </div>
  )
}

export default Findacat