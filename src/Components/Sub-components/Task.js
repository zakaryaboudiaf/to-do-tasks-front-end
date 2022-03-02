import React , { useContext } from 'react'
import { DashboardContext } from '../Dashboard'
import { AppContext } from '../../App'
import { RiDeleteBin6Line , RiEditFill  } from 'react-icons/ri'
import axios from 'axios'


const url = "https://to-do-tasks-api.herokuapp.com/api/v1/tasks/"


const Task = (props) => {

    const { _id , name , completed } = props.task
    const { user } = useContext(AppContext)
    const { tasks , setTasks , setEditState , setDashboardModal } = useContext(DashboardContext)


    const deleteTask = async() => {
        try{
            const response = await axios.delete(`${url}${_id}` , {
                headers : {
                    authentication : user.token
                }
            })
            if(response.status === 200){
                const newTasks = tasks.filter((item) => item._id !== _id)
                setTasks(newTasks)
                setDashboardModal({
                    status : "fail",
                    show : true,
                    content : 'Task Deleted'
                })
            }
        }
        catch(error){
            const response = error.response
            if (response){
                if(response.data.error.startsWith('Task validation failed')){
                    const errorMsg = response.data.error.slice(23).split(',')[0].split(':')[1]
                    setDashboardModal({
                        status : "fail",
                        show : true,
                        content : errorMsg
                    })
                }  
            }
        }
    }

    const deleteHandler = () => {
        deleteTask()
    }

    const editHandler = () => {
        setEditState({
            showForm : true,
            taskId : _id
        })
    }


    return (
    <>
        <p className={`task-name ${completed ? 'completed' : ''}` }>{name}</p>
        <RiEditFill className='edit-icon' onClick={() => editHandler()}/>
        <RiDeleteBin6Line className='delete-icon' onClick={() => deleteHandler()}/>
    </>
    )
}

export default Task