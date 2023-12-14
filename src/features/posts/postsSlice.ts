import {PayloadAction, createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import { PostsModel } from "./PostsModel";

export interface Posts{
    posts: PostsModel[];
}

const initialState: Posts = {
    posts: [],
  };

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    return data as PostsModel[];
  });

  const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
      postAdded: (state, action) => {
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
        // Assuming the payload is an array of PostsModel
        state.posts = action.payload;
      });
    },
  });

export const selectAllPosts = (state: { posts: Posts }) => state.posts.posts;

export const {postAdded, postRemoved} = postsSlice.actions

export default postsSlice.reducer