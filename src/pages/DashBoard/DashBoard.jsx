import React from 'react';
import Widget from "../../components/Widget/Widget"
import "./DashBoard.css"
import TablePatient from "../../components/TablePatients/TablePatient"
import PatientStat from "../../components/PatientStat/PatientStat"
const DashBoard = () => {

  return (
    <>
    <div className='widgets'>
      <Widget type="user"></Widget>
      <Widget type="Doctor"></Widget>
      <Widget type="nurses"></Widget>
      <Widget type="patients"></Widget>
    </div>

    <div>
      <PatientStat></PatientStat>
    </div>
    
    <div>
      <TablePatient></TablePatient>
    </div>
    </>
  );
}

export default DashBoard;
