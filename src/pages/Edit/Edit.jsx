import { doc, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { BsFillCloudUploadFill } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { db } from '../../Firebase/FireBase';


const Edit = () => {

  const inforecord = useSelector(state => state.Auth.inforecord);


  const [file,setfile]=useState("");
  const [username,setUserName]=useState(inforecord.name);
  const [phoneNUmber,setPhoneNumber]=useState(inforecord.phone);
  const [role,setrole]=useState(inforecord.role);





 


  const addHandler =async(e)=>{
    e.preventDefault();
    await setDoc(doc(db, "users", inforecord.uId), {
      ...inforecord,
      name: username,
      phone:phoneNUmber,
      role:role,
    });
    if(file)
    {
      console.log(file)
    }
    else
    {
      console.log("empty file ")
      console.log(inforecord.image)
    }
  }

  return (
 


    <>
    <ToastContainer/>
    <div className='content-Contanier'>
     
      <div className='top '>
        <h1>Edit {inforecord.role} data</h1>
      </div>

      <div className='bootom bg-white rad-6 p-20'>
        <div className='left'>
          <img src={file?URL.createObjectURL(file):inforecord.image} alt='img'></img>
        </div>
        <div className='right'>
          <form onSubmit={addHandler} >
          <div className='formInput'>
            <label htmlFor="file">Image: <BsFillCloudUploadFill className="uploadIcon"></BsFillCloudUploadFill></label>
            <input type='file' id="file" style={{display:"none"}} onChange={e=>setfile(e.target.files[0])}></input>
          </div>
            <div className='formInput'>
              <label>UserName</label>
              <input type='text' placeholder='Enter username' value={username} onChange={e=>setUserName(e.target.value)}></input>
            </div>
          <div className='formInput'>
            <label>Role</label>
            <select id="Role" name="Role" value={role} onChange={e=>setrole(e.target.value)}>
              <option value="Admin">Admin</option>
              <option value="Doctor">Doctor</option>
              <option value="Nurse">Nurse</option>
            </select>
          </div>
          <div className='formInput'>
          <label>Phone Number</label>
          <input type='text' placeholder='Enter phone Number' value={phoneNUmber} onChange={e=>setPhoneNumber(e.target.value)}></input>
        </div>
          {/* 
           <div className='formInput'>
            <label>Age</label>
            <input type='text' placeholder='enter user age'onChange={e=>setage(e.target.value)}></input>
          </div>
        */}
          <button className="btn-shape" type="submit">send</button>
          </form>
        </div>
      </div>

    </div>
    </>



  );
}

export default Edit;
