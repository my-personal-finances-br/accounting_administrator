import "./style.css";
import { deleteSalary } from "../../services/expenseves/deleteSalary";
import SalaryEditModal from "../SalaryEditModal";
import { useState } from "react";
import formatCurrency from "../../utils/formatCurrent"

export default function SalaryItem({ id, value, name, data }) {
  const [salaryEditModal, setSalaryEditModal] = useState(false);
  

  const openSalaryEditModal = async () => {
    setSalaryEditModal(true);
  };
  const handleDelete = async () => {
    await deleteSalary(id);
    window.location.reload();
  };

  return (
    <>
      <SalaryEditModal
        data={data}
        id={id}
        isOpen={salaryEditModal}
        setIsOpen={setSalaryEditModal}
      />
      <div className="Item">
        <span className="ItemName">{name}</span>
        <span className="ItemValue">{formatCurrency(value)}</span>
      </div>
      <div className="ButtonContainer">
        <button onClick={openSalaryEditModal}>Editar</button>
        <button onClick={() => handleDelete()}>Excluir</button>
      </div>
    </>
  );
}
