import React from 'react';
import HeaderOfLanding from "../../components/HeaderLanding/HeaderOfLanding"
import FooterOfLanding from '../../components/FooterOfLanding/FooterOfLanding';
import { Outlet } from 'react-router-dom';
const LandingLayOut = () => {
  return (
    <div>
        <HeaderOfLanding></HeaderOfLanding>
        <Outlet></Outlet>
        <FooterOfLanding></FooterOfLanding>
    </div>
  );
}

export default LandingLayOut;
