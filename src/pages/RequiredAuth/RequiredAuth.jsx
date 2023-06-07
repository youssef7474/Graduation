import React from 'react';
import { useSelector } from 'react-redux';
import {Container,Row, Col ,Button} from "react-bootstrap"
import {useNavigate } from "react-router-dom";

const RequiredAuth = ({children}) => {
    const navigate = useNavigate();

    const isloggedIn = useSelector(state => state.Auth.islogedin);
  return isloggedIn?children:
  <>
  <Container>
  <Row>
      <Col xs={{span:8,offset:2}}>
          <div  className='mt-5 text-center'>
              <h1>Oops!</h1>
              <p>Sorry, you must log in first</p>
              <Button variant="primary" onClick={()=>navigate("/Login",{replace:true})} >Go to login</Button>
          </div>
      </Col>
  </Row>
</Container>
  </>
}

export default RequiredAuth;
