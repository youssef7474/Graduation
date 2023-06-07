import React, { useEffect } from 'react';
import "./AllPatients.css"
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector} from "react-redux";
import {featchPatients,patientdetails,DeletePatient,patientID} from "../../State/UserSlice"
import { ToastContainer, toast } from 'react-toastify';


const AllPatients = () => {

    const dispatch=useDispatch()


   


    const viewdetails=(id)=>{
        dispatch(patientdetails(id))
        dispatch(patientID(id))
        navigate("/admin/details")
    }

    const detailspatient = useSelector(state => state.Users.detailspatient);
    console.log(detailspatient)

    useEffect(()=>{
        try {
            dispatch(featchPatients()) 
        } catch (error) {
            toast.error(error)
        }
    },[dispatch])
    

    const deleteHandler=(id)=>{

        dispatch(DeletePatient(id))
    }



    const patientRecord = useSelector(state => state.Users.patientRecord);

 
    



   var records ;
    if(patientRecord!=null) {


    
    

        records=patientRecord.map((el)=>(
     
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
                <span>gender : </span>
                <span>{el.data().gender==="1"?"male":"female"}</span>
            </div>
            <div class="mb-10" >
                <span>Age : </span>
                <span>{el.data().age}</span>
            </div>
        </div>
        <div class="info between-flex fs-13">
            <span class="c-grey">Joined : 2023</span>
            <div>
                <button  class="bg-blue c-white btn-shape" style={{border:"none"}}  onClick={()=>viewdetails(el.id)} >veiw details</button>
                <button  class="bg-red c-white btn-shape" style={{border:"none"}} onClick={()=>deleteHandler(el.id)}>Remove</button>
            </div>
        </div>
    </div>
    </div>
        ))
        if(patientRecord.length <= 0)
        {
            records=<div style={{fontSize:"20px" ,color:"red"}} >
            No Patients found
            </div>
        }
        
    }
    else{
    }


    const navigate = useNavigate();
    const AddNav=()=>{
        navigate("/admin/Addpatient")
    }



  



  return (

    <>
    <ToastContainer></ToastContainer>
    <div>
   <div className='between-flex HeadWithButton'>
    <h1 class="p-relative" style={{marginLeft:"20px"}}>All Patients</h1>

    <button className='bg-green c-white btn-shape' style={{border:"none" , marginRight:"20px"}}  onClick={AddNav} >Add new Patient</button>
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

export default AllPatients;
