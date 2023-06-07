import React, { useEffect, useState } from 'react';
import "./PatientStat.css"
import {MdOutlinePendingActions} from "react-icons/md"
import {TbHeartRateMonitor} from "react-icons/tb"
import { FaHeartbeat } from 'react-icons/fa';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../Firebase/FireBase';
import { AiFillHome } from 'react-icons/ai';
import { BsHospital } from 'react-icons/bs';

const PatientStat = () => {

    const [PatientsNumber,setPatientsNumber]=useState("0")

    const [pindingNumber,setpindingNumber]=useState("0")
    const [pindingprecentage,setpindingprecentage]=useState(0)

    const [riskNumber,setpriskNumber]=useState("0")
    const [riskprecentage,setriskprecentage]=useState(0)

    const [healthyNumber,sethealthyNumber]=useState("0")
    const [Healthyprecentage,setHealthyprecentage]=useState(0)

    const [homeNumber,sethomeNumber]=useState("0")
    const [homeprecentage,sethomeprecentage]=useState(0)

    
    const [hospitalNumber,sethospitalNumber]=useState("0")
    const [hospitalprecentage,sethospitalprecentage]=useState(0)


    useEffect(()=>{
        const fetchData=async()=>{

            const petientData = await getDocs(collection(db, "patients"));
            setPatientsNumber(petientData.docs.length)

            const pindingQuery=query(collection(db,"patients"),where("prediction" ,"==",null))
            const pindingData=await getDocs(pindingQuery)
            setpindingNumber(pindingData.docs.length)


            const precetagePinding=((pindingData.docs.length/petientData.docs.length)*100)
            setpindingprecentage(precetagePinding)

            const heartAtRiskQuery=query(collection(db,"patients"),where("prediction" ,"==","heart at risk"))
            const RiskData=await getDocs(heartAtRiskQuery)
            setpriskNumber(RiskData.docs.length)

            const precetageRisk=((RiskData.docs.length/petientData.docs.length)*100)
            setriskprecentage(precetageRisk)

            const HealtyHeartQuery=query(collection(db,"patients"),where("prediction" ,"==","healthy heart"))
            const healthyData=await getDocs(HealtyHeartQuery)
            sethealthyNumber(healthyData.docs.length)

            const precetageHealthy=((healthyData.docs.length/petientData.docs.length)*100)
            setHealthyprecentage(precetageHealthy)
         

            
            const homePatientstQuery=query(collection(db,"patients"),where("atHome" ,"==",true))
            const homeData=await getDocs(homePatientstQuery)
            sethomeNumber(homeData.docs.length)

            const precetagehome=((homeData.docs.length/petientData.docs.length)*100)
            sethomeprecentage(precetagehome)

            const hospitalPatientstQuery=query(collection(db,"patients"),where("atHome" ,"==",false))
            const hospitalData=await getDocs(hospitalPatientstQuery)
            sethospitalNumber(hospitalData.docs.length)

            const precetagehospital=((hospitalData.docs.length/petientData.docs.length)*100)
            sethospitalprecentage(precetagehospital)

        
        }
        fetchData()
    },[])





  return (
    <div class="targets p-20 bg-white rad-10">
    <h2 class="mt-0 mb-10">patient's Statistics</h2>
    <p class="mt-0 mb-20 c-grey fs-15">Number of patients in the system is <span style={{color:"#0075ff",fontSize:"22px",fontWeight:"bold"}}>{PatientsNumber}</span></p>
 
    <div class="target-row mb-20 blue center-flex">
    <div class="icon center-flex">
        <MdOutlinePendingActions class=" c-orange" style={{fontSize:"40px"}}></MdOutlinePendingActions>
    </div>
    <div class="details">
      <span class="fs-14 c-grey">Pending patients</span>
      <span class="d-block mt-5 mb-10 fw-bold">{pindingNumber}</span>
      <div class="progress p-relative">
        <span class="bg-orange orange" style={{ width: `${pindingprecentage}%` }}>
          <span class="bg-orange ">{pindingprecentage.toFixed(1)}%</span>
        </span>
      </div>
    </div>
  </div>
    <div class="target-row mb-20 center-flex orange">
      <div class="icon center-flex">
        <TbHeartRateMonitor class="fa-solid fa-code fa-lg c-red" style={{fontSize:"40px"}}></TbHeartRateMonitor>
      </div>
      <div class="details">
        <span class="fs-14 c-grey">heart at resk Patients</span>
        <span class="d-block mt-5 mb-10 fw-bold">{riskNumber}</span>
        <div class="progress p-relative">
          <span class="bg-red red" style={{ width: `${riskprecentage}%` }} >
            <span class="bg-red">{riskprecentage.toFixed(1)}%</span>
          </span>
        </div>
      </div>
    </div>
    <div class="target-row mb-20 center-flex green">
      <div class="icon center-flex">
        <FaHeartbeat class="c-green" style={{fontSize:"40px"}}></FaHeartbeat>
      </div>
      <div class="details">
        <span class="fs-14 c-grey"> healthy heart Patients</span>
        <span class="d-block mt-5 mb-10 fw-bold">{healthyNumber}</span>
        <div class="progress p-relative">
          <span class="bg-green green" style={{ width: `${Healthyprecentage}%` }}  >
            <span class="bg-green  ">{Healthyprecentage.toFixed(1)}%</span>
          </span>
        </div>
      </div>
    </div>

    <div class="target-row mb-20 center-flex blue">
      <div class="icon center-flex">
      <AiFillHome  class="c-blue" style={{fontSize:"40px"}}></AiFillHome>
      </div>
      <div class="details">
        <span class="fs-14 c-grey">Patients at home</span>
        <span class="d-block mt-5 mb-10 fw-bold">{homeNumber}</span>
        <div class="progress p-relative">
          <span class="bg-blue blue" style={{ width: `${homeprecentage}%` }}  >
          <span class="bg-blue  ">{homeprecentage.toFixed(1)}%</span>
          </span>
        </div>
      </div>
    </div>


    <div class="target-row mb-20 center-flex orange">
    <div class="icon center-flex">
    <BsHospital class="c-orange" style={{fontSize:"40px"}}></BsHospital>
    </div>
    <div class="details">
      <span class="fs-14 c-grey">Patients at hospital</span>
      <span class="d-block mt-5 mb-10 fw-bold">{hospitalNumber}</span>
      <div class="progress p-relative">
        <span class="bg-orange orange" style={{ width: `${hospitalprecentage}%` }}  >
        <span class="bg-orange  ">{hospitalprecentage.toFixed(1)}%</span>
        </span>
      </div>
    </div>
  </div>
  </div>
  );
}

export default PatientStat;
