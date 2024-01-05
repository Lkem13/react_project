import {PayloadAction, createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import { CommentsModel } from "./CommentsModel";
import axios from "axios";

export interface Comments{
    comments: CommentsModel[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: null | string
}

const initialState: Comments = {
    comments: [],
    status: 'idle',
    error: null
  };

export const fetchComments = createAsyncThunk("comments/fetchComments", async () => {
    const response = await axios.get("https://jsonplaceholder.typicode.com/comments");
    return response.data
  });

  const commentsSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {
      commentAdded: (state, action) => {
        action.payload.id = state.comments.length + 1
        state.comments.unshift(action.payload);
      },
      commentRemoved: (state, action: PayloadAction<number>) => {
        const index = state.comments.findIndex((comment) => comment.id === action.payload);
        if (index !== -1) {
          // Create a new array without the post at the found index
          state.comments = [...state.comments.slice(0, index), ...state.comments.slice(index + 1)];
        }
      },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchComments.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const loadComments = action.payload
        state.comments = state.comments.concat(loadComments)
        })
        builder.addCase(fetchComments.pending, (state, action) => {
            state.status = 'loading'
        })
        builder.addCase(fetchComments.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message || 'Error fetching'
        });
    },
  });

export const selectAllComments = (state: { comments: Comments }) => state.comments.comments;

export const selectCommentById = (state: { comments: Comments }, postId: number) =>
  state.comments.comments.find(comment => comment.postId === postId);

export const {commentAdded, commentRemoved} = commentsSlice.actions

export default commentsSlice.reducer