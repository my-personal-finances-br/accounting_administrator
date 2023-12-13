import "./style.css";
import { useState } from "react";
import Modal from "../modal";
import MonthDetailModal from "../../components/monthDetailModal";
import { retrieveMonthDetail } from "../../services/expenseves/retrieveMonthDetail";

export default function Card({
  children,
  month,
  id,
  getExpenses,
  partial_total,
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [monthDetailModalOpen, setMonthDetailModalOpen] = useState(false);
  const [monthDetailData, setMonthDetailData] = useState({});

  const openMonthDetailModal = async () => {
    const data = await retrieveMonthDetail(id);
    setMonthDetailData(data.data);
    setMonthDetailModalOpen(true);
  };
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };
  return (
    <div className="Card">
      <MonthDetailModal
        isOpen={monthDetailModalOpen}
        setIsOpen={setMonthDetailModalOpen}
        data={monthDetailData}
      />
      <Modal
        isOpen={modalOpen}
        setIsOpen={setModalOpen}
        id={id}
        getExpenses={getExpenses}
        month={month}
      />
      <div className="HeaderCard">
        <b>{month}</b>
      </div>
      <div className="ButtonContainer">
        <button onClick={openMonthDetailModal}>Detalhes</button>
      </div>
      {children}
      <div className="Buttonn">
        <button onClick={() => setModalOpen(true)}>+</button>
      </div>
      <div className="Buttonn">
        Total Parcial:&nbsp;&nbsp;
        <strong>{formatCurrency(partial_total)}</strong>
      </div>
    </div>
  );
}
