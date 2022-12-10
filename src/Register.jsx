import React from 'react'
import { useState } from 'react'
import joi from 'joi';
import  Axios from 'axios';
import { useNavigate } from "react-router-dom";


export default function Register() {

  const [errorList, setErrorList]=useState([])
const [isLoading, setIsLoading]=useState(false)
let navigate = useNavigate();
const [error, setError]=useState('')
const [user ,setUser]=useState({
  first_name:'',
  last_name:'',
  age:'',
  email:'',
  password:''
})


function getuserdata(e){
  var myUser={...user};
 myUser[e.target.name]=e.target.value;
 setUser(myUser);

}
async function submitRegisternow(e)
{
  e.preventDefault();
  setIsLoading(true)

  let validationResult=validateRegistration();
if(validationResult.error){

setErrorList(validationResult.error.details)
setIsLoading(false)

}
else{
let {data} = await Axios.post('https://route-egypt-api.herokuapp.com/signup',user)
  
  if(data.message==='success'){
    setIsLoading(false)
    navigate("/login");
  }
  else{
    setError(data.message)
    setIsLoading(false)

  }
}

  
}
 function validateRegistration(){
  let scheme = joi.object(
  {
    first_name:joi.string().alphanum().min(3).max(10).required(),
    last_name:joi.string().alphanum().min(3).max(10).required(),
    email: joi.string().email({minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    age:joi.number().min(16).max(80).required(),
    password:joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  })
  return scheme.validate(user, {abortEarly:false});
 }



  return (
    <>
<div className='w-75 mx-auto'>
  <h2> register now</h2>
  
  {errorList.map((error)=><div className='alert py-2 alert-info'>{error.message}</div>) }

  { error ? <div className='alert alert-danger'>{error}</div>:''}

  <form onSubmit={submitRegisternow}>
  
      <label htmlFor="first_name">First_name :</label>
    <input onChange={getuserdata} type="text" className='form-control  mb-2 bg-transparent text-white' id='first_name' name='first_name'  />
    
    <label htmlFor="last_name">Last_name :</label>
    <input  onChange={getuserdata} type="text" className='form-control mb-2  bg-transparent text-white' id='last_name' name='last_name' />

     <label htmlFor="email">email :</label>
    <input  onChange={getuserdata} type="email" className='form-control mb-2  bg-transparent text-white' id='email' name='email' />
    

    <label htmlFor="age">Age :</label>
    <input  onChange={getuserdata} type="number" className='form-control mb-2  bg-transparent text-white ' id='age' name='age' />

    <label htmlFor="password">password :</label>
    <input  onChange={getuserdata} type="password" className='form-control mb-2  bg-transparent text-white' id='password' name='password' />

    <button className='btn btn-transparent btn-outline-info border-1 border-danger text-white' type='submit'>
      {isLoading===true? <i className='fa fa-spinner fa-spin'></i>:'Register'}
      </button>
  </form>

</div>
    </>
  )
}

