import "./style.css";
import { useState, useRef } from "react";
import Modal from "../modal";
import MonthDetailModal from "../../components/monthDetailModal";
import SalaryDetailModal from "../../components/salaryDetailModal";
import { retrieveMonthDetail } from "../../services/expenseves/retrieveMonthDetail";
import { retrieveSalaryDetail } from "../../services/expenseves/retrieveSalaryDetail";
import formatCurrency from "../../utils/formatCurrent";

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
  const [salaryDetailModalOpen, setSalaryDetailModalOpen] = useState(false);
  const [salaryDetailData, setSalaryDetailData] = useState([]);

  const textareaRef = useRef(null);
  const { total_non_paid, non_paid_txt, paid_txt, total_paid_txt } =
    children.reduce(
      (acc, child) => {
        if (!child.props.paid_value) {
          const currentValue = parseFloat(child.props.value);
          acc.total_non_paid += currentValue;
          acc.non_paid_txt += `${child.props.name} - ${formatCurrency(
            currentValue,
          )}\n`;
        } else {
          const currentValue = parseFloat(child.props.paid_value);
          acc.total_paid_txt += currentValue;
          acc.paid_txt += `${child.props.name} - ${formatCurrency(
            currentValue,
          )}\n`;
        }
        return acc;
      },
      {
        total_non_paid: 0,
        non_paid_txt: `*Gastos do mês de ${month}* -\n\n`,
        paid_txt: "",
        total_paid_txt: 0,
      },
    );

  const finalText = `${non_paid_txt}\n*Total: ${formatCurrency(
    total_non_paid,
  )}*\n----------------------------\n*Pagos* -\n${paid_txt}\n*Total: ${formatCurrency(
    total_paid_txt,
  )}*`;

  const copyToClipboard = () => {
    textareaRef.current.select();
    document.execCommand("copy");
  };

  const openMonthDetailModal = async () => {
    const data = await retrieveMonthDetail(id);
    setMonthDetailData(data.data);
    setMonthDetailModalOpen(true);
  };
  const openMonthSalaryModal = async () => {
    const data = await retrieveSalaryDetail(id);
    setSalaryDetailData(data.data);
    setSalaryDetailModalOpen(true);
  };
  return (
    <div className="Card">
      <MonthDetailModal
        isOpen={monthDetailModalOpen}
        setIsOpen={setMonthDetailModalOpen}
        data={monthDetailData}
      />
      <SalaryDetailModal
        isOpen={salaryDetailModalOpen}
        setIsOpen={setSalaryDetailModalOpen}
        data={salaryDetailData}
        month={month}
        month_id={id}
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
        <button onClick={openMonthSalaryModal}>Entradas</button>
        <button onClick={openMonthDetailModal}>Detalhes</button>
      </div>
      {children}
      <div className="Buttonn">
        <button onClick={() => setModalOpen(true)}>+</button>
      </div>
      <textarea
        ref={textareaRef}
        style={{ position: "absolute", left: "-9999px" }}
        value={finalText}
        readOnly
      />
      <button onClick={copyToClipboard}>
        Copiar para a área de transferência
      </button>
      <div className="Buttonn">
        Total Parcial:&nbsp;&nbsp;
        <strong>{formatCurrency(partial_total)}</strong>
      </div>
    </div>
  );
}
