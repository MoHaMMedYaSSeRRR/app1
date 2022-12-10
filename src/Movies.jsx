import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
export default function Movies() {
  const [trendingmovie, setTrendingMovie] = useState([])
  let nums = new Array(13).fill(1).map((elem, index) => index + 1)
  async function gettrending(pageNumber) {
    let { data } = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=f1aca93e54807386df3f6972a5c33b50&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNumber}&with_watch_monetization_types=flatrate`)
    setTrendingMovie(data.results);

  }
  useEffect(() => {
    gettrending(1);
  }, [])
  return (
    <>


      {trendingmovie ? <div className="row ">
        <div className="row  d-flex justify-content-center">

          {trendingmovie.map((movie, i) => <div key={i} className='col-md-2'>
            <div className="movie">
              <Link to={`/moviedetails/${movie.id}`}>
                <img className='w-100' src={'https://image.tmdb.org/t/p/w500' + movie.poster_path} alt="" />
                <h3 className='h6 my-2 ' >{movie.title}</h3>
              </Link>
            </div>
          </div>)}
        </div>

      </div> : <div className='vh-100 d-flex align-items-center justify-content-center'>
        <i className='fas fa-spinner fa-spin fa-3x'> </i>
      </div>}
      <nav className='py-5' aria-label="... ">
        <ul className="pagination pagination-lg d-flex justify-content-center  ">
          {
            nums.map((pagenum) => <li onClick={() => gettrending(pagenum)} key={pagenum} className="page-item">
              <a className=" pag bg-transparent page-link">{pagenum}</a></li>
            )
          }
        </ul>
      </nav>




    </>
  )
}
