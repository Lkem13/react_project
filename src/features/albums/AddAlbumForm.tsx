import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../app/store";
import { addNewAlbum } from "./albumsSlice";
import { selectCurrentUser } from "../users/currentUserSlice";


export const useAppDispatch: () => AppDispatch = useDispatch

const AddAlbumForm = () => {
    const dispatch = useAppDispatch();
    const [title, setTitle] = useState('')
    const currentUser = useSelector(selectCurrentUser);
    const canSave = [title].every(Boolean);
    const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)

    const onSaveAlbumClicked = async () => {
        if (canSave) {
          try {
            await dispatch(addNewAlbum({userId: currentUser?.id || 0, title: title}));
            setTitle('');
          } catch (err) {
            console.error('Failed to add new album', err);
          }
        }
      };
      
    
    return(
        <section>
            <br/>
            <h2>Add a New Album</h2>
            <form>
                <label htmlFor="albumTitle">Album Title:</label>
                <input
                    type="text"
                    id="albumTitle"
                    name="albumTitle"
                    value={title}
                    onChange={onTitleChanged}/>
                <button className="submit" type="button" onClick={onSaveAlbumClicked}>Save Album</button>
            </form>
            <br/>
        </section>
    )
}
export default AddAlbumForm