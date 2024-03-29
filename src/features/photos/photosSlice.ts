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

  export const addNewPhoto = createAsyncThunk('photos/addNewPhoto', async (initialPhoto: { albumId: number, title: string, url: string}) => {
    const response = await axios.post("https://jsonplaceholder.typicode.com/photos", initialPhoto)
    return response.data
})

export const deletePhoto = createAsyncThunk('photos/deletePhoto', async (id: number) => {
  await axios.delete(`https://jsonplaceholder.typicode.com/photos/${id}`);
  return id;
});

export const deletePhotos = createAsyncThunk('photos/deletePhotos', async (id: number) => {
  await axios.delete(`https://jsonplaceholder.typicode.com/photos/${id}`);
  return id;
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
        builder.addCase(addNewPhoto.fulfilled, (state, action) => { 
          const newPhoto = action.payload;
          newPhoto.id = state.photos.length + 1;
          state.photos.unshift(newPhoto);
        });
        builder.addCase(deletePhoto.fulfilled, (state, action) => {
          const deletedPhotoId = action.payload;
          state.photos = state.photos.filter((photo) => photo.id !== deletedPhotoId);
        });
        builder.addCase(deletePhotos.fulfilled, (state, action) => {
          const deletePhotosAlbum = action.payload;
          state.photos = state.photos.filter((photos) => photos.albumId !== deletePhotosAlbum);
        });
    },
  });

export const selectAllPhotos = (state: { photos: Photos }) => state.photos.photos;

export const selectPhotoById = (state: { photos: Photos }, id: number) =>
  state.photos.photos.find(photo => photo.id === id);

export const {photoAdded, photoRemoved} = photosSlice.actions

export default photosSlice.reducer