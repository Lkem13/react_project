import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";


import { addNewPost, postAdded } from "./postsSlice";

export const useAppDispatch: () => AppDispatch = useDispatch

const AddPostForm = () => {
    //const dispatch = useDispatch()
    const dispatch = useAppDispatch();
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    
    const canSave = [title, body,].every(Boolean);
    const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)
    const onBodyChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) => setBody(e.target.value)
    const onSavePostClicked = async () => {
        if (canSave){
            try{
            dispatch(
                postAdded({
                    title,
                    body
                })
                )
            setTitle('')
            setBody('')
            } catch (err){
                console.error('Failed to add new post', err)
            }
            
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