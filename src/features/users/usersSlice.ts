import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UsersModel } from "./UsersModel";

export interface Users{
    users: UsersModel[];
}

const initialState: Users = {
    users: [],
  };

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    return data as UsersModel[];
  });

  const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
  });

export const selectAllUsers = (state: { users: Users }) => state.users.users;

export default usersSlice.reducer