import React , { useContext, useState , useEffect } from 'react'
import { DashboardContext } from '../Dashboard'
import { AppContext } from '../../App'
import axios from 'axios'
import { RiTextSpacing } from 'react-icons/ri'



const url = "https://to-do-tasks-api.herokuapp.com/api/v1/tasks/"



const EditForm = () => {


    const { tasks , setTasks , edit , setEditState , setDashboardModal } = useContext(DashboardContext)
    const { user } = useContext(AppContext)

    const editTask = async (name , completed) => {

        try{
            const response = await axios.patch(`${url}${edit.taskId}` , {

                    "name" : name,
                    "completed" : completed
                },
                {
                    headers : {
                        authentication : user.token
                    }
                }
            )
            if (response.status === 200){
                const newTasks = tasks.map((item) => {
                    if (item._id === edit.taskId){
                        return response.data
                    }
                    else{
                        return item
                    }
                })

                setTasks(newTasks)
                setEditState({
                    showForm : false,
                    taskId : ""
                })
                setDashboardModal({
                    status : "",
                    show : true,
                    content : 'Task Updated'
                })
            }
        }
        catch(error){

            const response = error.response
            if(response.data.error.startsWith('Validation failed')){
                const errorMsg = response.data.error.slice(18).split(',')[0].split(':')[1]
                setDashboardModal({
                    status : "fail",
                    show : true,
                    content : errorMsg
                })
            } 
        }
    }

    useEffect (() => {

        const task = tasks.filter((item) => item._id === edit.taskId)[0]
        if(task){
            const form = document.querySelector('form')
            form.id.value = task._id
            form.name.value = task.name
            form.completed.checked = task.completed
        }
    } , [])


    const submitHandler = (e) => {
        e.preventDefault()
        const form = document.querySelector('form')
        const name = form.name.value
        const completed = form.completed.checked
        editTask(name , completed)
    }

 

    return (
    <>
        <h3>modify task</h3>
        <form onSubmit={ (e) => submitHandler(e) }>
            <div className='form-item'>
                <label className='label'>Task ID</label>
                <input type="text" name='id' className='text-input' readOnly/>
            </div>
            <div className='form-item'>
                <label className='label'>Task Name</label>
                <input type="text" name='name' className='text-input'/>
            </div>
            <div className='form-item'>
                <label className='label'>Completed</label>
                <input type="checkbox" name="completed" className='checkbox-input' />
            </div>
            <button type='submit' className='form-btn'>edit</button>
        </form>
    </>
    )
}

export default EditForm