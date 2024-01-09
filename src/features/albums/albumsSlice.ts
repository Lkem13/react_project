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

  export const addNewAlbum = createAsyncThunk('albums/addNewAlbum', async (initialAlbum: {userId: number, title: string}) => {
    const response = await axios.post("https://jsonplaceholder.typicode.com/albums", initialAlbum)
    return response.data
})

export const deleteAlbum = createAsyncThunk('albums/deleteAlbum', async (id: number) => {
  await axios.delete(`https://jsonplaceholder.typicode.com/albums/${id}`);
  return id;
});

  const albumsSlice = createSlice({
    name: "albums",
    initialState,
    reducers: {},
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
          const newAlbum = action.payload;
          newAlbum.id = state.albums.length + 1;
          state.albums.unshift(newAlbum);
        });
        builder.addCase(deleteAlbum.fulfilled, (state, action) => {
          const deletedAlbumId = action.payload;
          state.albums = state.albums.filter((album) => album.id !== deletedAlbumId);
        });
    },
  });

export const selectAllAlbums = (state: { albums: Albums }) => state.albums.albums;

export const selectAlbumById = (state: { albums: Albums }, id: number) =>
  state.albums.albums.find(album => album.id === id);

export const {} = albumsSlice.actions

export default albumsSlice.reducer