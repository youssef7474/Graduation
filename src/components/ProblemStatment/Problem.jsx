import React, { useEffect } from 'react';
import"./Problem.css"
import Aos from 'aos';
import "aos/dist/aos.css"


const Problem = () => {

  useEffect(()=>{
    Aos.init({duration: 2000});
  },[])


  return (
    <div>
    <div class="contact" data-aos="fade-up">
    <div class="container">
      <h2 class="special-heading">Problem statement</h2>
      <div class="info">
        <p class="label">Hospitals are expected to provide patients with high-quality healthcare services, but this is hindered by a shortage of doctors, which is a major issue in most healthcare facilities. The significant difference between the number of doctors available and the number of patients to be attended to results in doctors being overburdened, which negatively impacts patient care. In addition, managing patients' sudden critical states is challenging for medical staff as there is no way to predict their condition in advance..</p>
      </div>
    </div>
  </div>
    </div>
  );
}

export default Problem;
