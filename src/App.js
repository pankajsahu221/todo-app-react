import React,{ useState, useRef, useEffect} from 'react'
import './App.css'
import TodoList from './TodoList' ;
import Title from './Title';
import { v4 as uuidv4 } from 'uuid';  //it generates a random id
import {Button, TextField} from '@material-ui/core';


function App(){
   const [Todos , setTodos] = useState([/*{id:1 , name:'Todo1' , complete:true }*/]);
   const TodoNameRef = useRef();
   const [editing , setEditing] = useState(false);
   const [editingID , setEditingID] = useState(null);

   // to get todos from the local storage for only first time
   useEffect(()=>{
      const storedTodos = JSON.parse(localStorage.getItem('todos') );
      if(storedTodos) setTodos(storedTodos) ;
   } , [])

   // to store the todos everytime when todos item changes
   useEffect(()=>{
      localStorage.setItem('todos' ,JSON.stringify(Todos)) ; 
   } , [Todos])

   // to toggle the checkbox
   function toggleTodos(id){
      const newTodos = [...Todos] ; 
      const todo = newTodos.find(todo => todo.id === id);
      todo.complete = !todo.complete;  //changed true to false and vice-versa
      setTodos(newTodos) ;
   }

   // to add items in the list
   function handleTodo(e){
      e.preventDefault();

      const name = TodoNameRef.current.value;
      if(name === '') return;
      console.log(name);

      // if we are editing then delete the previous todo item and then we add from '//adding new todo item'.
      if(editingID){
         const newTodos = Todos.filter(item => item.id!== editingID);
         setEditingID(null);
         setTodos(newTodos);
      }
      // adding new todo item
      setTodos(prevTodos => {
         return [...prevTodos, {id:uuidv4() , name:name, complete:false} ];
      });
      
      // we do this to get the text 'Add todo' on the Add todo btn if we have edited 
      setEditing(false);
      TodoNameRef.current.value = null;
   }

   // to clear the completed(checked) todos
   function clearTodos(){
      const newTodos = Todos.filter(todo => !todo.complete ) ;
      setTodos(newTodos);
   }
   // to delete a perticular item
   function deleteItem(id){
      const newTodos = Todos.filter(todo => todo.id !== id );
      setTodos(newTodos);
   }
   // to edit the name of item
   function editItem(id){
      setEditing(true);
      setEditingID(id);

      const todo = Todos.find(todo => todo.id === id );

      TodoNameRef.current.value = todo.name;
   }
   /////stop stop stopstopstopstop
   return (
      <div className="App">
         <Title/>
         <form>
            <TextField label="Add a todo" inputRef={TodoNameRef}/> 
            <Button type="submit" onClick={handleTodo}>{editing?"Edit todo":"Add todo"}</Button>
         </form>
         <div className="clearTodoBtn"><Button onClick={clearTodos} color="secondary">Clear Completed Todos</Button></div>
         <div className="leftTodos">{Todos.filter(todo => !todo.complete).length} Left todos</div>
         <TodoList todos={Todos} toggleTodos={toggleTodos} deleteItem={deleteItem} editItem={editItem} />
      
      </div>
   )
}

export default App
