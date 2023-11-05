import React from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { Container } from 'react-bootstrap';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';

function App() {
  return (
    <Router>
      <Header/>
      <main>
        <Container>
        <Routes>
          <Route path='/' Component={Home}></Route>
          <Route path='/login' Component={Login}></Route>
          <Route path='/signup' Component={Signup}></Route>
          </Routes>
        </Container>
      </main>
      <Footer/>
    </Router>
  );
}

export default App;
