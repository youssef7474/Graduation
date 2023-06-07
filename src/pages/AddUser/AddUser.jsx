import { useEffect, useState } from "react";
import "./AddUser.css"
import{BsFillCloudUploadFill} from"react-icons/bs"
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from "react-redux";
import {AddUseracount} from "../../State/UserSlice" 
import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {storage} from "../../Firebase/FireBase.js"



const AddUser = () => {

  const [file,setfile]=useState("");
  const [email,setEmail]=useState("");
  const [username,setUserName]=useState("");
  const [phoneNUmber,setPhoneNumber]=useState("");
  const [role,setrole]=useState();
  const [password,setPassword]=useState("");
  const [Cpassword,setCPassword]=useState("");
  //const [age,setage]=useState("");
  const [url,seturl]=useState("")
  const dispatch = useDispatch();

  

  const data=
  {
    email:email,
    username:username,
    phoneNUmber:phoneNUmber,
    role:role,
    password:password,
    Cpassword:Cpassword,
  //  age:age,
    img:url
  }


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
    if(email.length>0)
    {
      if(username.length!==0)
      {
        if(password.length!==0&&password===Cpassword)
        {
          if(role!==undefined)
          {
            if(phoneNUmber.length===11)
            {
              try {
                dispatch(AddUseracount(data))
                
              } catch (error) {
                toast.error(error)
              }  
            }
            else{
              toast.error("phone number must be 11 number")
            }
          }
          else{
            toast.error("please choose a role first")
          }
        }
        else{
          toast.error("password does not match")
        }
      }
      else{
        toast.error("please enter user name")
      }
    }
    else{
      toast.error("please enter email first")
    }
   /* if(password===Cpassword)
    {
      if(role!==undefined)
      {
        try {
          dispatch(AddUseracount(data))
          
        } catch (error) {
          toast.error(error)
        }    
      } 
      else{
        toast.error("please choose a role first")
      }
    }
    else
    {
      toast.error("password does not match")
    }*/

  }






  return (
    <>
    <ToastContainer />
    <div className='content-Contanier'>
     
      <div className='top '>
        <h1>Add new user</h1>
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
              <label>UserName</label>
              <input type='text' placeholder='Enter username' onChange={e=>setUserName(e.target.value)}></input>
            </div>
            <div className='formInput'>
              <label>Email</label>
              <input type='email' placeholder='Enter email' onChange={e=>setEmail(e.target.value)}></input>
          </div>
          <div className='formInput'>
            <label>Password</label>
            <input type='password' placeholder='Enter user password'onChange={e=>setPassword(e.target.value)}></input>
          </div>
          <div className='formInput'>
            <label>Role</label>
            <select id="Role" name="Role" onChange={e=>setrole(e.target.value)}>
              <option  disabled selected>User Role</option>
              <option value="Admin">Admin</option>
              <option value="Doctor">Doctor</option>
              <option value="Nurse">Nurse</option>
            </select>
          </div>
          <div className='formInput'>
            <label>Confirm Password</label>
            <input type='password' placeholder='confirme password' onChange={e=>setCPassword(e.target.value)}></input>
          </div>
          <div className='formInput'>
          <label>Phone Number</label>
          <input type='text' placeholder='Enter phone Number' onChange={e=>setPhoneNumber(e.target.value)}></input>
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

export default AddUser;
