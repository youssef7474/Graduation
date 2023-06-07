import React, { useEffect } from 'react';
import visionImage from"../../assets/landing-image.png"
import "./Vision.css"
import Aos from 'aos';
import "aos/dist/aos.css"

const Vision = () => {


  useEffect(()=>{
    Aos.init({duration: 2000});
  },[])


  return (
    <div>
    <div class="about">
    <div class="container">
      <h2 class="special-heading" >Vision & Mission</h2>
      <div class="about-content">
        <div class="text" data-aos="fade-left" >
          <p style={{color:"#0075ff",fontWeight:"normal"}}>
          Vision: To be at the forefront of revolutionizing the diagnosis and monitoring of cardiovascular
          diseases by providing accurate and timely information to medical staff.
          <br></br>
          Mission: 
          Our mission is to develop and maintain a system that aids cardiologists in diagnosing and monitoring CVDs by offering accurate and timely diagnosis and warnings. We aim to continuously improve our system's predictive capabilities to assess a patient's future vital state based on previous readings, ultimately improving patient outcomes and quality of life.
          </p>
        </div>
        <div class="image1" data-aos="fade-right">
            <img decoding="async" src={visionImage} alt="" />
        </div>
      </div>
    </div>
  </div>
    </div>
  );
}

export default Vision;
