import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { updateInServer} from '../slice/tasksSlice';


const MyVerticallyCenteredModal = (props) => {
    const {selectedTask}=useSelector((state)=>state.tasks)

    const [title,setTitle]=useState('')
    const [descreption,setDescreption]=useState('')
    const [id,setId]=useState(0)
    const dispatch=useDispatch()

    const updateTask=()=>{
        props.onHide()
        dispatch(updateInServer({id,title,descreption}))
    }
    useEffect(()=>{
        if(Object.keys(selectedTask).length !==0){
            setTitle(selectedTask.title)
            setDescreption(selectedTask.descreption)
            setId(selectedTask.id)
        }
        
    },[selectedTask])
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          update Task
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Task Title</Form.Label>
            <Form.Control type="text" placeholder="Enter a task Title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Task Desscreption</Form.Label>
            <Form.Control type="text" placeholder="Enter a Task Desscreption" value={descreption} onChange={(e)=>setDescreption(e.target.value)}/>
            </Form.Group>
           
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <div className='text-end'>
            <Button variant="primary" type="submit" onClick={(e)=>updateTask(e)}>
            update Task
            </Button> 
            </div>
      </Modal.Footer>
    </Modal>
  )
}

export default MyVerticallyCenteredModal