import React, { useEffect } from 'react';
import "./TablePatient.css"
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import {featchPatients,patientdetails,DeletePatient,patientID} from "../../State/UserSlice"
import { useNavigate } from 'react-router-dom';

const TablePatient = () => {

    const dispatch=useDispatch()
    const navigate = useNavigate();

    useEffect(()=>{
        try {
            dispatch(featchPatients()) 
        } catch (error) {
            toast.error(error)
        }
    },[dispatch])

    const patientRecord = useSelector(state => state.Users.patientRecord);


    const viewdetails=(id)=>{
        dispatch(patientdetails(id))
        dispatch(patientID(id))
        navigate("/admin/details")
    }
    
    const deleteHandler=(id)=>{

        dispatch(DeletePatient(id))
    }


    var records ;
    if(patientRecord!=null) {
        records=patientRecord.map((el)=>(
     
            <tbody>
            <tr>
                <td>{el.data().name}</td>
                <td>
                    <img src={el.data().image} alt="" />
                </td>
                <td>{el.data().phone}</td>
                <td>
                  <span className={`label btn-shape c-white ${el.data().atHome? 'bg-green' : 'bg-red' }`}>
                  {el.data().atHome ? "Actiavted" : 'Deactivated'}
                  </span>
                </td>
                <td>{el.data().doctorName}</td>
                <td>
                    <span className={`label btn-shape c-white ${el.data().prediction === 'healthy heart' ? 'bg-green' : el.data().prediction === 'heart at risk' ? 'bg-red' : 'bg-orange'}`}>
                    {el.data().prediction ? el.data().prediction : 'prediction not found yet'}
                    </span>
                </td>
                <td>
                    <button  class="bg-blue c-white btn-shape" style={{border:"none",margin:"5px"}} onClick={()=>viewdetails(el.id)} >veiw details</button>
                    <button  class="bg-red c-white btn-shape" style={{border:"none"}} onClick={()=>deleteHandler(el.id)} >Remove</button>
                </td>
            </tr>
          </tbody>
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











  return (
    <div>
    <ToastContainer></ToastContainer>
    <div class="projects p-20 bg-white rad-10 m-20">
    <h2 class="mt-0 mb-20">patient's condition</h2>
    <div class="responsive-table">
      <table class="fs-15 w-full">
        <thead>
          <tr>
            <td>Name</td>
            <td>Image</td>
            <td>contact number</td>
            <td>At Home</td>
            <td>Doctor name</td>
            <td>Status</td>
            <td>control</td>
          </tr>
        </thead>
        {records}
      </table>
    </div>
  </div>
    </div>
  );
}

export default TablePatient;
