import React, { useMemo, useState }  from 'react'
import '../assets/css/findacat.css'
import BeatLoader from "react-spinners/BeatLoader";
import {CiSearch} from 'react-icons/ci';
import Modal from './Modal.jsx'

function Findacat() {
  const api_key = process.env.REACT_APP_API_KEY;
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
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);


  useMemo(() => {
    setLoading(true);
    Promise.all([
      fetch(`https://api.thecatapi.com/v1/images/search?order=${order}&page=${page}&limit=24&breed_ids=${breed}&mime_types=${imgType}&category_ids=${category}`, { headers: { 'x-api-key': api_key } })
        .then(res => {
          setpaginationCount(res.headers.get('pagination-count'));
          if (paginationCount <= 24) {
            setisMultiplePages(false);
          } else if (order === '') {
            setisMultiplePages(false);
          } else {
            setisMultiplePages(true);
          }
          console.log(paginationCount);
          return res.json();
        }),
      fetch('https://api.thecatapi.com/v1/breeds').then(res => res.json()),
      fetch('https://api.thecatapi.com/v1/categories').then(res => res.json())
    ])
      .then(data => {
        setResults(data[0]);
        setBreedList(data[1]);
        setcategorylist(data[2]);
        if (breed !== '' && (order === 'ASC' || order === "DESC")) {
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
      .finally(() => {
        setLoading(false);
      });
  }, [order, page, breed, imgType, category, paginationCount]);

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    setPage(page - 1);
  };

  const handleImageClick = (url) => {
    setSelectedImage(url);
    setShowModal(prev => !prev);
  };

  if (isLoading) {
    return (
      <>
        <div className='findacat-loader'>
          <BeatLoader color='grey' />
        </div>
      </>
    );
  }

  return (
    <div>
      <div className='filters'>
        <div>
          <label for='chooseorder'>Order By:</label>
          <select
            name="chooseorder"
            id="chooseorder"
            onChange={(e) => {
              const selectedOrder = e.target.value;
              setOrder(selectedOrder);
            } }
            defaultValue={order}
          >
            <option value="DESC">Newest</option>
            <option value="ASC">Oldest</option>
            <option value="">Random</option>
          </select>
        </div>

        <div>
          <label for="choosebreed" style={{ display: hideBreed ? 'none' : 'line' }}>Breed:</label>
          <select
            name="choosebreed"
            id="choosebreed"
            style={{ display: hideBreed ? 'none' : 'line' }}
            onChange={(e) => {
              const selectedBreed = e.target.value;
              setBreed(selectedBreed);
              setOrder('');
              setimgType('');
            } }
            defaultValue={breed}
          >
            <option value="">Any</option>
            {breedlist.map(result => (
              <option value={result.id}>{result.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label for='chooseimgtype'>Image Type:</label>
          <select
            name="chooseimgtype"
            id="chooseimgtype"
            onChange={(e) => {
              const selectedType = e.target.value;
              setimgType(selectedType);
            } }
            defaultValue={imgType}
          >
            <option value="">Any</option>
            <option value="gif">gif</option>
            <option value="jpg">jpg</option>
            <option value="png">png</option>
          </select>
        </div>

        <div>
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
            } }
            defaultValue={category}
          >
            <option value="">Any</option>
            {categorylist.map(result => (
              <option value={result.id}>{result.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className='brokenrule' style={{ display: isRuleBroken ? 'block' : 'none' }}>
        <h1 className='note'>Note: Only random ordering is available for sorting by breed.</h1>
      </div>

      <div className='brokenrule' style={{ display: hideBreed ? 'block' : 'none' }}>
        <h1 className='note'>Note: Breed sorting is not available while sorting by image type.</h1>
      </div>

      <div className='image-grid' style={{ display: isRuleBroken ? 'block' : 'hidden' }}>
        {results.map(result => (
          <div className='container'>
            <div className='iamge-wrapper'>
              <img className='findacat-img' key={result.id} src={result.url} alt='kitty' />
            </div>
            <div className='middle'>
              <button className='text' onClick={() => handleImageClick(result.url)}><CiSearch size={30} /></button>
            </div>
          </div>
        ))}
        <Modal showModal={showModal} setShowModal={setShowModal} selectedImage={selectedImage} />
      </div>

      <div className="pagination-bar" style={{ display: isMultiplePages ? 'flex' : 'none' }}>
        {page > 0 && <button className="page-btn" onClick={handlePrevPage}>{"< Prev Page"}</button>}
        <button className="page-btn" onClick={handleNextPage}> {"Next Page >"} </button>
      </div>
    </div>
  );
}

export default Findacat