import { doc, getDoc, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { db } from '../../Firebase/FireBase';








const Details = () => {
  const detailspatient = useSelector(state => state.Users.detailspatient);
  const patientID = useSelector(state => state.Users.patientID);
  const [ATHOME, setAtHome] = useState(); // initialize the state variable to true


  useEffect(()=>{
    const fetchData=async()=>{
      try {
        const docRef = doc(db, "patients", patientID);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
  
          //console.log(patientID)
          //console.log(docSnap.data())
          setAtHome(docSnap.data().atHome)
          console.log(ATHOME)
        }
        else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
          }
  
          
      } catch (error) {
        console.log(error.message);
        throw error;
      }
    }
    fetchData()
  },[patientID,ATHOME])

  const navigate = useNavigate();

  //const patientID = useSelector(state => state.Users.patientID);

/*if(patientID!==null){
  const unsub = onSnapshot(doc(db, "patients", patientID), (doc) => {
    console.log("Current data: ", doc.data());
});

  return () => {
    unsub();
  };
}*/

/*if (patientID!==null)
{
  try {
    
  const unsub = onSnapshot(doc(db, "patients", patientID), (doc) => {
    setPatientData(null)
    setPatientData(doc.data())
    console.log(patientData)
});
return () => {
  unsub();
};
  } catch (error) {
    
  }

}
else{
  console.log("wait")
}*/


  /*useEffect( () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // wait for initial data to be fetched
      const unsub = onSnapshot(doc(db, "patients", "patientID"), (doc) => {
        console.log("Current data: ", doc.data());
    });
    
      return () => {
        unsub();
      };
    } catch (error) {
      
    }
   
  }, [ patientID]);*/


  

  const atHomeToggle = async () => {
    // toggle the state variable
    try {
      await setDoc(doc(db, "patients", patientID), {
          ...detailspatient,
          atHome:!ATHOME
        });
        setAtHome(!ATHOME);
        toast.success("loading please wait ..")
        toast.success("success")
  
  } catch (error) {
      toast.error("error")
  }

  };
  /*try {
    await setDoc(doc(db, "patients", patientID), {
        ...detailspatient,
        atHome:ATHOME
      });
      toast.success("loading please wait ..")
      toast.success("success")

} catch (error) {
    toast.error("error")
}*/


 const lapresultnav=()=>{
  navigate("/admin/lapResults")
 }

 const Editnav=()=>{
  navigate("/admin/EditPatient")
 }

  var Records;
  if(detailspatient!=null)
  {


    
    var chestPainTypestring;
    chestPainTypestring=detailspatient.chestPainType
    if(detailspatient.chestPainType ==="1")
    {
      chestPainTypestring="Typical angine"

    }
    else if(detailspatient.chestPainType ==="2"){
      chestPainTypestring="Atypical angine"

    }
    else if(detailspatient.chestPainType ==="3"){
      chestPainTypestring="Non angine pain"

    }
    else if(detailspatient.chestPainType ==="4"){
      chestPainTypestring="Asymptomatic"
    }

    var exerciseAnginastring ;
    exerciseAnginastring=detailspatient.exerciseAngina
    if(detailspatient.exerciseAngina ==="1")
    {
      exerciseAnginastring="yes"

    }
    else if(detailspatient.exerciseAngina ==="0"){
      exerciseAnginastring="No"
    }

    var genderstring ;
    genderstring=detailspatient.gender
    if(detailspatient.gender ==="1")
    {
      genderstring="male"

    }
    else if(detailspatient.gender ==="0"){
      genderstring="female"
    }

    


    //toast.success("loading...")
    Records=
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
                      <span style={{color:"#0075ff" ,fontSize:"15px"}} >patient Email : </span>
                      <span  style={{marginLeft:"10px",fontSize:"15px"}}>{detailspatient.email}</span>
                    </div>  

                    <div class="p-20" style={{borderBottom: "1px solid #eee"}} >
                        <span style={{color:"#0075ff" ,fontSize:"15px"}} >Contact number : </span>
                        <span  style={{marginLeft:"10px",fontSize:"15px"}}>{detailspatient.phone}</span>
                    </div>   
                    
                    <div class="p-20" style={{borderBottom: "1px solid #eee"}} >
                      <span style={{color:"#0075ff" ,fontSize:"15px"}} >Age : </span>
                      <span  style={{marginLeft:"10px",fontSize:"15px"}}>{detailspatient.age}</span>
                    </div> 


                    <div class="p-20" style={{borderBottom: "1px solid #eee"}} >
                      <span style={{color:"#0075ff" ,fontSize:"15px"}} > Home service: </span>
                      <span className={`label btn-shape c-white ${ATHOME ? 'bg-green' :  'bg-red' }`}  style={{marginLeft:"10px",fontSize:"15px",cursor:"pointer"}}  onClick={atHomeToggle}>
                        {ATHOME ? "Activated" : 'Deactivated'}
                      </span>
                    </div>

                    <div class="p-20" style={{borderBottom: "1px solid #eee"}} >
                      <span style={{color:"#0075ff" ,fontSize:"15px"}} >chestPainType : </span>
                      <span  style={{marginLeft:"10px",fontSize:"15px"}}>{chestPainTypestring}</span>
                    </div> 

                    <div class="p-20" style={{borderBottom: "1px solid #eee"}} >
                      <span style={{color:"#0075ff" ,fontSize:"15px"}} >cholesterol : </span>
                      <span  style={{marginLeft:"10px",fontSize:"15px"}}>{detailspatient.cholesterol}</span>
                    </div> 

                    <div class="p-20" style={{borderBottom: "1px solid #eee"}} >
                      <span style={{color:"#0075ff" ,fontSize:"15px"}} >exerciseAngina : </span>
                      <span  style={{marginLeft:"10px",fontSize:"15px"}}>{exerciseAnginastring}</span>
                    </div> 

                    <div class="p-20" style={{borderBottom: "1px solid #eee"}} >
                      <span style={{color:"#0075ff" ,fontSize:"15px"}} >fastingBloodSugar : </span>
                      <span  style={{marginLeft:"10px",fontSize:"15px"}}>{detailspatient.fastingBloodSugar}</span>
                    </div> 

                    <div class="p-20" style={{borderBottom: "1px solid #eee"}} >
                      <span style={{color:"#0075ff" ,fontSize:"15px"}} >Gender : </span>
                      <span  style={{marginLeft:"10px",fontSize:"15px"}}>{genderstring}</span>
                    </div> 

                    <div class="p-20" style={{borderBottom: "1px solid #eee"}} >
                      <span style={{color:"#0075ff" ,fontSize:"15px"}} >max_heart_rate : </span>
                      <span  style={{marginLeft:"10px",fontSize:"15px"}}>{detailspatient.maxHeartRate?detailspatient.maxHeartRate:"maxHeartRate not found yet"}</span>
                    </div>

                    <div class="p-20" style={{borderBottom: "1px solid #eee"}} >
                      <span style={{color:"#0075ff" ,fontSize:"15px"}} >resting_ecg : </span>
                      <span  style={{marginLeft:"10px",fontSize:"15px"}}> {detailspatient.ecg?detailspatient.ecg:"ecg not found yet"}</span>
                    </div>

                    <div class="p-20" style={{borderBottom: "1px solid #eee"}} >
                      <span style={{color:"#0075ff" ,fontSize:"15px"}} >description : </span>
                      <span  style={{marginLeft:"10px",fontSize:"15px",wordWrap:"break-word"}}>{detailspatient.description}</span>
                    </div>

                    
                    <div class="p-20" style={{borderBottom: "1px solid #eee"}} >
                      <span style={{color:"#0075ff" ,fontSize:"15px"}} >prediction : </span>
                      <span className={`label btn-shape c-white ${detailspatient.prediction === 'healthy heart' ? 'bg-green' : detailspatient.prediction === 'heart at risk' ? 'bg-red' : 'bg-orange'}`}>
                      {detailspatient.prediction ? detailspatient.prediction : 'prediction not found yet'}
                      </span>
                    </div>

                    <div class="p-20" style={{borderBottom: "1px solid #eee"}} >
                      <span style={{color:"#0075ff" ,fontSize:"15px"}} >doctorId : </span>
                      <span  style={{marginLeft:"10px",fontSize:"15px"}}>{detailspatient.doctorId}</span>
                    </div>

                    <div class="p-20" style={{borderBottom: "1px solid #eee"}} >
                      <span style={{color:"#0075ff" ,fontSize:"15px"}} >Doctor Name : </span>
                      <span  style={{marginLeft:"10px",fontSize:"15px"}}>{detailspatient.doctorName}</span>
                    </div>

                  

                    <div class="p-20" style={{borderBottom: "1px solid #eee"}} >
                      <span style={{color:"#0075ff" ,fontSize:"15px"}} >Lab Results : </span>
                      <span className={`label btn-shape c-white ${detailspatient.labResults ? 'bg-green' :  'bg-red' }`}  style={{marginLeft:"10px",fontSize:"15px",border:"none" , cursor: "pointer" }} onClick={lapresultnav} >
                          {detailspatient.labResults ? "show " : ' No lap Results found yet'}
                      </span>
                    </div>

                  

                </div>
                
                <div class="info between-flex fs-13">
                    <span class="c-grey">joined : 2023</span>
                    <div>
                        <button style={{border:"none"}}  class="bg-red c-white btn-shape" onClick={Editnav}>Edit info </button>
                    </div>
                </div>
            </div>
        </div>
    </div>



    </div>
  }
  else
  {
    toast.success("loading please wait...");
  }
  
  //cursor: detailspatient.labResults ? 'pointer' : 'not-allowed',
  return (
    <div>
    <ToastContainer></ToastContainer>
    {Records}
    </div>
    
  );
}

export default Details;
