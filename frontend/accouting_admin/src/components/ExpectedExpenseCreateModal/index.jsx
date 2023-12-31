import { Box, CloseButton, Container, Content, SendButton } from "./style";
import { GrFormClose } from "react-icons/gr";
import { Form } from "@unform/web";
import { useRef, useState } from "react";
import InputUnform from "../../components/form/input/input";
import { createExpectedExpenses } from "../../services/expenseves/createExpectedExpenses";

export default function ExpectedExpenseCreateModal({
  isOpen,
  setIsOpen,
  setIsOpenFatherModal,
}) {
  const formRef = useRef(null);
  const [deadlineType, setDeadlineType] = useState("");
  const closeModal = (e) => {
    e.preventDefault();
    setIsOpen(false);
  };
  const handleSubmit = async (data) => {
    await createExpectedExpenses({ ...data, deadline_type: deadlineType });
    setIsOpen(false);
    setIsOpenFatherModal(false);
  };

  const handleDeadlineTypeChange = (event) => {
    setDeadlineType(event.target.value);
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
            Tipo de data para pagamento:
            <InputUnform
              as="select"
              name="deadline_type"
              value={deadlineType}
              onChange={handleDeadlineTypeChange}
            >
              <option value="first_business_day">Primeiro dia útil</option>
              <option value="last_business_day">Ultimo dia útil</option>
              <option value="date">Data exata</option>
            </InputUnform>
            {deadlineType === "date" ? (
              <InputUnform
                placeholder="Dia para pagamento"
                type="number"
                name="deadline"
              />
            ) : (
              <></>
            )}
            <InputUnform placeholder="Valor" type="number" name="value" />
            <SendButton>Adicionar</SendButton>
          </Content>
        </Box>
      </Container>
    </Form>
  );
}
