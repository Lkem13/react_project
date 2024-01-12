import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../app/store";
import { addNewToDo } from "./todoSlice";
import { selectCurrentUser } from "../users/currentUserSlice";


export const useAppDispatch: () => AppDispatch = useDispatch

const AddToDoForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const [title, setTitle] = useState('')
    const currentUser = useSelector(selectCurrentUser);
    const canSave = Boolean(title.trim());
    const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)

    const onSaveToDoClicked = async () => {
        if (canSave) {
          try {
            await dispatch(addNewToDo({userId: currentUser?.id || 0, title: title, completed: false}));
            setTitle('');
          } catch (err) {
            console.error('Failed to add new todo', err);
          }
        }
      };
      
    
    return(
        <section>
            <br/>
            <h2>Add a New ToDo</h2>
            <form>
                <label htmlFor="todoTitle">ToDo Title:</label>
                <input
                    type="text"
                    id="todoTitle"
                    name="todoTitle"
                    value={title}
                    onChange={onTitleChanged}/>
                <button className="submit" type="button" onClick={onSaveToDoClicked}>Save ToDo</button>
            </form>
            <br/>
        </section>
    )
}
export default AddToDoForm