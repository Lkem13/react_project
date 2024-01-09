import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UsersModel } from "./UsersModel";

export interface CurrentUser{
    currentUser: UsersModel | null;
    error: null | string
  }
  
  const initialState: CurrentUser = {
    currentUser: null,
    error: null
  };

  const currentUserSlice = createSlice({
    name: "currentUser",
    initialState,
    reducers: {
        loginUser(state, action) {
            const user = action.payload;
            state.currentUser = user;
            state.error = null;
          },
          logoutUser(state) {
            state.currentUser = null;
          },
    },
    extraReducers: {},
  });
  
export const selectCurrentUser = (state: { currentUser: CurrentUser }) => state.currentUser.currentUser;

export const { loginUser, logoutUser } = currentUserSlice.actions;

export default currentUserSlice.reducer