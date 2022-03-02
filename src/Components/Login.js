import React , { useState , useEffect , useContext } from 'react'
import { LoginForm , RegisterForm } from './Sub-components'




const Login = () => {

    
    const [ login , setLogin ] = useState(true)


    useEffect(() => {
        var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (isMobile){
            document.querySelector('.page-container').style.minHeight = `${window.innerHeight}px`
        }
        
    },[])

    return (
        <div className='page-container'>
            <div className='authentication'>
                <div className='form-container'>
                {
                    login ? 
                    <LoginForm /> 
                    : 
                    <RegisterForm />
                }
                <div className='form-toggle'>
                    <p>
                    {
                        login ? 'Do not have an account?' : 'Already have an account?'
                    }
                    </p>
                    <button onClick={ () => setLogin(!login) }>
                    {
                        login ? 'register' : 'log in'
                    }
                    </button>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Login