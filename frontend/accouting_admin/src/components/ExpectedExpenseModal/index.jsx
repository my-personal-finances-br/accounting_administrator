import { Box, CloseButton, Container, Content, SendButton } from "./style";
import { GrFormClose } from "react-icons/gr";
import ExpectedExpenseItem from "../ExpectedExpenseItem";
import { useState } from "react";
import ExpectedExpenseCreateModal from "../ExpectedExpenseCreateModal";

export default function ExpectedExpenseModal({
  isOpen,
  setIsOpen,
  data,
  setData,
}) {
  const [expectedExpenseCreateModal, setExpectedExpenseCreateModal] =
    useState(false);

  const closeModal = (e) => {
    e.preventDefault();
    setIsOpen(false);
  };

  const openexpectedExpenseCreateModal = async () => {
    setExpectedExpenseCreateModal(true);
  };

  return (
    <Container isOpen={isOpen}>
      <ExpectedExpenseCreateModal
        isOpen={expectedExpenseCreateModal}
        setIsOpen={setExpectedExpenseCreateModal}
        setIsOpenFatherModal={setIsOpen}
        setData={setData}
      />
      <Box>
        <Content size="unpublish">
          Gastos fixos do mês
          <CloseButton onClick={closeModal}>
            <GrFormClose size={18} />
          </CloseButton>
          {data.map((expectedExpense) => (
            <ExpectedExpenseItem
              key={expectedExpense.uuid}
              id={expectedExpense.uuid}
              value={expectedExpense.value}
              name={expectedExpense.name}
              setData={setData}
            ></ExpectedExpenseItem>
          ))}
          <SendButton onClick={openexpectedExpenseCreateModal}>
            Adicionar Novo gasto fixo
          </SendButton>
        </Content>
      </Box>
    </Container>
  );
}
