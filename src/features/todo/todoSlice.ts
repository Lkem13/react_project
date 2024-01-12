import {PayloadAction, createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from "axios";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../users/currentUserSlice";
import { UsersModel } from "../users/UsersModel";
import { ToDoModel } from "./ToDoModel";

export interface ToDos{
    todos: ToDoModel[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: null | string
}

const initialState: ToDos = {
    todos: [],
    status: 'idle',
    error: null
  };

export const fetchToDos = createAsyncThunk("todos/fetchToDos", async () => {
    const response = await axios.get("https://jsonplaceholder.typicode.com/todos");
    return response.data
  });

export const addNewToDo = createAsyncThunk('todos/addNewToDo', async (initialToDo: { userId: number, title: string, completed: boolean }) => {
  const response = await axios.post("https://jsonplaceholder.typicode.com/todos", initialToDo);
  return response.data;
});

export const deleteToDo = createAsyncThunk('todos/deleteToDo', async (id: number) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
    return id;
});

export const editToDo = createAsyncThunk('todos/editToDo', async (data: { id: number, completed: boolean, userId: number, title: string }) => {
  const response = await axios.patch(`https://jsonplaceholder.typicode.com/todos/${data.id}`, { id: data.id, completed: data.completed, userId: data.userId, title: data.title });
  return response.data;
});


  const todosSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchToDos.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const loadToDos = action.payload
        state.todos = state.todos.concat(loadToDos)
        })
        builder.addCase(fetchToDos.pending, (state, action) => {
            state.status = 'loading'
        })
        builder.addCase(fetchToDos.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message || 'Error fetching'
        })
        builder.addCase(addNewToDo.fulfilled, (state, action) => { 
          const newToDo = action.payload;
          newToDo.id = state.todos.length + 1;
          state.todos.unshift(newToDo);
        });
        builder.addCase(deleteToDo.fulfilled, (state, action) => {
          const deletedToDoId = action.payload;
          state.todos = state.todos.filter((todo) => todo.id !== deletedToDoId);
        });
        builder.addCase(editToDo.fulfilled, (state, action) => {
          const editedToDo = action.payload;
          const index = state.todos.findIndex((todo) => todo.id === editedToDo.id);
          if (index !== -1) {
            state.todos[index] = editedToDo;
          }
        });
    },
  });

export const selectAllTodos = (state: { todos: ToDos }) => state.todos.todos;

export const selectToDoById = (state: { todos: ToDos }, todoId: number) =>
  state.todos.todos.find(todo => todo.id === todoId);

export const {} = todosSlice.actions

export default todosSlice.reducer