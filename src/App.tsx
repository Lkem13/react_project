import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { Container } from 'react-bootstrap';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import PostsList from './features/posts/PostsList';
import AddPostForm from './features/posts/AddPostForm';
import store from './app/store';
import { fetchPosts } from './features/posts/postsSlice';
import Posts from './Pages/Posts';

store.dispatch(fetchPosts());

function App() {

  const [username, setUserName] = useState('')

  useEffect(() =>{
    ;(async() => {
      const response = await fetch('https://jsonplaceholder.typicode.com/users',{
        credentials: 'include',
        headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
        })
        const data = await response.json()
        setUserName(data.username)
      })()
  })

  return (
    <Router>
      <Header/>
      <main>
        <Container>
        <Routes>
          <Route path='/' Component={() => <Home username={username}/>}></Route>
          <Route path='/login' Component={Login}></Route>
          <Route path='/signup' Component={Signup}></Route>
          <Route path='/posts' Component={Posts}></Route>
          </Routes>
        </Container>
        
        
      </main>
      <Footer/>
    </Router>
  );
}

export default App;
