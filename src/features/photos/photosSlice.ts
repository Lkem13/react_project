import {PayloadAction, createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from "axios";
import { PhotosModel } from "./PhotosModel";

export interface Photos{
    photos: PhotosModel[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: null | string
}

const initialState: Photos = {
    photos: [],
    status: 'idle',
    error: null
  };

export const fetchPhotos = createAsyncThunk("photos/fetchPhotos", async () => {
    const response = await axios.get("https://jsonplaceholder.typicode.com/photos");
    return response.data
  });

  const photosSlice = createSlice({
    name: "photos",
    initialState,
    reducers: {
      photoAdded: (state, action) => {
        action.payload.id = state.photos.length + 1
        state.photos.unshift(action.payload);
      },
      photoRemoved: (state, action: PayloadAction<number>) => {
        const index = state.photos.findIndex((photo) => photo.id === action.payload);
        if (index !== -1) {
          // Create a new array without the post at the found index
          state.photos = [...state.photos.slice(0, index), ...state.photos.slice(index + 1)];
        }
      },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPhotos.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const loadPhotos = action.payload
        state.photos = state.photos.concat(loadPhotos)
        })
        builder.addCase(fetchPhotos.pending, (state, action) => {
            state.status = 'loading'
        })
        builder.addCase(fetchPhotos.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message || 'Error fetching'
        });
    },
  });

export const selectAllPhotos = (state: { photos: Photos }) => state.photos.photos;

export const selectPhotoById = (state: { photos: Photos }, id: number) =>
  state.photos.photos.find(photo => photo.id === id);

export const {photoAdded, photoRemoved} = photosSlice.actions

export default photosSlice.reducer