import React from 'react'
import { useSelector } from 'react-redux'

const Navebar = () => {

    const {taskList,error}= useSelector((state)=>state.tasks)
  return (
    <>
    <h1 className='text-center my-4 text-primary'>Project Management</h1>
    <p className='text-center lead'>{`currently ${taskList.length} task(s) pensing`}</p>
    {
      (error !== '') ? <h5 className='text-center text-danger'>{error}</h5> : null
    }
    </>
  )
}

export default Navebar