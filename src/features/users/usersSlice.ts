import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UsersModel } from "./UsersModel";
import axios from "axios";

export interface Users{
    users: UsersModel[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: null | string
}

const initialState: Users = {
  users: [],
  status: 'idle',
  error: null
};

export interface Register {
  name: string;
  username: string;
  email: string;
}

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
    const response = await axios.get("https://jsonplaceholder.typicode.com/users");
    return response.data;
  });

  export const addNewUser = createAsyncThunk('users/addNewUser', async (initialUser: { name: string, username: string, email: string }) => {
    const response = await axios.post("https://jsonplaceholder.typicode.com/users", initialUser);
    return response.data;
  });

  const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      });
      builder.addCase(addNewUser.fulfilled, (state, action) => { 
        const newUser = action.payload;
        newUser.id = state.users.length + 1;
        state.users.unshift(newUser);
      });
    },
  });

export const selectUserById = (users: UsersModel[], userId: number) =>
  users.find((user) => user.id === userId);

  
export const selectAllUsers = (state: { users: Users }) => state.users.users;

export default usersSlice.reducer