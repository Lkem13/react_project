import {PayloadAction, createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import { PostsModel } from "./PostsModel";
import axios from "axios";

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

  export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost) => {
    const response = await axios.post("https://jsonplaceholder.typicode.com/posts", initialPost)
    return response.data
})

  const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
      postAdded: (state, action) => {
        action.payload.id = state.posts.length + 1
        state.posts.unshift(action.payload);
      },
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
        // Assuming the payload is an array of PostsModel
        //state.posts = action.payload;
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
            action.payload.id = [(state.posts.length - 1) + 1]
            console.log(action.payload)
            state.posts.push(action.payload)
        });
    },
  });

export const selectAllPosts = (state: { posts: Posts }) => state.posts.posts;

export const selectPostById = (state: { posts: Posts }, postId: number) =>
  state.posts.posts.find(post => post.id === postId);

export const {postAdded, postRemoved} = postsSlice.actions

export default postsSlice.reducer