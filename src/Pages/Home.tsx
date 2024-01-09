import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser } from '../features/users/currentUserSlice';
import { AppDispatch } from '../app/store';
import PostsList from '../features/posts/PostsList';
import AddPostForm from '../features/posts/AddPostForm';
import { Link } from 'react-router-dom';

const Home = () => {
  const currentUser = useSelector(selectCurrentUser);

  console.log(currentUser);
  return(
    <>
    <h1>
     {currentUser ? `Welcome ${currentUser.username}!` : 'Welcome to the home page!'} 
    </h1>
      {
        currentUser != null  &&
          (      
            <div>
              <AddPostForm/>
            </div>
          )
      }
      <div>
        <PostsList/>
      </div>
    </>
  )
}

export default Home
