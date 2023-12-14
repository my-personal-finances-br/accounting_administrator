import "./style.css";
import { deleteExpectedExpenses } from "../../services/expenseves/deleteExpectedExpenses";
import formatCurrency from "../../utils/formatCurrent"

export default function ExpectedExpenseItem({ id, value, name }) {

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
      </div>
    </>
  );
}
