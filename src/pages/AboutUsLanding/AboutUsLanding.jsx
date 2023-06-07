import React from 'react';
import About from "../../components/About/About"
import AboutSecond from "../../components/AboutSecond/AboutSecond"
import Problem from "../../components/ProblemStatment/Problem"
import Vision from "../../components/Vision/Vision"


const AboutUsLanding = () => {
  return (
    <>
    <div>
      <Problem></Problem>
    </div>
    <div>
      <About></About>
    </div>

    <div>
      <AboutSecond></AboutSecond>
    </div>

    
    <div>
      <Vision></Vision>
    </div>
    </>
  );
}

export default AboutUsLanding;
