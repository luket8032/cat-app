import React, { useEffect, useState }  from 'react'
import '../assets/css/findacat.css'
import BeatLoader from "react-spinners/BeatLoader";

const Findacat = () => {
  const api_key = 'live_VCzktalCGYDHVGnpidpr17uDiRrkOePItc8ABgKWRzqm5jxR0QjpuUbrKwBtFCeM';
  const [results, setResults] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [order, setOrder] = useState('DESC');
  const [page, setPage] = useState(1);
  const [breedlist, setBreedList] = useState([]);
  const [breed, setBreed] = useState('');
  const [isRuleBroken, setisRuleBroken] = useState(false)


  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch(`https://api.thecatapi.com/v1/images/search?order=${order}&page=${page}&limit=25&breed_ids=${breed}`, {headers: {'x-api-key': api_key}}).then(res => res.json()),
      fetch('https://api.thecatapi.com/v1/breeds').then(res => res.json())
    ])
      .then(data => {
        setResults(data[0]);
        setBreedList(data[1]);
        if (breed !== '' && (order === 'ASC' || order === "DESC" )) {
          setisRuleBroken(true);
        } else {
          setisRuleBroken(false);
        }
        console.log(isRuleBroken);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally (() => {
        setLoading(false);
      })
  }, [order, page, breed, isRuleBroken])

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
          <option value="">Random</option>
        </select>

        <label for="choosebreed">Breed:</label>
        <select
        name="choosebreed"
        id="choosebreed"
        onChange={(e) => {
          const selectedBreed = e.target.value;
          setBreed(selectedBreed);
          setOrder('');
        }}
        defaultValue={breed}
        >
          <option value="">Any</option>
          {breedlist.map(result => (
            <option value={result.id}>{result.id}</option>
          ))}
        </select>
      </div>

      <div className='brokenrule' style={{display: isRuleBroken ? 'block': 'none'}}>
            <h1>Only random ordering is available for sorting by breed.</h1>
      </div>

      <div className='image-grid' style={{display: isRuleBroken ? 'block': 'hidden'}}>
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