import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {NavLink} from "react-router-dom"
import {BsFillQuestionSquareFill} from"react-icons/bs"
import {AiFillHome} from "react-icons/ai"
import {FiLogIn} from "react-icons/fi"
import "./HeaderLanding.css"
import logoimage from "../../assets/MAGNA.jpg"

const HeaderlayOut = () => {
  return (

    <>
    {[false, ].map((expand) => (
      <Navbar key={expand} bg="primary" expand={expand} className="mb-3">
        <Container fluid>
        <NavLink>
        
        <NavLink to="home" style={{textDecoration:"none"}}>
        <img src={logoimage} alt='logo' style={{width:"70px" ,borderRadius:"50%"}}></img>  
        <Navbar.Brand style={{color:"white",marginLeft:"10px"}} >Magna</Navbar.Brand>
        </NavLink>
        </NavLink>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${expand}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
              <img src={logoimage} alt='logo' style={{width:"70px", marginRight:"10px",borderRadius:"50%"}}></img>
                  Magna
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
              
                <Nav.Link >
                  <AiFillHome style={{marginRight:"10px" , fontSize:"20px" ,marginBottom:"5px"}}></AiFillHome>
                  <NavLink to="home" style={{textDecoration:"none"}} >Home</NavLink>
                </Nav.Link>

                <Nav.Link >
                  <BsFillQuestionSquareFill  style={{marginRight:"10px" , fontSize:"20px" ,marginBottom:"5px"}}></BsFillQuestionSquareFill>
                  <NavLink to="AboutUs" style={{textDecoration:"none"}}>About us</NavLink>
                </Nav.Link>
               
                <Nav.Link>
                  <FiLogIn style={{marginRight:"10px" , fontSize:"20px" ,marginBottom:"5px"}}></FiLogIn>
                  <NavLink to="Login" style={{textDecoration:"none"}}>Login Admin</NavLink>
                </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    ))}
  </>
  );
}

export default HeaderlayOut;
