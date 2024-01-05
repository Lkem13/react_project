import { useEffect, useState } from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import store from './app/store';
import { fetchPosts } from './features/posts/postsSlice';
import Posts from './Pages/Posts';
import Layout from './components/Layout';
import SelectedPost from './features/posts/SelectedPost';
import { fetchComments } from './features/comments/commentsSlice';
import { fetchAlbums } from './features/albums/albumsSlice';
import Albums from './Pages/Albums';
import { fetchUsers } from './features/users/usersSlice';

store.dispatch(fetchPosts());
store.dispatch(fetchComments());
store.dispatch(fetchAlbums());
store.dispatch(fetchUsers());

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
    <Routes>
      <Route path="/" element={<Layout />}>

        <Route index element={<Home username={username}/>} />

        <Route path="posts">
          <Route index element={<Posts />} />
          <Route path=":postId" element={<SelectedPost />} />
        </Route>

        <Route path="albums">
          <Route index element={<Albums />} />
        </Route>

        <Route path="signup" element={<Signup/>}/>

        <Route path="login" element={<Login/>}/>

      </Route>
    </Routes>
  );
}

export default App;
