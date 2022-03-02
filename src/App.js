import React , { useEffect , useState } from 'react'
import { BrowserRouter as Router , Routes , Route , Navigate } from 'react-router-dom'
import { Home , Login , Dashboard , NotFound , NavigationBar } from './Components'
import { Modal } from './Components/Sub-components';


const AppContext = React.createContext();


const App = () => {

    const [modal , setModal] = useState({ status : 'fail' , show : false , content : ['hello'] })
    const [user , setUser] = useState({authenticated : false , name : "" , token : ""})

    useEffect(() => {
        const userName = localStorage.getItem('name')
        const userToken = localStorage.getItem('token')
        if(userName && userName){
            setUser({
                authenticated : true,
                name : userName,
                token : userToken
            })
        }
    } , [])

    useEffect(() => {
        if(modal.show){ 
            setTimeout(() => {
                setModal({...modal , show : false})
            } , 5000)
        }
    } , [modal.show])

    return (
    <AppContext.Provider value={{setModal, setUser , user}} >
        <div>
            {
                modal.show ? <Modal modalObject={modal}/> : null
            }
        </div>
        <Router>
            <NavigationBar />
            <Routes>
                <Route exact path='/' element={<Home />}/>
                <Route exact path='/Login' element={user.authenticated ? <Navigate to='/dashboard'/>  : <Login />} />
                <Route exact path='/dashboard' element={user.authenticated ? <Dashboard /> : <Navigate to='/login' />}/>
                <Route exact path='*'  element={<NotFound />}/>
            </Routes>
        </Router>
    </AppContext.Provider>
    )
}

export { App , AppContext } 