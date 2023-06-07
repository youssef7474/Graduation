import React from 'react';
import "./ThreeCompo.css"
import MlImage from "../../assets/ml.jpeg"
import SWImage from "../../assets/code.jpg"
import hardwearImage from "../../assets/hardwear.jpeg"
const ThreeCompo = () => {
  return (




    <div class="Portfolio" id="Portfolio">
        <div class="contanier">
            <div class="main-heading">
                <h2>Project components</h2>
                <p>Experience the power of machine learning, software, and hardware integration in our cutting-edge projects.</p>
            </div>
        <div class="image-container">
            <div class="box">
            <img src={MlImage} alt='image'></img>
                <div class="caption">
                    <h4 style={{color:"#0075ff"}}>Machine learning </h4>
                    <p style={{fontWeight:"bold"}}>Prediction</p>
                </div>
            </div>
            <div class="box">
            <img src={SWImage} alt='image' style={{height:"160px",width:"300px"}}></img>
                <div class="caption">
                <h4 style={{color:"#0075ff"}}>Software</h4>
                <p style={{fontWeight:"bold"}}>Monitoring </p>
                </div>
            </div>
            <div class="box">
            <img src={hardwearImage} alt='image' style={{height:"160px",width:"300px"}}></img>
                <div class="caption">
                    <h4 style={{color:"#0075ff"}}>Hardwear</h4>
                    <p style={{fontWeight:"bold"}}>Sensors Reading</p>
                </div>
            </div>

        </div>
        </div>
    </div>







  );
}

export default ThreeCompo;
