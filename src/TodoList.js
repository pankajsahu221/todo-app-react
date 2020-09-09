import React from 'react'
import TodoItem from './TodoItem'
import './TodoList.css'

function TodoList({todos , toggleTodos, deleteItem, editItem}){
    return (
      <div className="TodoList">
          {todos.map( item =>{
              return <TodoItem key={item.id} todo={item} toggleTodos={toggleTodos} deleteItem={deleteItem} editItem={editItem} />
          })}
      </div>
    )
}

export default TodoList
