import React, { useEffect } from 'react';
import "./Header.css"

//import {BsSearchHeart} from"react-icons/bs"
//import {AiOutlineBell} from "react-icons/ai"
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {profileinfo} from "../../State/AuthSlice"
const Header = () => {

  const navigate = useNavigate();
  const dispatch =useDispatch();

  const userId = useSelector(state => state.Auth.userId);

  useEffect(()=>{
    dispatch(profileinfo(userId))
},[dispatch,userId])
  const inforecord = useSelector(state => state.Auth.inforecord);



  const directProfile =()=>{
    navigate("/admin/Profile")
  }
  return (
    <div class="content w-full">
        <div class="head bg-white p-15 between-flex">
        <div class="search p-relative">
        
        </div>
          {/* 
            <div class="search p-relative">
            <i className='searchicon'>
                <BsSearchHeart></BsSearchHeart>
            </i>
            <input class="p-10" type="search" placeholder="Type A Keyword" />
          </div>
        */} 
          <div class="icons d-flex align-center">
           {/* <span class="notification p-relative">
              <i style={{fontSize:"20px"}}>
                <AiOutlineBell ></AiOutlineBell>
              </i>
            </span> */} 
            <img src={inforecord.image} alt="img" onClick={directProfile} style={{cursor:"pointer"}} />
          </div>
        </div>
    </div>
  );
}

export default Header;
