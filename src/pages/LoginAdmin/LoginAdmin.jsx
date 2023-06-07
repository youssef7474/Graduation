import React, { useEffect } from 'react';
import "./LoginAdmin.css"
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {Login,Logout} from "../../State/AuthSlice" 
import { useSelector } from 'react-redux';
import {useNavigate} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logoImage from "../../assets/MAGNA.jpg"


const LoginAdmin = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

 



  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await dispatch(Login({ email, password }));
    } catch (error) {
      toast.error(error)
    }
  }

  
  //const userId = useSelector(state => state.Auth.userId);
  
  /*useEffect(()=>{
    dispatch(profileinfo(userId))
  },[userId,dispatch])*/

  const isloggedIn = useSelector(state => state.Auth.islogedin);
  const userRole = useSelector(state => state.Auth.userRole);


  useEffect(()=>{
    if (isloggedIn&&userRole==="Admin") {
      navigate("/admin"); // navigate to dashboard if user is found
      toast.success("logedin")
    } else {
      console.log("error tost")
      dispatch(Logout())
    }
  },[isloggedIn,navigate,userRole,dispatch])


 
  return (
    <>
    <ToastContainer />
    <div class="login-page">
    <div class="contanier">
      <h1 class="title">
      <img decoding="async" src={logoImage} alt="" style={{width:"150px",borderRadius:"50%"}} />
      </h1>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="My Email" id="email" onChange={e=>setEmail(e.target.value)}></input>
        <input type="password" placeholder="password" onChange={e=>setPassword(e.target.value)}></input>
          <input type="submit" value="Login" ></input>
      
      </form>
    </div>
  </div>
  </>
  );
}

export default LoginAdmin;
