import {configureStore} from "@reduxjs/toolkit";
import postsReducer from '../features/posts/postsSlice';
import commentsReducer from '../features/comments/commentsSlice';
import albumsReducer from '../features/albums/albumsSlice';
import usersReducer from '../features/users/usersSlice';
import photosReducer from '../features/photos/photosSlice';

export const store = configureStore({
    reducer: {
        posts: postsReducer,
        comments: commentsReducer,
        albums: albumsReducer,
        users: usersReducer,
        photos: photosReducer,
    }
});

export type AppDispatch = typeof store.dispatch;
export default store;