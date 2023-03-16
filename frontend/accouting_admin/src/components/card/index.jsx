import './style.css'
import { useState, useEffect } from "react";
import Modal from "../modal";


export default function Card({children, month, id}){
    const [modalOpen, setModalOpen] = useState(false)

    return (
        <div className='Card'>
            <Modal isOpen={modalOpen} setIsOpen={setModalOpen} id={id}/>
            <div className='HeaderCard'>
                {month}
            </div>
        {children}
        <div className='Buttonn'>
            <button onClick={() => setModalOpen(true)}>Add</button>
        </div>
        </div>
    )
}