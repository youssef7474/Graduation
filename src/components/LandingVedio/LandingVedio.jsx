import React from 'react';
import heartvedio from "../../assets/vecteezy_electrocardiogram-of-heart-rate-on-a-black-screen_15125874_831.mov"
import "./LandingVedio.css"

const LandingVedio = () => {
  return (
    <div>
        <div class="vedio">
            <video src={heartvedio} autoPlay={true} loop muted></video>
            <div class="text">
                <h1 style={{color:"#0075ff",marginBottom:"30px"}}>Magna</h1>
                <h2>Patient Monitoring <span style={{color:"#0075ff"}}>Cardiovascular</span> System</h2>
          </div>
        </div>
    </div>
  );
}

export default LandingVedio;
