import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import { Provider } from 'react-redux';
import store from "./State";





import RootLayOut from './pages/RootLayOut/RootLayOut';
import DashBoard from"./pages/DashBoard/DashBoard.jsx"
import Doctor from "./pages/Doctors/Doctor.jsx"
import Nurses from "./pages/Nurses/Nurses.jsx"
import Profile from "./pages/Profile/Profile.jsx"
import AllPatients from "./pages/Patients/AllPatients.jsx"
import LandingLayOut from './pages/LandingLayOut/LandingLayOut';
import HomeLanding from "./pages/HomeLanding/HomeLanding.jsx"
import AboutUsLanding from "./pages/AboutUsLanding/AboutUsLanding.jsx"
import LoginAdmin from "./pages/LoginAdmin/LoginAdmin.jsx"
import Details from "./pages/Details/Details.jsx"
import Edit from "./pages/Edit/Edit.jsx"
import ErrorPage from "./pages/ErrorPage/ErrorPage.jsx"
import RequiredAuth from "./pages/RequiredAuth/RequiredAuth.jsx"
import AddUser from "./pages/AddUser/AddUser.jsx"
import AddPatient from "./pages/AddPatient/AddPatient.jsx"
import UserDetail from "./pages/UserDetail/UserDetail.jsx"
import DoctorPatients from "./pages/DoctorPatients/DoctorPatients.jsx"
import UserEdit from "./pages/UserEdit/UserEdit.jsx"
import EditPatient from "./pages/EditPatient/EditPatient.jsx"
import LapResult from "./pages/LapResult/LapResult.jsx"




const router =createBrowserRouter([
  {
    path:"/",element:<LandingLayOut></LandingLayOut>
    ,
    errorElement:<ErrorPage></ErrorPage>
    ,
    children:
    [
      {
        index:true,element:<HomeLanding></HomeLanding>
      }
      ,
      {
        path:"home",element:<HomeLanding></HomeLanding>
      }
      ,
      {
        path:"AboutUs",element:<AboutUsLanding></AboutUsLanding>
      }
      ,
      {
        path:"Login",element:<LoginAdmin></LoginAdmin>
      }
    ]
  }
  ,
  {
    path:"/admin",element:
    <RequiredAuth>
      <RootLayOut></RootLayOut>
    </RequiredAuth>
    ,
    errorElement:<ErrorPage></ErrorPage>
    ,
    children:
    [
      {
        index:true,element:
        <RequiredAuth>
          <DashBoard></DashBoard>
        </RequiredAuth>
      }
      ,  
      {
        path:"/admin/dashboard",element:
        <RequiredAuth>
          <DashBoard></DashBoard>
        </RequiredAuth>
      }
      ,
      {
        path:"/admin/doctors",element:
        <RequiredAuth>
          <Doctor></Doctor>
        </RequiredAuth>
      }
      ,
      {
        path:"/admin/Nurses",element:
        <RequiredAuth>
          <Nurses></Nurses>
        </RequiredAuth>
      }
      ,
      {
        path:"/admin/Profile",element:
        <RequiredAuth>
          <Profile></Profile>
        </RequiredAuth>
      }
      ,
      {
        path:"/admin/Patients",element:
        <RequiredAuth>
          <AllPatients></AllPatients>
        </RequiredAuth>
      }
      ,
      {
        path:"/admin/details",element:
        <RequiredAuth>
          <Details></Details>
        </RequiredAuth>
      }
      ,
      {
        path:"/admin/editUser",element:
        <RequiredAuth>
          <Edit></Edit>
        </RequiredAuth>
      }
      ,
      {
        path:"/admin/AddUser",element:
        <RequiredAuth>
          <AddUser></AddUser>
        </RequiredAuth>
      }
      ,
      {
        path:"/admin/Addpatient",element:
        <RequiredAuth>
          <AddPatient></AddPatient>
        </RequiredAuth>
      }
      ,
      {
        path:"/admin/UserDetails",element:
        <RequiredAuth>
          <UserDetail></UserDetail>
        </RequiredAuth>
      }
      ,
      {
        path:"/admin/doctorPatients",element:
        <RequiredAuth>
          <DoctorPatients></DoctorPatients>
        </RequiredAuth>
      }
      ,
      {
        path:"/admin/userEdit",element:
        <RequiredAuth>
          <UserEdit></UserEdit>
        </RequiredAuth>
      }
      ,
      {
        path:"/admin/EditPatient",element:
        <RequiredAuth>
          <EditPatient></EditPatient>
        </RequiredAuth>
      }
      ,
      {
        path:"/admin/lapResults",element:
        <RequiredAuth>
            <LapResult></LapResult>
        </RequiredAuth>
      }

    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

