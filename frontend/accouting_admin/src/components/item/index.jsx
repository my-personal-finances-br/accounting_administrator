import './style.css'
import { useState } from "react";
import PaidModal from '../paidModal';

export default function Item({value, name, description, is_fixed, id, getExpenses, monthId}){
    const [modalOpen, setPaidModalOpen] = useState(false)

    const formatCurrency = (value) => {
        return new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(value);
      };
    return (
        <>
            <PaidModal monthId={monthId} getExpenses={getExpenses} isOpen={modalOpen} setIsOpen={setPaidModalOpen} id={id} name={name} value={value} description={description}/>
            <div className="Item">
                <span>{name}</span>
                <span>{formatCurrency(value)}</span>
            </div>
            <div className="Butonn">            
            {
                !is_fixed ? <></> :
                <button onClick={() => setPaidModalOpen(true)}>pago</button>

            }

                <button onClick={""}>Excluir</button>
                <button onClick={""}>Editar</button>
            </div>
        </>
    )
}