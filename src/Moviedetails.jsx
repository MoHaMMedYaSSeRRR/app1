import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
export default function Moviedetails() {

  let parms = useParams();
  const [moviedetails, setMovieDetails] = useState(null)

  async function getMovieDetails(id) {
    let { data } = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=f1aca93e54807386df3f6972a5c33b50`);
    setMovieDetails(data);
  }

  useEffect(() => {
    getMovieDetails(parms.id)
  }, [])

  return (
    <>
   
      {moviedetails ? <div className='row'>
        <div className="col-md-3">
        <img className='w-100' src={'https://image.tmdb.org/t/p/w500' + moviedetails.poster_path} alt="" />
        </div>
        <div className='col-md-9'>
          <h2> {moviedetails.title}</h2>
          <p className='text-muted py-3'>{moviedetails.overview}</p>
    <ul>
    <li> Budget : { moviedetails.budget} </li>
    <li> Vote : { moviedetails.vote_average} </li>
    <li> popularity : { moviedetails.popularity} </li>
    <li> vote_count : { moviedetails.vote_count} </li>

    </ul>
        </div>

      </div> : <div className='vh-100 d-flex align-items-center justify-content-center'>
        <i className='fas fa-spinner fa-spin fa-3x'></i>
      </div>

      }
    </>
  )
}
