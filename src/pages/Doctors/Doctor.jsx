import React, { useEffect } from 'react';
import "./Doctor.css"
import {useNavigate} from "react-router-dom";
import { useDispatch, useSelector} from "react-redux";
import {fetshdoctors} from "../../State/UserSlice"
import { ToastContainer } from 'react-toastify';
import {UserDetail,DeleteDoctor} from "../../State/UserSlice"

const Doctor = () => {

    const doctorRecord = useSelector(state => state.Users.doctorRecord);
    const navigate = useNavigate();
    const dispatch = useDispatch()


    

    const viewdetails=(id)=>{
        dispatch(UserDetail(id));
        navigate("/admin/UserDetails")
    }


    const AddNav=()=>{
        navigate("/admin/AddUser")
    }



    const deleteHandler=(id)=>{

        dispatch(DeleteDoctor(id))
    }


    useEffect(()=>{
        try {
            dispatch(fetshdoctors())
        } catch (error) {
            
        }
    },[dispatch])
    var records ;
    if(doctorRecord!=null) {

        records=doctorRecord.map((el)=>(
            <div key={el.id}>
            <div class="friend bg-white rad-6 p-20 p-relative">
            <div class="txt-c">
            <img src={el.data().image} alt="" class="rad-half mt-10 mb-10 " style={{width:"100px"}} ></img>
                <h4 class="m-0">{el.data().name}</h4>
            </div>
            <div class="icon fs-14 p-relative">
                <div class="mb-10">
                    <span>contact numbe : </span>
                    <span >{el.data().phone}</span>
                </div>
                <div class="mb-10">
                    <span>Emal : </span>
                    <span>{el.data().email}</span>
                </div>
                <div class="mb-10">
                    <span>Role : </span>
                    <span>{el.data().role}</span>
                </div>
            </div>
            <div class="info between-flex fs-13">
                <span class="c-grey">Joined : 2023</span>
                <div>
                    <button  class="bg-blue c-white btn-shape" style={{border:"none"}} onClick={()=>viewdetails(el.id)}>veiw details</button>
                    <button  class="bg-red c-white btn-shape" style={{border:"none"}} onClick={()=>deleteHandler(el.id)} >Remove</button>
                </div>
            </div>
        </div>
        </div>

        ))
            if(doctorRecord.length <= 0)
        {
            records=<div style={{fontSize:"20px" ,color:"red"}} >
            No doctors found
            </div>
        } 
    }
    else{
        
    }




  return (
    <>
    <ToastContainer></ToastContainer>
    <div>

   <div className='between-flex HeadWithButton'>
    <h1 class="p-relative" style={{marginLeft:"20px"}}>All doctors</h1>
    <button className='bg-green c-white btn-shape' style={{border:"none" , marginRight:"20px"}} onClick={AddNav} >Add new doctor</button>
    </div>
    <div class="Patients">
        <div class="friends-page d-grid m-20 gap-20">
        {records}
        </div>
    </div>
    </div>
    </>
  );
}

export default Doctor;
