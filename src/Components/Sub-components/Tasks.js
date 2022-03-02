import React from 'react'
import Task from './Task'

const Tasks = (props) => {

    const tasks = props.tasks
    const setTasks = props.setTasks
    

    return (
        <div className='tasks'>
            {
                tasks.map((task) => {

                    return (
                        <div key={task._id} className='task'> 
                            <Task task={task}/>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Tasks