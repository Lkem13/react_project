import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { UsersModel } from "../users/UsersModel";
import { selectAllUsers, selectUserById } from "../users/usersSlice";
import { selectCurrentUser } from "../users/currentUserSlice";
import { deleteComments } from "../comments/commentsSlice";
import { deleteToDo, editToDo, selectAllTodos } from "./todoSlice";
import { useState } from "react";
import { ToDoModel } from "./ToDoModel";

interface ToDoProps {
  todo: ToDoModel;
}

const ToDoList = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);
    const userTodos = useSelector(selectAllTodos).filter(
        (todo) => todo.userId === currentUser?.id
    );

    const toggleCompletion = async (todo: ToDoModel) => {
      await dispatch(editToDo({ id: todo.id, completed: !todo.completed, userId: todo.userId, title: todo.title }) as any);
    };

    const handleRemoveToDo = (todoId: number) =>{
      dispatch(deleteToDo(todoId) as any);
  };
    
    const renderedToDos = userTodos.map((todo) => {
      const completedTodoIds = userTodos.filter((todo) => todo.completed).map((todo) => todo.id);

      return(
      <li key={todo.id} className="todo-item">
        <button className="delete" onClick={() => handleRemoveToDo(todo.id)}>X</button>
        <h5
          className={`${completedTodoIds.includes(todo.id) ? 'completed' : 'incomplete'}`}
          onClick={() => toggleCompletion(todo)}>
        {todo.title}
        </h5>
        <p>{completedTodoIds.includes(todo.id) ? 'Completed' : 'Incomplete'}</p>
      </li>
    )});

    return(
      <section className="todo-container">
      <h2>ToDos</h2>
      <ul>{renderedToDos}</ul>
    </section>
    )
    
}
export default ToDoList