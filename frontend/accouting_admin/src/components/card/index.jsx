import './style.css'
import { useState } from "react";
import Modal from "../modal";


export default function Card({children, month, id, getExpenses}){
    const [modalOpen, setModalOpen] = useState(false)

    return (
        <div className='Card'>
            <Modal isOpen={modalOpen} setIsOpen={setModalOpen} id={id} getExpenses={getExpenses} month={month}/>
            <div className='HeaderCard'>
                {month}
            </div>
        {children}
        <div className='Buttonn'>
            <button onClick={() => setModalOpen(true)}>+</button>
        </div>
        </div>
    )
}