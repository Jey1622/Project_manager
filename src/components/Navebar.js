import React from 'react'
import { useSelector } from 'react-redux'

const Navebar = () => {

    const {taskList}= useSelector((state)=>state.tasks)
  return (
    <>
    <h1 className='text-center my-4 text-primary'>Project Management</h1>
    <p className='text-center lead'>{`currently ${taskList.length} task(s) pensing`}</p>
    </>
  )
}

export default Navebar