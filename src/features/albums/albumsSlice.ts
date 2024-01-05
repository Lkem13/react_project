import {PayloadAction, createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import { AlbumsModel } from "./AlbumsModel";
import axios from "axios";

export interface Albums{
    albums: AlbumsModel[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: null | string
}

const initialState: Albums = {
    albums: [],
    status: 'idle',
    error: null
  };

export const fetchAlbums = createAsyncThunk("albums/fetchAlbums", async () => {
    const response = await axios.get("https://jsonplaceholder.typicode.com/albums");
    return response.data
  });

  export const addNewAlbum = createAsyncThunk('albums/addNewAlbum', async (initialAlbum) => {
    const response = await axios.post("https://jsonplaceholder.typicode.com/albums", initialAlbum)
    return response.data
})

  const albumsSlice = createSlice({
    name: "albums",
    initialState,
    reducers: {
      albumAdded: (state, action) => {
        action.payload.id = state.albums.length + 1
        state.albums.unshift(action.payload);
      },
      albumRemoved: (state, action: PayloadAction<number>) => {
        const index = state.albums.findIndex((album) => album.id === action.payload);
        if (index !== -1) {
          // Create a new array without the post at the found index
          state.albums = [...state.albums.slice(0, index), ...state.albums.slice(index + 1)];
        }
      },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAlbums.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // Assuming the payload is an array of PostsModel
        //state.posts = action.payload;
        const loadAlbums = action.payload
        state.albums = state.albums.concat(loadAlbums)
        })
        builder.addCase(fetchAlbums.pending, (state, action) => {
            state.status = 'loading'
        })
        builder.addCase(fetchAlbums.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message || 'Error fetching'
        })
        builder.addCase(addNewAlbum.fulfilled, (state, action) => {
            action.payload.id = [(state.albums.length - 1) + 1]
            console.log(action.payload)
            state.albums.push(action.payload)
        });
    },
  });

export const selectAllAlbums = (state: { albums: Albums }) => state.albums.albums;

export const selectAlbumById = (state: { albums: Albums }, id: number) =>
  state.albums.albums.find(album => album.id === id);

export const {albumAdded, albumRemoved} = albumsSlice.actions

export default albumsSlice.reducer