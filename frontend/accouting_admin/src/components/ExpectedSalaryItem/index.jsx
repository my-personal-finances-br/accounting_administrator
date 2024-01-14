import "./style.css";
import { deleteExpectedSalary } from "../../services/salaries/deleteExpectedSalary";
import formatCurrency from "../../utils/formatCurrent";
import { expectedSalaryList } from "../../services/salaries/expectedSalaryList";

export default function ExpectedSalaryItem({ id, value, name, setData }) {
  const handleDelete = async () => {
    await deleteExpectedSalary(id);
    setData((await expectedSalaryList()).data)
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
