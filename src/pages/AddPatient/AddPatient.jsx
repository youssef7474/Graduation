import React, { useEffect, useState } from 'react';
import{BsFillCloudUploadFill} from"react-icons/bs"
import {storage} from "../../Firebase/FireBase.js"
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useDispatch, useSelector } from 'react-redux';
import {Addpatient} from "../../State/UserSlice" 
import { ToastContainer, toast } from 'react-toastify';
import {fetshdoctors} from "../../State/UserSlice"
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../Firebase/FireBase.js';


const AddPatient = () => {

    const [file,setfile]=useState("");
    const [username,setUserName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [Cpassword,setCPassword]=useState("");
    const [Age,setAge]=useState("");
    const [phoneNumber,setPhoneNumber]=useState("")
    const [gender,setGender]=useState()
    const [chestPainType,setchestPainType]=useState()
    const [cholesterol,setcholesterol]=useState("")
    const [exerciseAngina,setexerciseAngina]=useState()
    const [fastingBloodSugar,setfastingBloodSugar]=useState("")
    const [description,setdescription]=useState("")
    const [url,seturl]=useState("")
    const [doctorId,setDoctorId]=useState()
    
 

    const dispatch = useDispatch();


   

    const fetchdoctorNmae=async(doctorId)=>{
    const docRef = doc(db, "users", doctorId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return(docSnap.data().name);
    }
    else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    }

    
    var DoctorName; 
    var namedoctor;
    if(doctorId!==undefined)
    {
      DoctorName=fetchdoctorNmae(doctorId)
      DoctorName.then(result => {
        namedoctor = result;
      });
    }else{
      console.log("wait")
    }





    var fastingBloodSugarML;
    if(fastingBloodSugar>=120)
    {
      fastingBloodSugarML="1"
    }else
    {
      fastingBloodSugarML="0"
    }



    var data={
        name:username,
        email:email,
        password:password,
        age:Age,
        phone:phoneNumber,
        gender:gender,
        chestPainType:chestPainType,
        cholesterol:cholesterol,
        exerciseAngina:exerciseAngina,
        fastingBloodSugar:fastingBloodSugar,
        description:description,
        image:url,
        doctorId:doctorId,
        fastingBloodSugarML:fastingBloodSugarML,
    }


    const addHandler=(e)=>{
        e.preventDefault();

      if(username.length!==0)
      {

        if(Age.length!==0)
        {
          if(phoneNumber.length===11)
          {
            if(gender!==undefined)
            {
              if(chestPainType!==undefined)
              {
                if(cholesterol.length!==0)
                {
                  if(exerciseAngina!==undefined){
                    if(fastingBloodSugar.length!==0)
                    {
                      if(description.length!==0)
                      {
                        if(doctorId!==undefined)
                        {
                          if(email.length>0)
                          {
                            if(password.length!==0&&password===Cpassword)
                            {
                              data={...data , NameDoctorName:namedoctor,email:email,password:password}
                              try {
                              dispatch(Addpatient(data))
                              } catch (error) {
                              toast.error(error)
                              }
                            }else{
                              toast.error("password does not match")
                            }
                          }else{
                            toast.error("please enter email first")
                          }
                        }else{
                          toast.error("please chosse the doctor")
                        }
                      }
                      else{
                        toast.error("please enter patient description")
                      }
                    }else{
                      toast.error("please enter fasting blood sugar value")
                    }
                  }else{
                    toast.error("please chosse exercise angina ")
                  }
                }else{
                  toast.error("please enter cholesterol value")
                }
              }else{
                toast.error("please chosse chest pain type ")
              }
            }else{
              toast.error("please chosse patient gender")
            }
          }
          else{
            toast.error("phone number must be 11 number ")
          }
        }
        else{
          toast.error("please enter patient age ")
        }
      /*  try {
          dispatch(Addpatient(data))
          navigate("/admin/Patients")
          
        } catch (error) {
          toast.error(error)
        }  */  
      } 
      else{
        toast.error("please enter patient name ")
      }
        
    }



    useEffect(()=>{
      try {
          dispatch(fetshdoctors())
          
      } catch (error) {
          toast.error(error)
      }
  },[dispatch])
    



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
        <h1>Add new patient</h1>
      </div>

      <div className='bootom bg-white rad-6 p-20'>
        <div className='left'>
          <img src={file?URL.createObjectURL(file):'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'} alt='img'></img>
        </div>
        <div className='right'>
          <form onSubmit={addHandler}>
            <div className='formInput'>
              <label htmlFor="file">Image: <BsFillCloudUploadFill className="uploadIcon"></BsFillCloudUploadFill></label>
              <input type='file' id="file" style={{display:"none"}} onChange={e=>setfile(e.target.files[0])}></input>
            </div>
            <div className='formInput'>
              <label>Name</label>
              <input type='text' placeholder='Enter username' onChange={e=>setUserName(e.target.value)}></input>
            </div>


            <div className='formInput'>
              <label>Patient Email</label>
              <input type='email' placeholder='Enter email' onChange={e=>setEmail(e.target.value)}></input>
            </div>


            <div className='formInput'>
              <label>password</label>
              <input type='password' placeholder='Enter user password'onChange={e=>setPassword(e.target.value)}></input>
              </div>

            <div className='formInput'>
              <label>confirm password</label>
              <input type='password' placeholder='confirme password' onChange={e=>setCPassword(e.target.value)}></input>
              </div>



            <div className='formInput'>
              <label>Age</label>
              <input type='text' placeholder='Enter age' onChange={e=>setAge(e.target.value)}></input>
          </div>
          <div className='formInput'>
            <label>phone number</label>
            <input type='text' placeholder='Enter phone number'onChange={e=>setPhoneNumber(e.target.value)}></input>
          </div>
          <div className='formInput'>
            <label>gender</label>
            <select id="gender" name="gender" onChange={e=>setGender(e.target.value)} >
              <option  disabled selected>Gender</option>
              <option value="1">Male</option>
              <option value="0">Female</option>
            </select>
          </div>
        <div className='formInput'>
            <label>Chest Pain Type</label>
                <select id="gender" name="gender" onChange={e=>setchestPainType(e.target.value)} >
                    <option  disabled selected>Chest Pain Type</option>
                    <option value="1">Typical angine</option>
                    <option value="2">Atypical angine</option>
                    <option value="3">Non angine pain</option>
                    <option value="4">Asymptomatic</option>
                </select>
        </div>

        <div className='formInput'>
        <label>Exercise Angina</label>
            <select id="gender" name="gender" onChange={e=>setexerciseAngina(e.target.value)}  >
              <option  disabled selected>Exercise Angina</option>
                <option value="1">yes</option>
                <option value="0">No</option>
            </select>
        </div>
        
        <div className='formInput'>
          <label>Cholesterol</label>
          <input type='text' placeholder='cholesterol' onChange={e=>setcholesterol(e.target.value)}></input>
        </div>


        <div className='formInput'>
            <label>Fasting BloodSugar</label>
            <input type='text' placeholder='fastingBloodSugar' onChange={e=>setfastingBloodSugar(e.target.value)}></input>
        </div>

        <div className='formInput'>
            <label>doctor</label>
            <select id="Doctor" name="Doctor" onChange={e=>setDoctorId(e.target.value)}  >
              <option  disabled selected>choose doctor</option>
              {records}
            </select>
          </div>

        <div className='formInput'>
            <label>Patient description</label>
            <input type='text' placeholder='description' onChange={e=>setdescription(e.target.value)}></input>
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

export default AddPatient;
