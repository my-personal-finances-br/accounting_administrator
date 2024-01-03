import { Box, CloseButton, Container, Content, SendButton } from "./style";
import { GrFormClose } from "react-icons/gr";
import { Form } from "@unform/web";
import { useRef } from "react";
import InputUnform from "../form/input/input";
import { createSalary } from "../../services/salaries/createSalary";

export default function SalaryCreateModal({
  isOpen,
  setIsOpen,
  setIsOpenFatherModal,
  month_id,
}) {
  const formRef = useRef(null);
  const closeModal = (e) => {
    e.preventDefault();
    setIsOpen(false);
  };
  const handleSubmit = async (data) => {
    data.monthly = month_id;
    await createSalary(data);
    setIsOpen(false);
    setIsOpenFatherModal(false);
  };

  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <Container isOpen={isOpen}>
        <Box>
          <Content size="unpublish">
            Adicionar nova Entrada do Mês
            <CloseButton onClick={closeModal}>
              <GrFormClose size={18} />
            </CloseButton>
            <InputUnform placeholder="Nome" name="name" />
            <InputUnform placeholder="Valor Bruto" type="number" name="gross" />
            <InputUnform placeholder="Valor Liquido" type="number" name="net" />
            <InputUnform
              placeholder="Meta para guardar"
              type="number"
              name="try_to_save"
            />
            <SendButton>Adicionar</SendButton>
          </Content>
        </Box>
      </Container>
    </Form>
  );
}
