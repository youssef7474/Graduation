import React, { useEffect, useState } from 'react';
import "./Widget.css"
import {BsPersonFill} from "react-icons/bs"
import {FaUserNurse,FaHandHoldingMedical, FaPercentage} from "react-icons/fa"
import {GiMedicalDrip} from "react-icons/gi"
import { useNavigate } from 'react-router-dom';
import {db} from "../../Firebase/FireBase.js"
import { collection, getDocs, query, where } from "firebase/firestore"

const Widget = ({type}) => {
    let data;
    const navigate =useNavigate();
    const [usersNumber,setUsersNumbers]=useState("0")
    const [DoctorsNumber,setDoctorsNumber]=useState("0")
    const [Doctorsprecentage,setDoctorsprecentage]=useState(0)
    const [NursesNumber,setNursesNumber]=useState("0")
    const [Nurseprecentage,setNurseprecentage]=useState(0)
    const [PatientsNumber,setPatientsNumber]=useState("0")
    const [patientprecentage,setpatientprecentage]=useState(0)

    switch(type)
    {
        case"user":
            data={
                title:"All users",
                precentage:"100",
                counter:usersNumber,
                link:"view admin profile",
                naigateLink:"/admin/Profile",
                icon:<BsPersonFill className='icon' onClick={()=>navigate(data.naigateLink)}></BsPersonFill>
            };
            break;
            case"Doctor":
            data={
                title:"All Doctors",
                precentage:Doctorsprecentage.toFixed(1),
                counter:DoctorsNumber,
                link:"view all doctors",
                naigateLink:"/admin/doctors",
                icon:<FaUserNurse className='icon' onClick={()=>navigate(data.naigateLink)}></FaUserNurse>
            };
            break;
            case"nurses":
            data={
                title:"All nurses",
                precentage:Nurseprecentage.toFixed(1),
                counter:NursesNumber,
                link:"view all nurses",
                naigateLink:"/admin/Nurses",
                icon:<FaHandHoldingMedical className='icon' onClick={()=>navigate(data.naigateLink)}></FaHandHoldingMedical>
            };
            break;
            case"patients":
            data={
                title:"All patients",
                precentage:patientprecentage.toFixed(1),
                counter:PatientsNumber,
                link:"view all patients",
                naigateLink:"/admin/Patients",
                icon:<GiMedicalDrip className='icon' onClick={()=>navigate(data.naigateLink)}></GiMedicalDrip>
            };
            break;
        default:
            break;
            
    }




    useEffect(()=>{
        const fetchData=async()=>{
            const NursesQuery=query(collection(db,"users"),where("role" ,"==","Nurse"))
            const NurseData=await getDocs(NursesQuery)
            setNursesNumber(NurseData.docs.length)


            const DoctorsQuery=query(collection(db,"users"),where("role" ,"==","Doctor"))
            const DoctorData=await getDocs(DoctorsQuery)
            setDoctorsNumber(DoctorData.docs.length)

            const petientData = await getDocs(collection(db, "patients"));
            setPatientsNumber(petientData.docs.length)

            const Allusers=(NurseData.docs.length+DoctorData.docs.length+petientData.docs.length)
            setUsersNumbers(Allusers)


            const precetageDoctors=((DoctorData.docs.length/Allusers)*100)
            setDoctorsprecentage(precetageDoctors)

            const precetageNurse=((NurseData.docs.length/Allusers)*100)
            setNurseprecentage(precetageNurse)

            const precetagepatient=((petientData.docs.length/Allusers)*100)
            setpatientprecentage(precetagepatient)
        }
        fetchData()
    },[])



  return (
    <div className='widget bg-white rad-6 p-20'>
        <div className='left'>
            <span className='title'>{data.title}</span>
            <span className='counter'>{data.counter}</span>
            <span className='link' onClick={()=>navigate(data.naigateLink)}  >{data.link}</span>
        </div>
        <div className='right'>
            <div className='precentage nigtive'>
                {data.precentage}
                <FaPercentage style={{marginLeft:"5px"}}></FaPercentage>
            </div>
            {data.icon}
        </div>
    </div>
  );
}

export default Widget;
