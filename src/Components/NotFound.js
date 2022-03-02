import React , {useEffect} from 'react'
import { Link } from 'react-router-dom';

const NotFound = () => {

    useEffect(() => {
        var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (isMobile){
            document.querySelector('.page-container').style.minHeight = `${window.innerHeight}px`
        }
    },[])

    return (
        <div className='page-container'>
            <div className='not-found'>
                <h1>page not found</h1>
                <button>
                    <Link to="./" className='link'> back to the home page</Link>
                </button>
                

            </div>
        </div>
    )
}

export default NotFound