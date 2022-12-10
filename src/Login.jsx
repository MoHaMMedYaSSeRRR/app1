import React from 'react'
import { useState } from 'react'
import joi from 'joi';
import  Axios from 'axios';
import { useNavigate } from "react-router-dom";


export default function Login(props) {

  const [errorList, setErrorList]=useState([])
const [isLoading, setIsLoading]=useState(false)
let navigate = useNavigate();
const [error, setError]=useState('')
const [user ,setUser]=useState({
 
  email:'',
  password:''
})


function getuserdata(e){
  var myUser={...user};
 myUser[e.target.name]=e.target.value;
 setUser(myUser);

}
async function submitlogin(e)
{
  e.preventDefault();
  setIsLoading(true)

  let validationResult=validatelogin();
if(validationResult.error){

setErrorList(validationResult.error.details)
setIsLoading(false)

}
else{
let {data} = await Axios.post('https://route-egypt-api.herokuapp.com/signin',user)

  if(data.message==='success'){
    setIsLoading(false)
    localStorage.setItem('usertoken',data.token)
    props.saveuserData()
    navigate("/home");
  }
  else{
    setError(data.message)
    setIsLoading(false)

  }
}

  
}
 function validatelogin(){
  let scheme = joi.object(
  {
    
    email: joi.string().email({minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password:joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  })
  return scheme.validate(user, {abortEarly:false});
 }



  return (
    <>
<div className='w-75 mx-auto'>
  <h2> Login now</h2>
  
  {errorList.map((error)=><div className='alert py-2 alert-info'>{error.message}</div>) }

  { error ? <div className='alert alert-danger'>{error}</div>:''}

  <form onSubmit={submitlogin}>
  
     

    <label htmlFor="email">email :</label>
    <input  onChange={getuserdata} type="email" className='form-control mb-2  bg-transparent text-white' id='email' name='email' />
    

   

    <label htmlFor="password">password :</label>
    <input  onChange={getuserdata} type="password" className='form-control mb-2  bg-transparent text-white' id='password' name='password' />

    <button className='btn btn-transparent btn-outline-info border-1 border-danger text-white' type='submit'>
      {isLoading===true? <i className='fa fa-spinner fa-spin'></i>:'LOgin'}
      </button>
  </form>

</div>
    </>
  )
}

