import React from "react";
import ToDoList from "../features/todo/ToDoList";
import AddToDoForm from "../features/todo/AddToDoForm";

const ToDos = () => {
    return(
        <div>
            <div>
                <AddToDoForm/>
            </div>
            <div>
                <ToDoList/>
            </div>
        </div>
    )
}
export default ToDos;