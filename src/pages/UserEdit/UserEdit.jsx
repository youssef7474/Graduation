import { doc, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { BsFillCloudUploadFill } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { db,storage } from '../../Firebase/FireBase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';


const UserEdit = () => {


    const UserDetails = useSelector(state => state.Users.UserDetails);

    const [file,setfile]=useState("");
    const [username,setUserName]=useState(UserDetails.name);
    const [phoneNUmber,setPhoneNumber]=useState(UserDetails.phone);
    const [role,setrole]=useState(UserDetails.role);
    const [url,seturl]=useState(UserDetails.image)



    useEffect(()=>{
      const uploadFile=()=>{
   
       const name =new Date().getTime()+file.name
       const storageRef = ref(storage, name);
       const uploadTask = uploadBytesResumable(storageRef, file);
   
   
   uploadTask.on('state_changed', 
     (snapshot) => {
       const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
       console.log('Upload is ' + progress + '% done');
       switch (snapshot.state) {
         case 'paused':
           console.log('Upload is paused');
           break;
         case 'running':
           console.log('Upload is running');
           break;
           default:
             break;
       }
     }, 
     (error) => {
     }, 
     () => {
       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
         seturl(downloadURL)
       });
     }
   );
      };
      file&&uploadFile(); 
     },[file])


    const addHandler =async(e)=>{
        e.preventDefault();
        try {
            
            await setDoc(doc(db, "users", UserDetails.uId), {
                ...UserDetails,
                name: username,
                phone:phoneNUmber,
                role:role,
                image:url
              });
              toast.success("loading please wait ..")
              toast.success("success")

        } catch (error) {
            toast.error("error")
        }
       
          
        if(file)
        {
          console.log(file)
        }
        else
        {
          console.log("empty file ")
          console.log(UserDetails.image)
        }
      }




  return (
    <>
    <ToastContainer/>
    <div className='content-Contanier'>
     
      <div className='top '>
        <h1>Edit {UserDetails.role} data</h1>
      </div>

      <div className='bootom bg-white rad-6 p-20'>
        <div className='left'>
          <img src={file?URL.createObjectURL(file):UserDetails.image} alt='img'></img>
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

export default UserEdit;
