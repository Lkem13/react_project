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
import { fetchPhotos } from './features/photos/photosSlice';
import SelectedAlbum from './features/albums/SelectedAlbum';
import { fetchToDos } from './features/todo/todoSlice';
import ToDos from './Pages/ToDos';
import MyProfile from './features/users/MyProfile';
import SelectedUser from './features/users/SelectedUser';

store.dispatch(fetchPosts());
store.dispatch(fetchComments());
store.dispatch(fetchAlbums());
store.dispatch(fetchUsers());
store.dispatch(fetchPhotos());
store.dispatch(fetchToDos());

function App() {


  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        <Route index element={<Home/>} />

        <Route path="posts">
          <Route index element={<Posts />} />
          <Route path=":postId" element={<SelectedPost />} />
        </Route>

        <Route path="albums">
          <Route index element={<Albums />} />
          <Route path=":albumId" element={<SelectedAlbum />} />
        </Route>

        <Route path="todo">
          <Route index element={<ToDos />} />
        </Route>

        <Route path="profile" element={<MyProfile/>}/>

        <Route path="users">
          <Route path=":userId" element={<SelectedUser />} />
        </Route>

        <Route path="signup" element={<Signup/>}/>

        <Route path="login" element={<Login/>}/>

      </Route>
    </Routes>
  );
}

export default App;
