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
            Nome
            <InputUnform placeholder="Nome" name="name" value={data.name} />
            Valor Bruto
            <InputUnform
              placeholder="Valor Bruto"
              type="number"
              name="gross"
              value={data.gross}
            />
            Valor Liquido
            <InputUnform
              placeholder="Valor Liquido"
              type="number"
              name="net"
              value={data.net}
            />
            Meta para guardar
            <InputUnform
              placeholder="Meta para guardar"
              type="number"
              name="try_to_save"
              value={data.try_to_save}
            />
            <SendButton>Atualizar</SendButton>
          </Content>
        </Box>
      </Container>
    </Form>
  );
}
