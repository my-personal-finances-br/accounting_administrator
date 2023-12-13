import { Box, CloseButton, Container, Content } from "./style";
import { GrFormClose } from "react-icons/gr";
import ExpenseItem from "../ExpectedExpenseItem";

export default function ExpectedExpenseModal({ isOpen, setIsOpen, data }) {
  const closeModal = (e) => {
    e.preventDefault();
    setIsOpen(false);
  };

  return (
    <Container isOpen={isOpen}>
      <Box>
        <Content size="unpublish">
          Gastos fixos do mês{" "}
          <CloseButton onClick={closeModal}>
            <GrFormClose size={18} />
          </CloseButton>
          {data.map((expectedExpense) => (
            <ExpenseItem
              id={expectedExpense.uuid}
              value={expectedExpense.value}
              name={expectedExpense.name}
            ></ExpenseItem>
          ))}
        </Content>
      </Box>
    </Container>
  );
}
