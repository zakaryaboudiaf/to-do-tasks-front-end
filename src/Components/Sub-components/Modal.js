import React from 'react'

const Modal = (props) => {

    const modal = props.modalObject
 
    return (
        <div className={`modal ${modal.status}`}>
            {
                modal.content.map((item , index) => {
                    return <p key={index}>{item}</p>
                })
            }
            
        </div>
    )
}

export default Modal