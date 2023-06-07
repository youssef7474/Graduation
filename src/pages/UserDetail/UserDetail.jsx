import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import {DoctorPatients} from "../../State/UserSlice"

const UserDetail = () => {


  
  const UserDetails = useSelector(state => state.Users.UserDetails);

  const navigate = useNavigate();
  const dispatch = useDispatch()


  const doctorPatients =()=>{
    console.log(UserDetails.uId)
    dispatch(DoctorPatients(UserDetails.uId))
    navigate("/admin/doctorPatients")
  }

  const editnav =()=>{
    navigate("/admin/userEdit")
  }


  var Records;
  var TestUser=false;
  if(UserDetails!=null)
  {
    if(UserDetails.role==="Doctor")
    {
      TestUser=true;
    }
    Records=
    <div>
    <h1 class="p-relative" style={{marginLeft:"20px"}}>{UserDetails.role} details</h1>
    <div class="profile">
        <div class="friends-page  m-20 gap-20">
            <div class="friend bg-white rad-6 p-20 p-relative">
                <div class="txt-c" >
                    <img src={UserDetails.image} alt="img" class="rad-half mt-10 mb-10 " style={{width:"100px"}}></img>
                    <h4 class="m-0">{UserDetails.name}</h4>
                </div>
                <div class="icon fs-14 p-relative">
                    <div class="p-20" style={{borderBottom: "1px solid #eee"}} >
                        <span style={{color:"#0075ff" ,fontSize:"15px"}} >Contact number : </span>
                        <span  style={{marginLeft:"10px",fontSize:"15px"}}>{UserDetails.phone}</span>
                    </div>   
                    
                    <div class="p-20" style={{borderBottom: "1px solid #eee"}} >
                      <span style={{color:"#0075ff" ,fontSize:"15px"}} >role : </span>
                      <span  style={{marginLeft:"10px",fontSize:"15px"}}>{UserDetails.role}</span>
                    </div> 

                    <div class="p-20" style={{borderBottom: "1px solid #eee"}} >
                      <span style={{color:"#0075ff" ,fontSize:"15px"}} >user id : </span>
                      <span  style={{marginLeft:"10px",fontSize:"15px"}}>{UserDetails.uId}</span>
                    </div> 
                </div>
                
                <div class="info between-flex fs-13">
                    <span class="c-grey">joined : 2023</span>
                    <div>
                        {TestUser? <button style={{border:"none",marginRight:"10px"}}  class="bg-green c-white btn-shape" onClick={doctorPatients}> show patients  </button>:<div></div>}
                        <button style={{border:"none"}}  class="bg-red c-white btn-shape" onClick={editnav}>Edit info </button>
                    </div>
                </div>
            </div>
        </div>
    </div>



    </div>
  }
  else
  {
    toast.success("loading please wait...");
  }











  return (
    <div>
    <ToastContainer></ToastContainer>
    {Records}
    </div>
  );
}

export default UserDetail;
