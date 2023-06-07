import React, { useEffect, useState } from 'react';
import { BsFillCloudUploadFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import {fetshdoctors} from "../../State/UserSlice"
import { ToastContainer, toast } from 'react-toastify';
import { doc, setDoc } from 'firebase/firestore';
import { db,storage } from '../../Firebase/FireBase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';


const EditPatient = () => {

    const detailspatient = useSelector(state => state.Users.detailspatient);



    const patientID = useSelector(state => state.Users.patientID);
   
  
    





    const [file,setfile]=useState("");
    const [username,setUserName]=useState(detailspatient.name);
    const [Age,setAge]=useState(detailspatient.age);
    const [phoneNUmber,setPhoneNumber]=useState(detailspatient.phone);
    const [gender,setGender]=useState(detailspatient.gender)
    const [chestPainType,setchestPainType]=useState(detailspatient.chestPainType)
    const [cholesterol,setcholesterol]=useState(detailspatient.cholesterol)
    const [exerciseAngina,setexerciseAngina]=useState(detailspatient.exerciseAngina)
    const [fastingBloodSugar,setfastingBloodSugar]=useState(detailspatient.fastingBloodSugar)
    const [description,setdescription]=useState(detailspatient.description)
    const [doctorId,setDoctorId]=useState(detailspatient.doctorId)
    const [url,seturl]=useState(detailspatient.image)

    const dispatch=useDispatch()

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

    const addHandler=async(e)=>{
      e.preventDefault();
        try {
            
            await setDoc(doc(db, "patients", patientID), {
                ...detailspatient,
                name: username,
                phone:phoneNUmber,
                age:Age,
                gender:gender,
                chestPainType:chestPainType,
                cholesterol:cholesterol,
                exerciseAngina:exerciseAngina,
                fastingBloodSugar:fastingBloodSugar,
                description:description,
                doctorId:doctorId,
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
          console.log(detailspatient.image)
        }
    }
    

    useEffect(()=>{
        try {
            dispatch(fetshdoctors())
            
        } catch (error) {
            toast.error(error)
        }
    },[dispatch])


    const doctorRecord = useSelector(state => state.Users.doctorRecord);


    var records ;
    if(doctorRecord!=null) {

        records=doctorRecord.map((el)=>(
          <>
            <option value={el.data().uId}>{el.data().name}</option>
          </>
        ))
        if(doctorRecord.length <= 0)
        {
            records=<div style={{fontSize:"20px" ,color:"red"}} >
            No Doctors found
            </div>
        }
        
    }
    else{
    }


  return (
    <>
    <ToastContainer></ToastContainer>
    <div className='content-Contanier'>
     
      <div className='top '>
        <h1>Edit patient details</h1>
      </div>

      <div className='bootom bg-white rad-6 p-20'>
         <div className='left'>
          <img src={file?URL.createObjectURL(file):detailspatient.image} alt='img'></img>
        </div>
        <div className='right'>
          <form onSubmit={addHandler}>
            <div className='formInput'>
              <label htmlFor="file">Image: <BsFillCloudUploadFill className="uploadIcon"></BsFillCloudUploadFill></label>
              <input type='file' id="file" style={{display:"none"}} onChange={e=>setfile(e.target.files[0])}></input>
            </div>
            <div className='formInput'>
              <label>Name</label>
              <input type='text' placeholder='Enter username' value={username} onChange={e=>setUserName(e.target.value)}></input>
            </div>
            <div className='formInput'>
              <label>Age</label>
              <input type='text' placeholder='Enter age' value={Age} onChange={e=>setAge(e.target.value)}></input>
          </div>
          <div className='formInput'>
            <label>phone number</label>
            <input type='text' placeholder='Enter phone number' value={phoneNUmber} onChange={e=>setPhoneNumber(e.target.value)}></input>
          </div>
          <div className='formInput'>
            <label>gender</label>
            <select id="gender" name="gender" value={gender} onChange={e=>setGender(e.target.value)} >
             <option  disabled selected>Gender</option>
              <option value="1">Male</option>
              <option value="0">Female</option>
            </select>
          </div>
        <div className='formInput'>
            <label>Chest Pain Type</label>
                <select id="gender" name="gender" value={chestPainType} onChange={e=>setchestPainType(e.target.value)} >
                    <option  disabled selected>Chest Pain Type</option>
                    <option value="1">Typical angine</option>
                    <option value="2">Atypical angine</option>
                    <option value="3">Non angine pain</option>
                    <option value="4">Asymptomatic</option>
                </select>
        </div>

        <div className='formInput'>
        <label>Exercise Angina</label>
            <select id="gender" name="gender" value={exerciseAngina} onChange={e=>setexerciseAngina(e.target.value)} >
              <option  disabled selected>Exercise Angina</option>
                <option value="1">yes</option>
                <option value="0">No</option>
            </select>
        </div>
        
        <div className='formInput'>
          <label>Cholesterol</label>
          <input type='text' placeholder='cholesterol' value={cholesterol} onChange={e=>setcholesterol(e.target.value)}></input>
        </div>


        <div className='formInput'>
            <label>Fasting BloodSugar</label>
            <input type='text' placeholder='fastingBloodSugar' value={fastingBloodSugar} onChange={e=>setfastingBloodSugar(e.target.value)}></input>
        </div>

        <div className='formInput'>
            <label>doctor</label>
            <select id="Doctor" name="Doctor" value={doctorId} onChange={e=>setDoctorId(e.target.value)} >
              <option  disabled selected>doctor</option>
              <option disabled></option>
              {records}
            </select>
          </div>

        <div className='formInput'>
            <label>Patient description</label>
            <input type='text' placeholder='description' value={description} onChange={e=>setdescription(e.target.value)}></input>
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

export default EditPatient;
