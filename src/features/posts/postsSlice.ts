import {createSlice} from "@reduxjs/toolkit"
import { PostsModel } from "./PostsModel";

export interface Posts{
    posts: PostsModel[];
}

const initialState: Posts = {
    posts: [
    {id: 1, title: 'Test1', content: "Test content1"},
    {id: 2, title: 'Test2', content: "Test content2"},
    ]
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded(state, action){
            state.posts.push(action.payload)
        }
    }
})

export const selectAllPosts = (state: { posts: Posts }) => state.posts.posts;

export const {postAdded} = postsSlice.actions

export default postsSlice.reducer