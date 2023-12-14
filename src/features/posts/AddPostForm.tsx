import { useState } from "react";
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";

import { postAdded } from "./postsSlice";

const AddPostForm = () => {
    const dispatch = useDispatch()
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    

    const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)
    const onBodyChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) => setBody(e.target.value)
    const onSavePostClicked = async () => {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        const posts = await response.json();
        const nextId = posts.length + 1;

        if (title && body){
            dispatch(
                postAdded({
                    id: nextId,
                    title,
                    body
                })
            )

            setTitle('')
            setBody('')
        }
    }
    
    return(
        <section>
            <br/>
            <h2>Add a New Post</h2>
            <form>
                <label htmlFor="postTitle">Post Title:</label>
                <input
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    onChange={onTitleChanged}/>
                <label htmlFor="postContent">Content:</label>
                <textarea
                    id="postContent"
                    name="postContent"
                    value={body}
                    onChange={onBodyChanged}/>
                <button type="button" onClick={onSavePostClicked}>Save Post</button>
            </form>
            <br/>
        </section>
    )
}
export default AddPostForm