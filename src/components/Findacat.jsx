import React, { useEffect, useState }  from 'react'
import '../assets/css/findacat.css'
import BeatLoader from "react-spinners/BeatLoader";

const Findacat = () => {
  const api_key = 'live_VCzktalCGYDHVGnpidpr17uDiRrkOePItc8ABgKWRzqm5jxR0QjpuUbrKwBtFCeM';
  const [results, setResults] = useState([])
  const [isLoading, setLoading] = useState(false);
  const [order, setOrder] = useState('DESC');
  const [page, setPage] = useState(1)
  const [breed, setBreed] = useState('')
  const [category, setCategory] = useState('')

  useEffect(() => {
    setLoading(true);
    fetch(`https://api.thecatapi.com/v1/images/search?order=${order}&page=${page}&limit=25`, {headers: {'x-api-key': api_key}})
      .then(res => {
        return res.json();
      })
      .then(data => {
        setResults(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally (() => {
        setLoading(false);
      })
  }, [order, page])

  const handleNextPage = () => {
    setPage(page + 1);
    console.log(page);
  }

  const handlePrevPage = () => {
    setPage(page - 1);
    console.log(page);
  }


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
    <div>
      <div className='filters'>
        <label for='chooseorder'>Order By:</label>
        <select
        name="chooseorder"
        id="chooseorder"
        onChange={(e) => {
          const selectedOrder = e.target.value;
          setOrder(selectedOrder)
        }}
        defaultValue={order}
        >
          <option value="DESC">Newest</option>
          <option value="ASC">Oldest</option>
        </select>
      </div>

      <div className='image-grid'>
      {results.map(result => (
        <img className='findacat-img' key={result.id} src={result.url} alt='kitty' />
      ))}
    </div>

    <div className="pagination-bar">
        {page > 1 && <button className="page-btn" onClick={handlePrevPage}>{"< Prev Page"}</button>}
        <button className="page-btn" onClick={handleNextPage}> {"Next Page >"} </button>
      </div>
    </div>
  )
}

export default Findacat