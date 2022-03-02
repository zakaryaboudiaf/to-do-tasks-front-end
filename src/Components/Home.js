import React , {useState , useEffect} from 'react'
import image from './Resources/to do list.jpg'
import { Link } from 'react-router-dom'



const Home = () => {

    useEffect(() => {
        var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (isMobile){
            document.querySelector('.page-container').style.minHeight = `${window.innerHeight}px`
        }
    },[])

    return (
        <div className='page-container'>
            <div className='home'>
                <div className="home-header">
                    
                    <h2 >you want to manage and organise your tasks easaly?</h2>
                    <p className='app-about'>
                        By creating a simple To-Do List, You can manage, organize 
                        and keep tracking your work and duties directly from your 
                        web browser in a sophisticated manner, so you never forget anything.
                    </p>
                    <button className='start-btn'>
                        <Link to='/login' className='link'>Start now</Link> 
                    </button>
              
                </div>
                <div className="home-img">
                    <img src={image} alt="" />
                </div>
            </div>
        </div>
    )
}

export default Home