import React , { useEffect , useState , useContext } from 'react'
import { AddForm , EditForm, Tasks , DashboardFormModal} from './Sub-components'
import { AppContext } from '../App'
import axios from 'axios'


const url = "https://to-do-tasks-api.herokuapp.com/api/v1/tasks/"

const DashboardContext = React.createContext();

const Dashboard = () => {

   
    const { user , setUser } = useContext(AppContext)
    const [edit , setEditState] = useState({ showForm : false , taskId : '' })
    const [tasks , setTasks] = useState([])
    const [dashboardModal , setDashboardModal] = useState({ 
            status : 'fail',
            show : false ,
            content : 'hello' 
        })

    const getAllTasks = async() => {

        try{
            const response = await axios.get(url , { 
                headers : {
                    authentication : user.token
                }
            })
            if(response.status === 200){
                setTasks(response.data)
            }  
        }
        catch(error){
            const response = error.response
            if(response){
                if(response.status === 401 && response.data.error === 'Invalid Token'){
                    localStorage.clear()
                    setUser({
                        authenticated : false,
                        name : "",
                        token : ""
                    })
                }
            }
        }
    }


    useEffect(() => {
        var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (isMobile){
            document.querySelector('.page-container').style.minHeight = `${window.innerHeight}px`
        }
        
    },[])

    useEffect(() => { 
        getAllTasks() 
    } , [])

    useEffect(() => { 

        if(dashboardModal.show){
            setTimeout(() => {
                setDashboardModal({...dashboardModal , show : false})
            } , 3000)
        }
        
    } , [dashboardModal.show])

    

    return (
        <DashboardContext.Provider value={{ tasks , setTasks , edit , setEditState , dashboardModal , setDashboardModal }}>
            <div className='page-container'>
                <div className='dashboard-forms'>
                    <div className="dashboard-form">
                        {
                            dashboardModal.show ? <DashboardFormModal /> : null
                        }
                        {
                            edit.showForm ? <EditForm /> : <AddForm />
                        }
                    </div>
                </div>
                <div className='dashboard-tasks' >
                {
                    edit.showForm ?

                    <button className='form-btn back' onClick={() => setEditState({...edit , showForm : !edit.showForm})}>back</button> 
                    : 
                    <Tasks tasks={tasks} setTasks={setTasks}/>
                }
                </div>
            </div>
        </DashboardContext.Provider>
    )
}

export { Dashboard , DashboardContext }