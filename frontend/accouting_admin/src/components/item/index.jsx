import "./style.css";
import { useState } from "react";
import PaidModal from "../paidModal";
import { deleteExpenses } from "../../services/expenseves/deleteExpenses";

export default function Item({
  value,
  name,
  description,
  paid_value,
  id,
  getExpenses,
  monthId,
}) {
  const [modalOpen, setPaidModalOpen] = useState(false);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const handleDelete = async () => {
    await deleteExpenses(id);
    await getExpenses();
  };

  return (
    <>
      <PaidModal
        monthId={monthId}
        getExpenses={getExpenses}
        isOpen={modalOpen}
        setIsOpen={setPaidModalOpen}
        id={id}
        name={name}
        value={value}
        description={description}
      />
      <div className="Item">
        <span>{name}</span>
        <span>{formatCurrency(value)}</span>
      </div>
      <div className="Butonn">
        {paid_value ? (
          <></>
        ) : (
          <button onClick={() => setPaidModalOpen(true)}>pago</button>
        )}

        <button onClick={() => handleDelete(id)}>Excluir</button>
        <button onClick={() => setPaidModalOpen(true)}>Editar</button>
      </div>
    </>
  );
}
