import React from 'react';
import "./SideBar.css"
import {BsHeartPulseFill} from"react-icons/bs"
import{AiFillPieChart} from "react-icons/ai"
import {GiMedicalDrip} from "react-icons/gi"
import {FaHandHoldingMedical,FaUserNurse} from "react-icons/fa"
import {CgProfile,CgLogOut} from "react-icons/cg"
import {NavLink} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate} from "react-router-dom";
import {Logout} from "../../State/AuthSlice.js" 
import logoimage from "../../assets/MAGNA.jpg"


const SideBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isloggedIn = useSelector(state => state.Auth.islogedin);
    
    const Logoutf =(event)=>{
        event.preventDefault();
        console.log(isloggedIn)
        dispatch(Logout())
        if (isloggedIn) {
            navigate("/"); // navigate to dashboard if user is found
          } else {
            console.log('not found');
          }
    }

  return (
    <div>
    <div class="sidebar bg-white p-20 p-relative">
    <h3 class="p-relative txt-c mt-0 ">
        <img src={logoimage} alt='image' ></img>
    </h3>
    <ul>
        <li>
            <NavLink to="/admin/dashboard" end>
                <a class=" d-flex align-center fs-14 c-black rad-6 p-10" >
                    <i style={{fontSize:"20px"}}>
                    <AiFillPieChart></AiFillPieChart>
                    </i>
                    <span>Dashboard</span>
                </a>
            </NavLink>
        </li>
        <li>
            <NavLink to="/admin/doctors">
                <a class=" d-flex align-center fs-14 c-black rad-6 p-10" >
                    <i style={{fontSize:"20px"}}>
                        <FaUserNurse></FaUserNurse>
                    </i>
                    <span>Doctors</span>
                </a>
            </NavLink>
        </li>
        <li>
            <NavLink to="/admin/Patients">
                <a class=" d-flex align-center fs-14 c-black rad-6 p-10" >
                    <i style={{fontSize:"20px"}}>
                        <GiMedicalDrip></GiMedicalDrip>
                    </i>
                    <span>Patients</span>
                </a>
            </NavLink>
        </li>
        <li>
            <NavLink to="/admin/Nurses">
                <a class=" d-flex align-center fs-14 c-black rad-6 p-10" >
                    <i style={{fontSize:"20px"}}>
                        <FaHandHoldingMedical></FaHandHoldingMedical>
                    </i>
                    <span>Nurses</span>
                </a>
            </NavLink>
        </li>
        <li>
            <NavLink to="/admin/Profile">
                <a class=" d-flex align-center fs-14 c-black rad-6 p-10" >
                    <i style={{fontSize:"20px"}}>
                        <CgProfile></CgProfile>
                    </i>
                    <span>Profile</span>
                </a>
            </NavLink>
        </li>
        <li>
            <a class=" d-flex align-center fs-14 c-black rad-6 p-10" >
                <i style={{fontSize:"20px"}}>
                    <CgLogOut onClick={Logoutf}></CgLogOut>
                </i>
                <span onClick={Logoutf} style={{cursor:"pointer"}}>LogOut</span>
             </a>
        </li>
    </ul>
</div>
    </div>
  );
}

export default SideBar;
