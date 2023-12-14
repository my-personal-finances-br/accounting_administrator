import { Box, CloseButton, Container, Content, SendButton } from "./style";
import { GrFormClose } from "react-icons/gr";
import { Form } from "@unform/web";
import { useRef } from "react";
import InputUnform from "../../components/form/input/input";
import { createExpectedExpenses } from "../../services/expenseves/createExpectedExpenses";

export default function ExpectedExpenseCreateModal({
  isOpen,
  setIsOpen,
  setIsOpenFatherModal,
}) {
  const formRef = useRef(null);
  const closeModal = (e) => {
    e.preventDefault();
    setIsOpen(false);
  };
  const handleSubmit = async (data) => {
    await createExpectedExpenses(data);
    setIsOpen(false);
    setIsOpenFatherModal(false);
  };

  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <Container isOpen={isOpen}>
        <Box>
          <Content size="unpublish">
            Adicionar novo gasto fixo
            <CloseButton onClick={closeModal}>
              <GrFormClose size={18} />
            </CloseButton>
            <InputUnform placeholder="Nome" name="name" />
            <InputUnform placeholder="Descrição" name="description" />
            <InputUnform placeholder="Valor" type="number" name="value" />
            <SendButton>Adicionar</SendButton>
          </Content>
        </Box>
      </Container>
    </Form>
  );
}
