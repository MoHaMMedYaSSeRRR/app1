import React from 'react'
import { Link } from 'react-router-dom'
import People from './People';

export default function nav(props) {
  return (
    <div><nav className="navbar navbar-expand-lg bg-transparent">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Noxe</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        {props.userdata ? <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to='Home'>Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to='Movies'>Movies</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to='People'>People</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to='Tv'>Tv</Link>
            </li>

          </ul>


        </div> : ''}

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item d-flex align-items-center">
              <i className='fab mx-2 fa-facebook'></i>
              <i className='fab mx-2 fa-twitter'></i>
              <i className='fab mx-2 fa-instagram'></i>
              <i className='fab mx-2 fa-spotify'></i>
              <i className='fab mx-2 fa-soundcloud'></i>

            </li>
            {props.userdata ? <>
              <li className="nav-item">
                <span onClick={props.LOgout} className='nav-link'> LOgout</span>
              </li>


            </> :
              <><li className="nav-item">
                <Link className="nav-link active" aria-current="page" to='Login'>Login</Link>
              </li>

                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to='Register'>Register</Link>
                </li></>
            }



          </ul>


        </div>
      </div>
    </nav>
    </div>
  )
}
