import { Box, CloseButton, Container, Content, SendButton } from "./style";
import { GrFormClose } from "react-icons/gr";
import { Form } from "@unform/web";
import { useRef, useState, useEffect } from "react";
import InputUnform from "../../components/form/input/input";
import { createExpectedExpenses } from "../../services/expenseves/createExpectedExpenses";
import { listCreditCards } from "../../services/creditCards/listCreditCards";
import { expectedExpenseList } from "../../services/expenseves/expectedExpenseList";

export default function ExpectedExpenseCreateModal({
  isOpen,
  setIsOpen,
  setIsOpenFatherModal,
  setData
}) {
  const [deadlineType, setDeadlineType] = useState("");
  const [creditCardSelected, setCreditCardSelected] = useState("");
  const [creditCards, setCreditCards] = useState([]);

  const formRef = useRef(null);

  useEffect(() => {
    getCreditCards();
  }, []);

  const closeModal = (e) => {
    e.preventDefault();
    setIsOpen(false);
  };
  const handleSubmit = async (data) => {
    await createExpectedExpenses({ ...data, deadline_type: deadlineType });
    setData((await expectedExpenseList()).data);
    setIsOpen(false);
  };

  const handleDeadlineTypeChange = (event) => {
    setDeadlineType(event.target.value);
  };

  const getCreditCards = async () => {
    await setCreditCards((await listCreditCards()).data);
  };

  const handleCreditCardSelectedChange = (event) => {
    setCreditCardSelected(event.target.value);
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
            Cartão de credito
            <InputUnform
              as="select"
              name="credit_card_id"
              value={creditCardSelected}
              onChange={handleCreditCardSelectedChange}
            >
              {creditCards.map((creditCard) => (
                <option key={creditCard.uuid} value={creditCard.uuid}>
                  {creditCard.name}
                </option>
              ))}
              <option key={"nao tem"} value="">
                Sem cartão
              </option>
            </InputUnform>
            Tipo de data para pagamento:
            <InputUnform
              as="select"
              name="deadline_type"
              value={deadlineType}
              onChange={handleDeadlineTypeChange}
            >
              <option value="first_business_day">Primeiro dia útil</option>
              <option value="fifth_business_day">5° dia útil</option>
              <option value="fifteenth_business_day">15° dia útil</option>
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
