import React from 'react'
import { Link } from "react-router-dom"
import {Navbar, Nav, Container} from 'react-bootstrap';


const Header = () => {
  return (
    <header className="Header">
      <Navbar bg='dark' variant='dark' expand="lg" collapseOnSelect>
          <Container>
              <Navbar.Brand href="/">BookFace</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav>
                <Link to ="posts" className="nav-link">Posts</Link>
                <Link to ="albums" className="nav-link">Albums</Link>
                  
                </Nav>
              <Nav className="ms-auto">
                  <Nav.Link href="/signup">Sign Up</Nav.Link>
                  <Nav.Link href="/login">Login</Nav.Link>
              </Nav>
              </Navbar.Collapse>
          </Container>
      </Navbar>
    </header>
  )
}

export default Header
