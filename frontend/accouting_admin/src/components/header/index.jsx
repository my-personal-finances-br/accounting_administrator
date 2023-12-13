import { HeaderDiv, Nav, Container, Button } from "./style";
import { logout } from "../../services/auth/logout";
import { expectedExpenseList } from "../../services/expenseves/expectedExpenseList";
import { useState } from "react";
import ExpectedExpenseModal from "../ExpectedExpenseModal";

export default function Header() {
  const [expectedExpenseModalOpen, setExpectedExpenseModalOpen] =
    useState(false);
  const [expectedExpenseData, setExpectedExpenseData] = useState([]);
  const doLogout = async () => {
    logout();
    window.location.reload(false);
  };
  const openExpectedExpenseModal = async () => {
    const data = await expectedExpenseList();
    setExpectedExpenseData(data.data);
    setExpectedExpenseModalOpen(true);
  };
  return (
    <HeaderDiv>
      <Container>
        <ExpectedExpenseModal
          isOpen={expectedExpenseModalOpen}
          setIsOpen={setExpectedExpenseModalOpen}
          data={expectedExpenseData}
        />
        <span>
          <b>Finanças</b>
        </span>
        <Nav>
          <Button onClick={openExpectedExpenseModal}>Gastos fixos</Button>
          <Button onClick={doLogout}>sair</Button>
        </Nav>
      </Container>
    </HeaderDiv>
  );
}
