import { HeaderDiv, Nav, Container, Button } from "./style";
import { logout } from "../../services/auth/logout";
import { expectedExpenseList } from "../../services/expenseves/expectedExpenseList";
import { expectedSalaryList } from "../../services/expenseves/expectedSalaryList";
import { useState } from "react";
import ExpectedExpenseModal from "../ExpectedExpenseModal";
import ExpectedSalaryModal from "../ExpectedSalaryModal";

export default function Header() {
  const [expectedExpenseModalOpen, setExpectedExpenseModalOpen] = useState(false);
  const [expectedSalaryModalOpen, setExpectedSalaryModalOpen] = useState(false);
  const [expectedExpenseData, setExpectedExpenseData] = useState([]);
  const [expectedSalaryData, setExpectedSalaryData] = useState([]);
  const doLogout = async () => {
    logout();
    window.location.reload(false);
  };
  const openExpectedExpenseModal = async () => {
    const data = await expectedExpenseList();
    setExpectedExpenseData(data.data);
    setExpectedExpenseModalOpen(true);
  };
  const openExpectedSalary = async () => {
    const data = await expectedSalaryList();
    setExpectedSalaryData(data.data);
    setExpectedSalaryModalOpen(true);
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
        <span>
          <b>Finanças</b>
        </span>
        <Nav>
          <Button onClick={openExpectedSalary}>Salario Fixo</Button>
          <Button onClick={openExpectedExpenseModal}>Gastos fixos</Button>
          <Button onClick={doLogout}>sair</Button>
        </Nav>
      </Container>
    </HeaderDiv>
  );
}
