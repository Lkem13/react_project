import React from 'react'
import { Link, useNavigate } from "react-router-dom"
import {Navbar, Nav, Container} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, selectCurrentUser } from '../features/users/currentUserSlice';


const Header = () => {
  const currentUser = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/')
  };

  return (
    <header className="Header">
      <Navbar bg='dark' variant='dark' expand="lg" collapseOnSelect>
          <Container>
              <Navbar.Brand>
                <Link to="/" className="nav-link">BookFace</Link>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                
                {
                  currentUser != null ? (
                  <>
                    <Nav>
                      <Link to="albums" className="nav-link">Albums</Link>
                    </Nav>
                    <Nav className="ms-auto">
                      <button className="nav-link" onClick={handleLogout}>Logout</button>
                    </Nav>
                  </>
                  ) : (
                  <>
                    <Nav className="ms-auto">
                      <Link to ="signup" className="nav-link">Sign Up</Link>
                      <Link to ="login" className="nav-link">Login</Link>
                    </Nav>
                </>
                  )
                }
              </Navbar.Collapse>
          </Container>
      </Navbar>
    </header>
  )
}

export default Header

