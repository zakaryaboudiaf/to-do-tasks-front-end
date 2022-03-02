import React , {useContext, useState } from 'react'
import { AppContext } from '../../App'
import { Loading } from '.'
import axios from 'axios'



const loginUrl = "https://to-do-tasks-api.herokuapp.com/api/v1/auth/login"



const LoginForm = () => {

    const {setModal , setUser} = useContext(AppContext)
    const [isLoading , setIsLoading] = useState(false)


    const loginUser = async( email , password) => {
        
        setIsLoading(true)
        try{
            const response = await axios.post( loginUrl , {
                "email" : email,
                "password" : password
            })
            if(response.status === 200){
                localStorage.setItem("name" , response.data.user.name)
                localStorage.setItem("token" , `Bearer ${response.data.token}`)
                setModal({
                    status : "success",
                    show : true ,
                    content : [`Welcome ${response.data.user.name}`]
                })
                setUser({
                    authenticated : true,
                    name : localStorage.getItem('name'),
                    token : localStorage.getItem('token')
                })  
            }
        }
        catch(error){

            let errArray = []

            const response = error.response
            
            if(response){

                if(response.data.error.startsWith('User validation failed')){
                    errArray = response.data.error.slice(23).split(',').map((item) => {
                        return item.split(':')[1]
                    })
                }
                else{
                    errArray = [response.data.error]
                }
                setModal({
                    status : "fail",
                    show : true ,
                    content : errArray
                 })
                localStorage.clear()
            }
            setIsLoading(false)

        }
        
    }

    const submitHandler = (e) => {
        e.preventDefault()
        const form = document.querySelector(".form")
        const email = form.email.value
        const password = form.password.value
        loginUser(email , password)
        form.password.value = ""
    }

    return (
        
        <>
            {
                isLoading ? <Loading /> : null
            }
            <h3>login</h3>
            <form className='form' onSubmit={(e) => submitHandler(e)}>
                <input type="email" name='email' placeholder='Email' className='form-input'/>
                <input type="password" name='password' placeholder='Password' className='form-input' />
                <button type='submit' className='form-btn'>login</button>
            </form>
            
        </>
        
    )
}

export default LoginForm