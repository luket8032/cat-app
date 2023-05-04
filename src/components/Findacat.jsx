import React, { useEffect, useState }  from 'react'
import '../assets/css/findacat.css'
import BeatLoader from "react-spinners/BeatLoader";

const Findacat = () => {
  const api_key = 'live_VCzktalCGYDHVGnpidpr17uDiRrkOePItc8ABgKWRzqm5jxR0QjpuUbrKwBtFCeM';
  const [results, setResults] = useState([])
  const [isLoading, setLoading] = useState(false);
  const [order, setOrder] = useState('');
  const [page, setPage] = useState('')
  const [breed, setBreed] = useState('')

  useEffect(() => {
    setLoading(true);
    fetch('https://api.thecatapi.com/v1/images/search?order=RANDOM&page=&limit=25', {headers: {'x-api-key': api_key}})
    .then(res => res.json())
    .then(data => setResults(data))
    .catch((err) => {
      console.log(err);
    })
    .finally (() => {
      setLoading(false);
    })
  }, [])

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
    <div className='image-grid'>
      {results.map(result => (
        <img className='findacat-img' key={result.id} src={result.url} alt='kitty' />
      ))}
    </div>
  )
}

export default Findacat