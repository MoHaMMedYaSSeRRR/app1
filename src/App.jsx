import logo from './logo.svg';
import './App.css';
import Home from './Home';
import Nav from './Nav';
import Footer from './Footer';
import { Routes, Route, Navigate } from 'react-router-dom'
import Movies from './Movies';
import Tv from './Tv';
import { useEffect, useState } from 'react'

import Register from './Register';
import Notfound from './Notfound';
import Login from './Login';
import People from './People';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import Moviedetails from './Moviedetails';



function App() {
  const [userdata, setuserData] = useState(null)
  let navigate = useNavigate();
  function saveuserData() {
    let encodedtoken = localStorage.getItem('usertoken')
    let decodedtoken = jwtDecode(encodedtoken)
    setuserData(decodedtoken)
    console.log(decodedtoken)
  }
  function LOgout() {
    setuserData(null);
    localStorage.removeItem('usertoken');
    navigate('/login')

  }
  useEffect(() => {
    if (localStorage.getItem('usertoken')) {
      saveuserData();

    }
  }, [])
  function ProtectedRoute(props) {
    if (localStorage.getItem('usertoken') == null) {
      return <Navigate to='/login' />
    }
    else {
      return props.children;
    }
  }

  return (<div>
    <Nav userdata={userdata} LOgout={LOgout} />

    <div className="container">
      <Routes>
        <Route path='' element={<ProtectedRoute>  <Home />   </ProtectedRoute>} />
        <Route path='Home' element={<ProtectedRoute><Home /> </ProtectedRoute>} />
        <Route path='Movies' element={<ProtectedRoute><Movies /></ProtectedRoute>} />
        <Route path='Tv' element={<ProtectedRoute><Tv /> </ProtectedRoute>} />
        <Route path='people' element={<ProtectedRoute><People /></ProtectedRoute>} />
        <Route path='moviedetails' element={<ProtectedRoute><Moviedetails /></ProtectedRoute>} >
          <Route path=':id' element={<ProtectedRoute><Moviedetails /></ProtectedRoute>} />
        </Route>


        <Route path='login' element={<Login saveuserData={saveuserData} />} />
        <Route path='register' element={<Register />} />
        <Route path='*' element={<Notfound />} />
      </Routes>

    </div>

    <Footer />

  </div>

  )
}

export default App;
