import { Box, CloseButton, Container, Content, SendButton } from "./style";
import { GrFormClose } from "react-icons/gr";
import { Form } from "@unform/web";
import { useRef } from "react";
import InputUnform from "../form/input/input";
import { editSalary } from "../../services/expenseves/editSalary";

export default function SalaryEditModal({ isOpen, setIsOpen, data, id }) {
  const formRef = useRef(null);
  const closeModal = (e) => {
    e.preventDefault();
    setIsOpen(false);
  };
  const handleSubmit = async (data) => {
    await editSalary(data, id);
    setIsOpen(false);
  };

  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <Container isOpen={isOpen}>
        <Box>
          <Content size="unpublish">
            Atualizar {data.name}
            <CloseButton onClick={closeModal}>
              <GrFormClose size={18} />
            </CloseButton>
            <InputUnform placeholder="Nome" name="name" value={data.name} />
            <InputUnform
              placeholder="Valor Bruto"
              type="number"
              name="gross"
              value={data.gross}
            />
            <InputUnform
              placeholder="Valor Liquido"
              type="number"
              name="net"
              value={data.net}
            />
            <SendButton>Atualizar</SendButton>
          </Content>
        </Box>
      </Container>
    </Form>
  );
}
