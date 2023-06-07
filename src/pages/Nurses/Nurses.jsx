import React, { useEffect } from 'react'; 
import "./Nurses.css"
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector} from "react-redux";
import {fetshNurses} from "../../State/UserSlice"
import { ToastContainer } from 'react-toastify';
import {UserDetail,DeleteNurse} from "../../State/UserSlice"

const Nurses = () => {


    const navigate = useNavigate();
    const dispatch = useDispatch()



    const nurseRecord = useSelector(state => state.Users.nurseRecord);

    useEffect(()=>{
        try {
            dispatch(fetshNurses())
        } catch (error) {
            
        }
    },[dispatch])





    const viewdetails=(id)=>{
        dispatch(UserDetail(id));
        navigate("/admin/UserDetails")
    }


const deleteHandler=(id)=>{

    dispatch(DeleteNurse(id))
}




var records ;
if(nurseRecord!=null) {
  

    records=nurseRecord.map((el)=>(
        <div key={el.id}>
        <div class="friend bg-white rad-6 p-20 p-relative">
        <div class="txt-c">
        <img src={el.data().image} alt="" class="rad-half mt-10 mb-10 " style={{width:"100px"}} ></img>
            <h4 class="m-0">{el.data().name}</h4>
        </div>
        <div class="icon fs-14 p-relative">
            <div class="mb-10">
                <span>contact numbe :</span>
                <span >{el.data().phone}</span>
            </div>
            <div class="mb-10">
                <span>Email : </span>
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
                <button  class="bg-red c-white btn-shape" style={{border:"none"}}onClick={()=>deleteHandler(el.id)}>Remove</button>
            </div>
        </div>
    </div>
    </div>
    ))
    if(nurseRecord.length <= 0)
    {
        records=<div style={{fontSize:"20px" ,color:"red"}} >
        No nurses found
        </div>
    }
}
else{
  
}




    
    const AddNav=()=>{
        navigate("/admin/AddUser")
    }
  return (
    <>
    <ToastContainer></ToastContainer>
    <div>

    <div className='between-flex HeadWithButton'>
     <h1 class="p-relative" style={{marginLeft:"20px",marginTop:"10px"}}>All Nurses</h1>
     <button className='bg-green c-white btn-shape' style={{border:"none" , marginRight:"20px"}}  onClick={AddNav} >Add new Nurse</button>
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

export default Nurses;
