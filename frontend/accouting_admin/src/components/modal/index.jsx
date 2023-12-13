import { Box, CloseButton, Container, Content, Button } from "./style";
import { GrFormClose } from "react-icons/gr";
import InputUnform from "../../components/form/input/input";
import { Form } from "@unform/web";
import { useRef } from "react";
import { createExpenses } from "../../services/expenseves/createExpenses";
import RadioTeste from "../form/radio";

export default function Modal({ isOpen, setIsOpen, id, getExpenses, month }) {
  const closeModal = (e) => {
    e.preventDefault();
    setIsOpen(false);
  };
  const formRef = useRef(null);

  const handleSubmit = async (data) => {
    data.monthly_expense = id;
    await createExpenses(data);
    await getExpenses();
    setIsOpen(false);
  };
  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <Container isOpen={isOpen}>
        <Box>
          <Content size="unpublish">
            Novo Gasto de {month}
            <CloseButton onClick={closeModal}>
              <GrFormClose size={18} />
            </CloseButton>
            <InputUnform placeholder="Nome" name="name" />
            <InputUnform placeholder="Descrição" name="description" />
            <InputUnform placeholder="Valor" type="number" name="value" />
            É um gasto fixo?
            <RadioTeste
              type="radio"
              name="is_fixed"
              options={[
                { value: true, label: "Sim" },
                { value: false, label: "Não" },
              ]}
            />
            <Button>Criar</Button>
          </Content>
        </Box>
      </Container>
    </Form>
  );
}
