import './style.css'
import { useState } from "react";
import PaidModal from '../paidModal';

export default function Item({value, name, description, is_fixed, id, getExpenses, monthId}){
    const [modalOpen, setPaidModalOpen] = useState(false)
    return (
        <>
            <PaidModal monthId={monthId} getExpenses={getExpenses} isOpen={modalOpen} setIsOpen={setPaidModalOpen} id={id} name={name} value={value} description={description}/>
            <div className="Item">
                <span>{name}</span>
                <span>R$ {value}</span>
            </div>
            
            {
                !is_fixed ? <></> : <div className="Butonn">
                <button onClick={() => setPaidModalOpen(true)}>pago</button>
            </div>
                
            }
        </>
    )
}