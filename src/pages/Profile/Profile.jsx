//import React, { useEffect } from 'react';
import "./Profile.css"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {profileinfo} from "../../State/AuthSlice"
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";





const Profile = () => {

    const navigate = useNavigate();
    const dispatch= useDispatch()
    const user = useSelector(state => state.Auth.user);


    
    const isLoading = useSelector(state => state.Auth.isLoading);

    useEffect(()=>{
        dispatch(profileinfo(user))
    },[dispatch,user])



    useEffect(()=>{
        if(isLoading)
        {
            toast.success("loading profile data...")
        }
        
    },[isLoading])


    const inforecord = useSelector(state => state.Auth.inforecord);

        
   /* const timedate= new Date(inforecord.time.seconds*1000)
          



    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
      }



    const inputDate = timedate;
    const formattedDate = formatDate(inputDate);*/


    const editUser =()=>{
        navigate("/admin/editUser")
    }
    
  return (
<>

<ToastContainer></ToastContainer>
    <div>
    <h1 class="p-relative" style={{marginLeft:"20px"}}>Admin details</h1>
    <div class="profile">
        <div class="friends-page  m-20 gap-20">
            <div class="friend bg-white rad-6 p-20 p-relative">
                <div class="txt-c" >
                    <img src={inforecord.image} alt="img" class="rad-half mt-10 mb-10 " style={{width:"100px"}}></img>
                    <h4 class="m-0">{inforecord.name}</h4>
                </div>
                <div class="icon fs-14 p-relative">
                    <div class="p-20" style={{borderBottom: "1px solid #eee"}} >
                        <span style={{color:"#0075ff" ,fontSize:"15px"}} >Contact numbe : </span>
                        <span  style={{marginLeft:"10px",fontSize:"15px"}}>{inforecord.phone}</span>
                    </div>
                    <div class="p-20"  style={{borderBottom: "1px solid #eee"}}>
                        <span style={{color:"#0075ff" ,fontSize:"15px"}}>Role:</span>
                        <span style={{marginLeft:"10px",fontSize:"15px"}}>{inforecord.role}</span>
                    </div>
                    <div class="p-20"  style={{borderBottom: "1px solid #eee"}} >
                        <span  style={{color:"#0075ff" ,fontSize:"15px"}}>Email:</span>
                        <span style={{marginLeft:"10px",fontSize:"15px"}}>{inforecord.email}</span>
                    </div>
                
                   
                    
                </div>
                <div class="info between-flex fs-13">
                    <span class="c-grey">joined : 2023</span>
                    <div>
                        <button style={{border:"none"}}  class="bg-red c-white btn-shape" onClick={editUser}>Edit info </button>
                    </div>
                </div>
            </div>
        </div>
    </div>



    </div>

    </>
  );
}

export default Profile;
