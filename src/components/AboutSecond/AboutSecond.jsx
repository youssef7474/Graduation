import React, { useEffect } from 'react';
import "./AboutSecond.css"
import Aos from 'aos';
import "aos/dist/aos.css"

const AboutSecond = () => {


  useEffect(()=>{
    Aos.init({duration: 2000});
  },[])

  return (
    <div>
    <div class="contact" data-aos="fade-up">
    <div class="container">
      <h2 class="special-heading">Objectives</h2>
      <div class="info">
        <p class="label">Our system would be highly beneficial in creating a more promising system for patients. The versatility of this system has the potential to benefit a large number of people. Without a convenient wireless patient monitoring system, doctors are unable to give their full attention to patients at all times.</p>
      </div>
    </div>
    </div>
    </div>
  );
}

export default AboutSecond;
