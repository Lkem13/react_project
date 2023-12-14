import React from 'react'
import {Navbar, Nav, Container} from 'react-bootstrap';


const Header = () => {
  return (
    
    <Navbar bg='dark' variant='dark' expand="lg" collapseOnSelect>
        <Container>
            <Navbar.Brand href="/">BookFace</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav>
              <Nav.Link href="/posts">Posts</Nav.Link>
              </Nav>
            <Nav className="ms-auto">
                <Nav.Link href="/signup">Sign Up</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
  );
}

export default Header
