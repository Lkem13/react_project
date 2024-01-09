import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../app/store";


import { addNewPost } from "./postsSlice";
import { selectCurrentUser } from "../users/currentUserSlice";

export const useAppDispatch: () => AppDispatch = useDispatch

const AddPostForm = () => {
    const dispatch = useAppDispatch();
    const currentUser = useSelector(selectCurrentUser);
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const canSave = [title, body,].every(Boolean);
    const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)
    const onBodyChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) => setBody(e.target.value)

    const onSavePostClicked = async () => {
        if (canSave) {
          try {
            await dispatch(addNewPost({userId: currentUser?.id || 0, title: title, body: body }));
            setTitle('');
            setBody('');
          } catch (err) {
            console.error('Failed to add new post', err);
          }
        }
      };
      
    
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
                <button className="submit" type="button" onClick={onSavePostClicked}>Save Post</button>
            </form>
            <br/>
        </section>
    )
}
export default AddPostForm