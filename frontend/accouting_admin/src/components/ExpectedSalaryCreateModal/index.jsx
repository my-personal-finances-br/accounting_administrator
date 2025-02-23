import { Box, CloseButton, Container, Content, SendButton } from "./style";
import { GrFormClose } from "react-icons/gr";
import { Form } from "@unform/web";
import { useRef } from "react";
import InputUnform from "../form/input/input";
import { createExpectedSalary } from "../../services/expenseves/createExpectedSalary";
import { expectedSalaryList } from "../../services/salaries/expectedSalaryList";

export default function ExpectedSalaryCreateModal({
  isOpen,
  setIsOpen,
  setIsOpenFatherModal,
  setData = { setData },
}) {
  const formRef = useRef(null);
  const closeModal = (e) => {
    e.preventDefault();
    setIsOpen(false);
  };
  const handleSubmit = async (data) => {
    await createExpectedSalary(data);
    setData((await expectedSalaryList()).data);
    setIsOpen(false);
  };

  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <Container isOpen={isOpen}>
        <Box>
          <Content size="unpublish">
            Adicionar nova Entrada fixa
            <CloseButton onClick={closeModal}>
              <GrFormClose size={18} />
            </CloseButton>
            <InputUnform placeholder="Nome" name="name" />
            <InputUnform placeholder="Valor Bruto" type="number" name="gross" />
            <InputUnform placeholder="Valor Liquido" type="number" name="net" />
            <SendButton>Adicionar</SendButton>
          </Content>
        </Box>
      </Container>
    </Form>
  );
}
