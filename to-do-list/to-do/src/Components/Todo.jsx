import React, { useEffect, useRef, useState } from 'react'
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import './Todo.css'

function Todo() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const addTodo = () => {
    if (todo !== '') {
      setTodos([...todos, { list: todo, id: Date.now(), status: false }]);
      setTodo('');
    }

    if (editId) {
      const editTodo = todos.find((todo) => todo.id === editId);
      const updateTodo = todos.map((to) => editTodo.id
        ? (to = { id: to.id, list: todo })
        : (to = { id: to.id, list: to.list }))

      setTodos(updateTodo);
      setEditId(0);
      setTodo('');
    }

  }

  const inputRef = useRef('null');
  useEffect(() => {
    inputRef.current.focus();
  })

  const onDelete = (id) => {

    setTodos(todos.filter((to) => to.id !== id)
    )

  }

  const onComplete = (id) => {
    setTodos(
      todos.map((to) => {
        if (to.id === id) {
          return { ...to, status: !to.status }
        }
        return to
      })
    )
  }

  const onEdit = (id) => {

    const editTodo = todos.find((to) => to.id === id)
    setTodo(editTodo.list);
    setEditId(editTodo.id);



  }



  return (
    <div className='container'>

      <h2>Todo App</h2>
      <form action="" className='form-group' onSubmit={handleSubmit}>
        <input type="text" ref={inputRef} value={todo} placeholder='Enter Your todo' className='form-control' onChange={(event) => { setTodo(event.target.value) }} />
        <button onClick={addTodo}>{editId ? 'EDIT' : 'ADD'}</button>
      </form>

      <div className='list'>
        <ul>
          {
            todos.map((todo) => (
              <li className='list-items'>
                <div className="list-item-list" id={todo.status ? 'list-item' : ''}>{todo.list}</div>
                <span>
                  <IoCheckmarkDoneCircle className="list-item-icons" id="complete" title='complete' onClick={() => { onComplete(todo.id) }} />
                  <MdEdit className="list-item-icons" id="edit" title='edit' onClick={() => onEdit(todo.id)} />
                  <MdDelete className="list-item-icons" id="delete" title='delete' onClick={() => onDelete(todo.id)} />
                </span>
              </li>
            ))
          }

        </ul>
      </div>

    </div >
  )
}

export default Todo
