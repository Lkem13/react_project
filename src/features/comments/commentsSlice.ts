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

  export const addNewComment = createAsyncThunk('comments/addNewComment', async (initialAlbum: { email: string, postId: number, body: string}) => {
    const response = await axios.post("https://jsonplaceholder.typicode.com/comments", initialAlbum)
    return response.data
})

  export const deleteComment = createAsyncThunk('comments/deleteComment', async (id: number) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/comments/${id}`);
    return id;
  });

  export const deleteComments = createAsyncThunk('comments/deleteComments', async (id: number) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/comments/${id}`);
    return id;
  });


  const commentsSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {},
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
        builder.addCase(addNewComment.fulfilled, (state, action) => { 
          const newComment = action.payload;
          newComment.id = state.comments.length + 1;
          state.comments.unshift(newComment);
        });
        builder.addCase(deleteComment.fulfilled, (state, action) => {
          const deletedCommentId = action.payload;
          state.comments = state.comments.filter((comment) => comment.id !== deletedCommentId);
        });
        builder.addCase(deleteComments.fulfilled, (state, action) => {
          const deleteComments = action.payload;
          state.comments = state.comments.filter((comment) => comment.postId !== deleteComments);
        });
    },
  });

export const selectAllComments = (state: { comments: Comments }) => state.comments.comments;

export const selectCommentById = (state: { comments: Comments }, postId: number) =>
  state.comments.comments.find(comment => comment.postId === postId);

export const {} = commentsSlice.actions

export default commentsSlice.reducer