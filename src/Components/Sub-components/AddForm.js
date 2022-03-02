import React , {useContext} from 'react'
import { AppContext } from '../../App'
import { DashboardContext } from '../Dashboard'
import axios from 'axios'



const url = "https://to-do-tasks-api.herokuapp.com/api/v1/tasks/"


const AddForm = () => {


    const { user } = useContext(AppContext)
    const { tasks , setTasks , setDashboardModal } = useContext(DashboardContext)

    
    const createTask = async(taskName) => {

        try{
            const response = await axios.post (url , {
                "name" : taskName
            },
            {
                headers : {
                    authentication : user.token
                }
            })
            if(response.status === 201){
                const newTasks = [ ...tasks , response.data]
                setTasks(newTasks)
                setDashboardModal({
                    status : "",
                    show : true,
                    content : 'Task Added'
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

    const submitHandler = (e) => {
        e.preventDefault()
        const form = document.querySelector('form')
        const taskName = form.taskName.value
        createTask(taskName)
        form.taskName.value = ""
    }



    return (
    <>
        <h3>add new task to your list</h3>
        <form onSubmit={(e) => { submitHandler(e) }}>
            <input type="text" name='taskName' placeholder='Task Name' className='text-input' />
            <button type='submit' className='form-btn'>add</button>
        </form> 
    </>
    )
}

export default AddForm