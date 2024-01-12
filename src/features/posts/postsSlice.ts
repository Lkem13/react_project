import {PayloadAction, createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import { PostsModel } from "./PostsModel";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../users/currentUserSlice";
import { UsersModel } from "../users/UsersModel";

export interface Posts{
    posts: PostsModel[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: null | string
}

const initialState: Posts = {
    posts: [],
    status: 'idle',
    error: null
  };

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
    const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
    return response.data
  });

export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost: { userId: number, title: string, body: string }) => {
  const response = await axios.post("https://jsonplaceholder.typicode.com/posts", initialPost);
  return response.data;
});

export const deletePost = createAsyncThunk('posts/deletePost', async (id: number) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
    return id;
});

export const editPost = createAsyncThunk('posts/editPost', async (data: { id: number, userId: number, body: string, title: string }) => {
  const response = await axios.patch(`https://jsonplaceholder.typicode.com/posts/${data.id}`, { id: data.id, body: data.body ,userId: data.userId, title: data.title });
  return response.data;
});

  const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
      postRemoved: (state, action: PayloadAction<number>) => {
        const index = state.posts.findIndex((post) => post.id === action.payload);
        if (index !== -1) {
          // Create a new array without the post at the found index
          state.posts = [...state.posts.slice(0, index), ...state.posts.slice(index + 1)];
        }
      },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const loadPosts = action.payload
        state.posts = state.posts.concat(loadPosts)
        })
        builder.addCase(fetchPosts.pending, (state, action) => {
            state.status = 'loading'
        })
        builder.addCase(fetchPosts.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message || 'Error fetching'
        })
        builder.addCase(addNewPost.fulfilled, (state, action) => { 
          const newPost = action.payload;
          newPost.id = state.posts.length + 1;
          state.posts.unshift(newPost);
        });
        builder.addCase(deletePost.fulfilled, (state, action) => {
          const deletedPostId = action.payload;
          state.posts = state.posts.filter((post) => post.id !== deletedPostId);
        });
        builder.addCase(editPost.fulfilled, (state, action) => {
          const editedPost = action.payload;
          const index = state.posts.findIndex((post) => post.id === editedPost.id);
          if (index !== -1) {
            state.posts[index] = editedPost;
          }
        });
    },
  });

export const selectAllPosts = (state: { posts: Posts }) => state.posts.posts;

export const selectPostById = (state: { posts: Posts }, postId: number) =>
  state.posts.posts.find(post => post.id === postId);

export const {postRemoved} = postsSlice.actions

export default postsSlice.reducer