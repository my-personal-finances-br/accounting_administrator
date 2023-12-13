import "./style.css";
import { deleteExpectedExpenses } from "../../services/expenseves/deleteExpectedExpenses";

export default function ExpectedExpenseItem({ id, value, name }) {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const handleDelete = async () => {
    await deleteExpectedExpenses(id);
  };

  return (
    <>
      <div className="Item">
        <span className="ItemName">{name}</span>
        <span className="ItemValue">{formatCurrency(value)}</span>
      </div>
      <div className="ButtonContainer">
        <button onClick={() => handleDelete()}>Excluir</button>
        <button onClick={() => {}}>Editar</button>
      </div>
    </>
  );
}
