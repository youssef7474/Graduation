import React, { useEffect } from 'react';
import "./About.css"
import logoImage from "../../assets/MAGNA.jpg"
import Aos from 'aos';
import "aos/dist/aos.css"


const About = () => {


  useEffect(()=>{
    Aos.init({duration: 2000});
  },[])


  return (
    <div>
    <div class="about" >
    <div class="container">
      <h2 class="special-heading" >About</h2>
      <div class="about-content">
        <div class="image1" data-aos="fade-right">
          <img decoding="async" src={logoImage} alt="" />
        </div>
        <div class="text" data-aos="fade-left">
          <p style={{color:"#0075ff", fontSize:"18px" ,fontWeight:"normal"}}>
          The system comprises two primary components, namely hardware and software. The hardware component includes sensors capable of measuring various inputs such as ECG, heart rate, oxygen percentage in the blood, and temperature. The software component processes these readings and displays
           the patient's data on a web or mobile application. Overall, this wireless patient monitoring system offers an essential tool for improving the diagnosis and management of CVDs, ultimately contributing to better patient outcomes.
           The system's primary function is to aid cardiologists in diagnosing and monitoring CVDs by offering accurate and timely diagnosis and warnings to medical staff. Additionally,
            the system's predictive capabilities allow for the assessment of a patient's future vital state based on previous readings.
          </p>
        </div>
      </div>
    </div>
  </div>
    </div>
  );
}

export default About;
