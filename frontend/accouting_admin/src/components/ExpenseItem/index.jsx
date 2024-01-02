import "./style.css";
import { useState } from "react";
import PaidModal from "../paidModal";
import { deleteExpenses } from "../../services/expenseves/deleteExpenses";
import formatCurrency from "../../utils/formatCurrent";

export default function ExpenseItem({
  value,
  name,
  description,
  paid_value,
  id,
  getExpenses,
  monthId,
  deadline,
}) {
  const [modalOpen, setPaidModalOpen] = useState(false);

  const handleDelete = async () => {
    await deleteExpenses(id);
    await getExpenses();
  };
  const isDeadlinePassed = deadline && new Date(deadline) < new Date();
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
        deadline={deadline}
      />
      <div className="Item">
        <span>{name}</span>
        <span
          className={`${
            !paid_value && deadline && new Date(deadline) > new Date()
              ? "orange"
              : !isDeadlinePassed || paid_value
                ? "green"
                : "red"
          }`}
        >
          {deadline ? new Date(deadline).toLocaleDateString("pt-BR") : ""}
        </span>
        <span>
          {paid_value ? formatCurrency(paid_value) : formatCurrency(value)}
        </span>
      </div>
      <div className="Butonn">
        {paid_value ? (
          <></>
        ) : (
          <button onClick={() => setPaidModalOpen(true)}>Pagar</button>
        )}

        <button onClick={() => handleDelete(id)}>Excluir</button>
        <button onClick={() => setPaidModalOpen(true)}>Editar</button>
      </div>
    </>
  );
}
