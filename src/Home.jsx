import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import avatar from './mody.jpg'
import { Link } from 'react-router-dom';
import $ from 'jquery'

export default function Home() {
  const [trendingmovie, setTrendingMovie] = useState([])
  const [trendingTv, setTrendingTv] = useState([])
  const [trendingPeople, setTrendingpeople] = useState([])

  async function gettrending(mediatype, callback) {
    let { data } = await axios.get(`https://api.themoviedb.org/3/trending/${mediatype}/week?api_key=f1aca93e54807386df3f6972a5c33b50`)
    callback(data.results.slice(0, 10));

  }
  useEffect(() => {
    gettrending('movie', setTrendingMovie)
    gettrending('tv', setTrendingTv)
    gettrending('person', setTrendingpeople)
  }, [])
  return (

    <>

      <div className="row">
        <div className="col-md-4 d-flex align-items-center">
          <div>
            <div className="border w-25 mb-4"> </div>
            <h2 className='h3'>
              Trending <br /> Movie <br /> To Watch Right Now
            </h2>
            <p className='text-'> Top Trending Movies By day</p>
            <div className="border  mt-4"> </div>
          </div>

        </div>
        {trendingmovie.map((movie, i) => <div key={i} className='col-md-2'>
          <div className="movie">
           <Link to={`/moviedetails/${movie.id}`}>
           <img className='w-100' src={'https://image.tmdb.org/t/p/w500' + movie.poster_path} alt="" />
            <h3 className='h6 my-2 ' >{movie.title}</h3>
            </Link>
          </div>
        </div>)}
      </div>

      <div className="row ">
        <div className="col-md-4 d-flex align-items-center">
          <div>
            <div className="border w-25 mb-4"> </div>
            <h2 className='h3'>
              Trending <br /> TV <br /> To Watch Right Now
            </h2>
            <p className='text-'> Top Trending TV By day</p>
            <div className="border  mt-4"> </div>
          </div>

        </div>
        {trendingTv.map((tv, i) => <div key={i} className='col-md-2'>
          <div className="tv">
            <img className='w-100' src={'https://image.tmdb.org/t/p/w500' + tv.poster_path} alt="" />
            <h3 className='h6 my-2 ' >{tv.name}</h3>
          </div>
        </div>)}
      </div>

      <div className="row py-5">
        <div className="col-md-4 d-flex align-items-center">
          <div>
            <div className="border w-25 mb-4"> </div>
            <h2 className='h3'>
              Trending <br /> People <br /> To Watch Right Now
            </h2>
            <p className='text-'> Top Trending People By day</p>
            <div className="border  mt-4"> </div>
          </div>

        </div>
        {trendingPeople.map((person, i) => <div key={i} className='col-md-2'>
          <div className="tv">
            {person.profile_path === null ? 
            <>
                        <img className='w-100 heightofphoto' src={avatar} />
                        <h3 className='h6 my-2 ' > Mody </h3>

            </>
              :
              <>
                <img className='w-100' src={'https://image.tmdb.org/t/p/w500' + person.profile_path} alt="" />
                <h3 className='h6 my-2 ' > {person.name} </h3>

              </>

            }
          </div>
        </div>)}
      </div>



    </>
  )
}
