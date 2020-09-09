import React from 'react'
import './TodoItem.css'
import IconButton from "@material-ui/core/IconButton";
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';


function TodoItem({todo , toggleTodos, deleteItem, editItem }) {

    function todoClick(){
        toggleTodos(todo.id);
    }
    function deleteBtn(){
        deleteItem(todo.id);
    }
    function editBtn(){
        editItem(todo.id);
    }

    return (
        <div className="todo-item">
           <label className="todo-item-detail">
             <Checkbox color="primary" checked={todo.complete} onChange={todoClick} inputProps={{ 'aria-label': 'secondary checkbox' }}/>
             <h3>{todo.name}</h3>
           </label>
           <div className="edit-options">
              
              <IconButton onClick={deleteBtn}><DeleteIcon className="delete-btn"/></IconButton>
              <IconButton onClick={editBtn}><EditIcon className="edit-btn"/></IconButton>

           </div>
        </div>
    )
}

export default TodoItem
