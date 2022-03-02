import React , { useContext , useState } from 'react'
import { FaTasks } from 'react-icons/fa'
import { CgProfile } from 'react-icons/cg'
import { IoChevronDownOutline } from 'react-icons/io5'
import { Link , useNavigate } from 'react-router-dom'
import { AppContext } from '../App'


const NavigationBar = (prps) => {

    const navigate = useNavigate()
    const { user , setUser } = useContext(AppContext)
    const [ showLogout , setShowLogout ] = useState(false)

    const logoutHandler = () => {
        localStorage.clear()
        setUser({
            authenticated : false,
            name : "",
            token : ""
        })
        setShowLogout(false)
        navigate('/')
    }

    return (
        <nav>
           <div className='nav-header'>
               <FaTasks className='react-icon'/>
               <h3 style={{display : 'block'}}>To Do Tasks</h3>
               <div className='nav-links-container'>
                    <button className='nav-btn'>
                        <Link to='/' className='link'>Home</Link>
                    </button>
                    <button className='nav-btn'>
                        <Link to='/dashboard' className='link'>Dashboard</Link>
                    </button>
               </div>
           </div>
           <div className='nav-header'>
               {
                    user.authenticated ? 
                    <div className='user-info'>
                        <div className='user' onClick={ () => setShowLogout(!showLogout)}>
                            <h4>
                                {
                                    `hi: ${user.name.substring(0,7)}`
                                }
                                
                            </h4>
                            <IoChevronDownOutline className='down-arraw'/>                        
                            <CgProfile className='user-profile'/>
                        </div>
        
                        {
                            showLogout ?
                            <div className='user-ext' onClick={() => { logoutHandler() }}>
                                <div>
                                    logout
                                </div>
                            </div>
                            : 
                            null
                        }
                        
                    </div>
                    :
                    <button className='nav-btn'>
                        <Link to='/login' className='link'>Log in</Link>
                    </button>
               }
               

           </div>
        </nav>
    )
}

export default NavigationBar