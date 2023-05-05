import React, { useEffect, useState }  from 'react'
import '../assets/css/findacat.css'
import BeatLoader from "react-spinners/BeatLoader";

const Findacat = () => {
  const api_key = 'live_VCzktalCGYDHVGnpidpr17uDiRrkOePItc8ABgKWRzqm5jxR0QjpuUbrKwBtFCeM';
  const [results, setResults] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [order, setOrder] = useState('DESC');
  const [page, setPage] = useState(0);
  const [breedlist, setBreedList] = useState([]);
  const [breed, setBreed] = useState('');
  const [isRuleBroken, setisRuleBroken] = useState(false);
  const [isMultiplePages, setisMultiplePages] = useState(true);
  const [paginationCount, setpaginationCount] = useState(26);
  const [imgType, setimgType] = useState('');
  const [hideBreed, sethideBreed] = useState(false);
  const [categorylist, setcategorylist] = useState([]);
  const [category, setCategory] = useState([]);


  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch(`https://api.thecatapi.com/v1/images/search?order=${order}&page=${page}&limit=25&breed_ids=${breed}&mime_types=${imgType}&category_ids=${category}`, {headers: {'x-api-key': api_key}})
      .then(res => {
        setpaginationCount(res.headers.get('pagination-count'));
        if (paginationCount <= 25) {
          setisMultiplePages(false);
        } else if (order === ''){
          setisMultiplePages(false);
        } else {
          setisMultiplePages(true);
        }
        console.log(paginationCount)
        return res.json();
      }),
      fetch('https://api.thecatapi.com/v1/breeds').then(res => res.json()),
      fetch('https://api.thecatapi.com/v1/categories').then(res => res.json())
    ])
      .then(data => {
        setResults(data[0]);
        setBreedList(data[1]);
        setcategorylist(data[2]);
        if (breed !== '' && (order === 'ASC' || order === "DESC" )) {
          setisRuleBroken(true);
        } else {
          setisRuleBroken(false);
        }

        if (imgType !== "") {
          sethideBreed(true);
        } else {
          sethideBreed(false);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally (() => {
        setLoading(false);
      })
  }, [order, page, breed, imgType, category])

  const handleNextPage = () => {
    setPage(page + 1);
  }

  const handlePrevPage = () => {
    setPage(page - 1);
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

        <label for="choosebreed" style={{display: hideBreed ? 'none' : 'line'}}>Breed:</label>
        <select
        name="choosebreed"
        id="choosebreed"
        style={{display: hideBreed ? 'none' : 'line'}}
        onChange={(e) => {
          const selectedBreed = e.target.value;
          setBreed(selectedBreed);
          setOrder('');
          setimgType('');
        }}
        defaultValue={breed}
        >
          <option value="">Any</option>
          {breedlist.map(result => (
            <option value={result.id}>{result.id}</option>
          ))}
        </select>

        <label for='chooseimgtype'>Image Type:</label>
        <select
        name="chooseimgtype"
        id="chooseimgtype"
        onChange={(e) => {
          const selectedType = e.target.value;
          setimgType(selectedType)
        }}
        defaultValue={imgType}
        >
          <option value="">Any</option>
          <option value="gif">gif</option>
          <option value="jpg">jpg</option>
          <option value="png">png</option>
        </select>

        <label for="choosecategory">Category:</label>
        <select
        name="choosecategory"
        id="choosecategory"
        onChange={(e) => {
          const selectedCategory = e.target.value;
          console.log(paginationCount);
          setCategory(selectedCategory);
          if (page === 1) {
            setPage(null);
          } else {
            setPage(page);
          }
        }}
        defaultValue={category}
        >
          <option value="">Any</option>
          {categorylist.map(result => (
            <option value={result.id}>{result.name}</option>
          ))}
        </select>
      </div>

      <div className='brokenrule' style={{display: isRuleBroken ? 'block': 'none'}}>
            <h1>Only random ordering is available for sorting by breed.</h1>
      </div>

      <div className='brokenrule' style={{display: hideBreed ? 'block': 'none'}}>
            <h1 className='note'>Note: breed sorting is not available while sorting by image type.</h1>
      </div>

      <div className='image-grid' style={{display: isRuleBroken ? 'block': 'hidden'}}>
      {results.map(result => (
        <img className='findacat-img' key={result.id} src={result.url} alt='kitty' />
      ))}
    </div>

    <div className="pagination-bar" style={{display: isMultiplePages ? 'flex': 'none'}}>
        {page > 1 && <button className="page-btn" onClick={handlePrevPage}>{"< Prev Page"}</button>}
        <button className="page-btn" onClick={handleNextPage}> {"Next Page >"} </button>
      </div>
    </div>
  )
}

export default Findacat