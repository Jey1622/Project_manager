import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {  addTaskToServer } from '../slice/tasksSlice';
import { useDispatch } from 'react-redux';


const AddTask = () => {
    
    const dispatch=useDispatch()
    const [title,setTitle]=useState('')
    const [descreption,setDescreption]=useState('')


    const addTask=(e)=>{
        e.preventDefault()
        console.log({title,descreption})
        dispatch(addTaskToServer({title,descreption}))
        setTitle('')
        setDescreption('')
    }

  return (
    <section className='my-5'>
    <Form>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Task Title</Form.Label>
      <Form.Control type="text" placeholder="Enter a task Title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Task Desscreption</Form.Label>
      <Form.Control type="text" placeholder="Enter a Task Desscreption" value={descreption} onChange={(e)=>setDescreption(e.target.value)}/>
    </Form.Group>
    <div className='text-end'>
    <Button variant="primary" type="submit" onClick={(e)=>addTask(e)}>
      Add Task
    </Button>
    </div>
  </Form>
  </section>
  )
}

export default AddTask