import { Box, CloseButton, Container, Content, SendButton } from "./style";
import { GrFormClose } from "react-icons/gr";
import ExpectedSalaryItem from "../ExpectedSalaryItem";
import { useState } from "react";
import ExpectedSalaryCreateModal from "../ExpectedSalaryCreateModal";

export default function ExpectedSalaryModal({
  isOpen,
  setIsOpen,
  data,
  setData,
}) {
  const [expectedSalaryCreateModal, setExpectedSaryCreateModal] =
    useState(false);

  const closeModal = (e) => {
    e.preventDefault();
    setIsOpen(false);
  };

  const openexpectedSalaryCreateModal = async () => {
    setExpectedSaryCreateModal(true);
  };

  return (
    <Container isOpen={isOpen}>
      <ExpectedSalaryCreateModal
        isOpen={expectedSalaryCreateModal}
        setIsOpen={setExpectedSaryCreateModal}
        setIsOpenFatherModal={setIsOpen}
        setData={setData}
      />
      <Box>
        <Content size="unpublish">
          Entradas Esperadas do mês
          <CloseButton onClick={closeModal}>
            <GrFormClose size={18} />
          </CloseButton>
          {data.map((expectedExpense) => (
            <ExpectedSalaryItem
              key={expectedExpense.uuid}
              id={expectedExpense.uuid}
              value={expectedExpense.net}
              name={expectedExpense.name}
              setData={setData}
            ></ExpectedSalaryItem>
          ))}
          <SendButton onClick={openexpectedSalaryCreateModal}>
            Adicionar Nova Entradas fixas do mês
          </SendButton>
        </Content>
      </Box>
    </Container>
  );
}
