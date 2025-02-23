import { useState } from "react";
// import { useRef } from "react";
import Modal from "../modal";
import MonthDetailModal from "../../components/monthDetailModal";
import SalaryDetailModal from "../../components/salaryDetailModal";
import { retrieveMonthDetail } from "../../services/expenseves/retrieveMonthDetail";
import { retrieveSalaryDetail } from "../../services/salaries/retrieveSalaryDetail";
import formatCurrency from "../../utils/formatCurrent";
import { MonthlyExpenseClosure } from "../../services/expenseves/MonthlyExpenseClosure";
import { deleteMonthlyExpense } from "../../services/expenseves/deleteMonthlyExpense";
import {
  CardContainer,
  HeaderCard,
  ButtonContainer,
  Button2,
  TotalPartial,
} from "./style";
import { GrFormClose } from "react-icons/gr";

export default function Card({
  children,
  month,
  id,
  getExpenses,
  partial_total,
  month_data,
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [monthDetailModalOpen, setMonthDetailModalOpen] = useState(false);
  const [monthDetailData, setMonthDetailData] = useState({});
  const [salaryDetailModalOpen, setSalaryDetailModalOpen] = useState(false);
  const [salaryDetailData, setSalaryDetailData] = useState([]);

  // const textareaRef = useRef(null);

  // TODO: Fix this to new response from expense monthly
  // const { total_non_paid, non_paid_txt, paid_txt, total_paid_txt } =
  //   children.reduce(
  //     (acc, child) => {
  //       if (!child.props.paid_value) {
  //         const currentValue = parseFloat(child.props.value);
  //         acc.total_non_paid += currentValue;
  //         acc.non_paid_txt += `${child.props.name} - ${
  //           child.props.deadline
  //             ? new Date(child.props.deadline).toLocaleDateString("pt-BR")
  //             : ""
  //         } - ${formatCurrency(currentValue)}\n`;
  //       } else {
  //         const currentValue = parseFloat(child.props.paid_value);
  //         acc.total_paid_txt += currentValue;
  //         acc.paid_txt += `${child.props.name} - ${
  //           child.props.deadline
  //             ? new Date(child.props.deadline).toLocaleDateString("pt-BR")
  //             : ""
  //         } - ${formatCurrency(currentValue)}\n`;
  //       }
  //       return acc;
  //     },
  //     {
  //       total_non_paid: 0,
  //       non_paid_txt: `*Gastos do mês de ${month}* -\n\n`,
  //       paid_txt: "",
  //       total_paid_txt: 0,
  //     },
  //   );

  // const finalText = `${non_paid_txt}\n*Total: ${formatCurrency(
  //   total_non_paid,
  // )}*\n----------------------------\n*Pagos* -\n${paid_txt}\n*Total: ${formatCurrency(
  //   total_paid_txt,
  // )}*`;

  // const copyToClipboard = () => {
  //   textareaRef.current.select();
  //   document.execCommand("copy");
  // };

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
  const monthlyExpenseClosure = async () => {
    await MonthlyExpenseClosure(id);
  };
  const handleDeleteMonthly = async () => {
    await deleteMonthlyExpense(id);
    window.location.reload();
  };

  return (
    <CardContainer>
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
      <HeaderCard>
        <b>
          {month} <GrFormClose onClick={handleDeleteMonthly} size={18} />{" "}
        </b>
      </HeaderCard>
      <ButtonContainer>
        {!month_data.detail ? (
          <button onClick={monthlyExpenseClosure}>Fechar mês</button>
        ) : (
          <></>
        )}
        <button onClick={openMonthSalaryModal}>Entradas</button>
        <button onClick={openMonthDetailModal}>Detalhes</button>
      </ButtonContainer>
      {children}
      <Button2 onClick={() => setModalOpen(true)}>
        <button>+</button>
      </Button2>
      {/* <textarea
        ref={textareaRef}
        style={{ position: "absolute", left: "-9999px" }}
        value={finalText}
        readOnly
      /> */}
      {/* <button onClick={copyToClipboard}>
        Copiar para a área de transferência
      </button> */}
      <TotalPartial>
        Total Parcial:&nbsp;&nbsp;
        <strong>{formatCurrency(partial_total)}</strong>
      </TotalPartial>
    </CardContainer>
  );
}
