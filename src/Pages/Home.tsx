import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser } from '../features/users/currentUserSlice';
import { AppDispatch } from '../app/store';

const Home = () => {
  const currentUser = useSelector(selectCurrentUser);

  console.log(currentUser);
  return(
    <h1>
     {currentUser ? `Welcome ${currentUser.username}!` : 'Welcome to the home page!'} 
    </h1>
  )
}

export default Home
