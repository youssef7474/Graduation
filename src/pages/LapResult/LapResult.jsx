import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import "./LapResult.css"
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../Firebase/FireBase';

const LapResult = () => {
    const detailspatient = useSelector(state => state.Users.detailspatient);
    const [Note,setNote]=useState(detailspatient.labNote);
    const [textareaDisabled, setTextareaDisabled] = useState(true);

    const patientID = useSelector(state => state.Users.patientID);

    
    const inputHandler = (e) => {
        setNote(e.target.value);
      };
      
      useEffect(() => {
        if (patientID){
            try {
                 setDoc(doc(db, "patients", patientID), {
                    ...detailspatient,
                    labNote:Note
                  });        
            } catch (error) {
                toast.error("error")
            }
        }
      }, [Note,patientID,detailspatient]);

    const handleEditNote = () => {
        setTextareaDisabled(!textareaDisabled);
      }

     /* const inputHandler=async (e)=>{
        setNote(e.target.value)
        try {
            await setDoc(doc(db, "patients", patientID), {
                ...detailspatient,
                labNote:Note
              });        
        } catch (error) {
            toast.error("error")
        }
      }*/
    //<span class="c-grey"  style={{ maxWidth: '80%', wordWrap: 'break-word' }}>{detailspatient.labNote ? detailspatient.labNote   : ' No notes on this lap result yet'}</span>

  return (
    <>
    <div>
    <ToastContainer></ToastContainer>
    <div>
    <h1 class="p-relative" style={{marginLeft:"20px"}}>Patient details</h1>
    <div class="profile">
        <div class="friends-page  m-20 gap-20">
            <div class="friend bg-white rad-6 p-20 p-relative">
                <div class="txt-c" >
                    <img src={detailspatient.image} alt="img" class="rad-half mt-10 mb-10 " style={{width:"100px"}}></img>
                    <h4 class="m-0">{detailspatient.name}</h4>
                </div>
                <div class="icon fs-14 p-relative">

                    <div class="p-20" style={{borderBottom: "1px solid #eee"}} >
                      <span style={{color:"#0075ff" ,fontSize:"15px"}} >lab Result : </span>
                      {detailspatient.labResults ? <img src={detailspatient.labResults} alt="img"  className='labimage' ></img>: ' No lap Results found yet'}
                      
                      </div> 

                </div>
                
                
                <div class="info between-flex fs-13">
                    <textarea disabled={textareaDisabled} class="main-input" style={{width:"80%", border:"none",borderBottom:"1px solid gray",resize: "none"}}  placeholder="No notes on this lap result yet" value={Note}  onChange={inputHandler}></textarea>
                    <div>
                        <button style={{border:"none"}} onClick={handleEditNote}  className={` btn-shape c-white ${textareaDisabled ? 'bg-orange ' : 'bg-green' }`}>
                        {textareaDisabled ? 'Edit note' : 'Save note'}
                    </button>
                    </div>
                </div>
            </div>
        </div>
    </div>



    </div>
    </div>
    </>
  );
}

export default LapResult;
