import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import MyVerticallyCenteredModal from './updateTask';
import { useDispatch, useSelector } from 'react-redux'
import { getTasksFromServer, removeTaskFromList, setSelectedTask } from '../slice/tasksSlice';

const TasksList = () => {
    const {taskList}= useSelector((state)=>state.tasks)
    const dispatch=useDispatch()
    

    const updateTask=(task)=>{
        console.log('update Task')
        dispatch(setSelectedTask(task))
        setModalShow(true)
    }

    useEffect(()=>{
      dispatch(getTasksFromServer())
    },[dispatch])

    const deleteTask=(task)=>{
        console.log('delete Task')
        dispatch(removeTaskFromList(task))
    }

    const [modalShow,setModalShow]=useState(false)

  return (
    <>
    <Table striped>
    <thead>
      <tr  className='text-center'>
        <th>#</th>
        <th>Title</th>
        <th>Descreption</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
        {
            taskList && taskList.map((task,index)=>{
                return(

                <tr  className='text-center'>
                    <td>{index + 1}</td>
                    <td>{task.title}</td>
                    <td>{task.descreption}</td>
                    <td><button type="button"  className="btn btn-primary mx-3" onClick={()=>updateTask(task)}><i  className="bi bi-pencil-square"></i></button>
                    <button type="button"  className="btn btn-primary"><i  className="bi bi-trash" onClick={()=>deleteTask(task)}></i></button></td>
                </tr>
                )
            })
        }
      
    </tbody>
  </Table>
  <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
  </>
  )
}

export default TasksList