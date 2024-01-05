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
    extraReducers: (builder) => {
      builder.addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      });
    },
  });

export const selectUserById = (users: UsersModel[], userId: number) =>
  users.find((user) => user.id === userId);

  
export const selectAllUsers = (state: { users: Users }) => state.users.users;

export default usersSlice.reducer