import { HeaderDiv, Nav, Container, Button } from "./style";
import { logout } from "../../services/auth/logout";
import { expectedExpenseList } from "../../services/expenseves/expectedExpenseList";
import { expectedSalaryList } from "../../services/salaries/expectedSalaryList";
import { listCreditCards } from "../../services/creditCards/listCreditCards";
import { useState } from "react";
import ExpectedExpenseModal from "../ExpectedExpenseModal";
import ExpectedSalaryModal from "../ExpectedSalaryModal";
import CreditCardModal from "../CreditCardModal";

export default function Header() {
  const [expectedExpenseModalOpen, setExpectedExpenseModalOpen] =
    useState(false);
  const [expectedSalaryModalOpen, setExpectedSalaryModalOpen] = useState(false);
  const [expectedExpenseData, setExpectedExpenseData] = useState([]);
  const [expectedSalaryData, setExpectedSalaryData] = useState([]);
  const [creditCardData, setCreditCardData] = useState([]);
  const [creditCardModalOpen, setCreditCardModalOpen] = useState(false);
  const doLogout = async () => {
    logout();
    window.location.reload(false);
  };
  const openExpectedExpenseModal = async () => {
    const data = await expectedExpenseList();
    setExpectedExpenseData(data.data);
    setExpectedExpenseModalOpen(true);
  };
  const openExpectedSalaryModal = async () => {
    const data = await expectedSalaryList();
    setExpectedSalaryData(data.data);
    setExpectedSalaryModalOpen(true);
  };
  const openCreditCardModal = async () => {
    const data = await listCreditCards();
    setCreditCardData(data.data);
    setCreditCardModalOpen(true);
  };
  return (
    <HeaderDiv>
      <Container>
        <ExpectedExpenseModal
          isOpen={expectedExpenseModalOpen}
          setIsOpen={setExpectedExpenseModalOpen}
          data={expectedExpenseData}
        />
        <ExpectedSalaryModal
          isOpen={expectedSalaryModalOpen}
          setIsOpen={setExpectedSalaryModalOpen}
          data={expectedSalaryData}
        />
        <CreditCardModal
          isOpen={creditCardModalOpen}
          setIsOpen={setCreditCardModalOpen}
          data={creditCardData}
        />
        <span>
          <b>Minhas Finanças</b>
        </span>
        <Nav>
          <Button onClick={openCreditCardModal}>Cartões de Credito</Button>
          <Button onClick={openExpectedSalaryModal}>Entradas Fixas</Button>
          <Button onClick={openExpectedExpenseModal}>Gastos Fixos</Button>
          <Button onClick={doLogout}>Sair</Button>
        </Nav>
      </Container>
    </HeaderDiv>
  );
}
