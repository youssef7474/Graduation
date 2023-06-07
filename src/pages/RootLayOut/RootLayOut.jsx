import React from 'react';
import SideBar from '../../components/SideBar/SideBar';
import Header from '../../components/Header/Header';
import { Outlet } from 'react-router-dom';

const RootLayOut = () => {
  return (
<div>
    <div className='page d-flex'>
        <SideBar></SideBar>
        <div class="content w-full">
            <Header></Header>
            <Outlet></Outlet>
        </div>
    </div>
</div>
  );
}

export default RootLayOut;
