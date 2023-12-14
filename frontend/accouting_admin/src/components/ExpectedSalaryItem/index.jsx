import "./style.css";
import { deleteExpectedSalary } from "../../services/expenseves/deleteExpectedSalary";

export default function ExpectedSalaryItem({ id, value, name }) {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const handleDelete = async () => {
    await deleteExpectedSalary(id);
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
