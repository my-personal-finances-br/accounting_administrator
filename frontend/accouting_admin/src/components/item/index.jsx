import './style.css'
import { useState } from "react";
import PaidModal from '../paidModal';

export default function Item({value, name, description, paid_value, id, getExpenses, monthId}){
    const [modalOpen, setPaidModalOpen] = useState(false)

    const formatCurrency = (value) => {
        return new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(value);
      };
      console.log(paid_value)
      console.log("paid_value")
      return (
        <>
            <PaidModal monthId={monthId} getExpenses={getExpenses} isOpen={modalOpen} setIsOpen={setPaidModalOpen} id={id} name={name} value={value} description={description}/>
            <div className="Item">
                <span>{name}</span>
                <span>{formatCurrency(value)}</span>
            </div>
            <div className="Butonn">            
            {
                paid_value ? <></> :
                <button onClick={() => setPaidModalOpen(true)}>pago</button>

            }

                <button onClick={""}>Excluir</button>
                <button onClick={""}>Editar</button>
            </div>
        </>
    )
}