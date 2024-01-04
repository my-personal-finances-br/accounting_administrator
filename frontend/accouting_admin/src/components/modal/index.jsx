import { Box, CloseButton, Container, Content, Button } from "./style";
import { GrFormClose } from "react-icons/gr";
import InputUnform from "../../components/form/input/input";
import { Form } from "@unform/web";
import { useRef, useState, useEffect } from "react";
import { createExpenses } from "../../services/expenseves/createExpenses";
import { listCreditCards } from "../../services/creditCards/listCreditCards";
import RadioTeste from "../form/radio";

export default function Modal({ isOpen, setIsOpen, id, getExpenses, month }) {
  const [creditCards, setCreditCards] = useState([]);
  const [creditCardSelected, setCreditCardSelected] = useState("");

  useEffect(() => {
    getCreditCards();
  }, []);

  const closeModal = (e) => {
    e.preventDefault();
    setIsOpen(false);
  };
  const formRef = useRef(null);

  const getCreditCards = async () => {
    await setCreditCards((await listCreditCards()).data);
  };

  const handleCreditCardSelectedChange = (event) => {
    setCreditCardSelected(event.target.value);
  };

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
            Cartão de credito
            <InputUnform
              as="select"
              name="credit_card"
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
            É um gasto fixo?
            <RadioTeste
              type="radio"
              name="is_fixed"
              options={[
                { value: true, label: "Sim", id: "1023o54-023i532" },
                { value: false, label: "Não", id: "104532523o54-023i532" },
              ]}
            />
            <Button>Criar</Button>
          </Content>
        </Box>
      </Container>
    </Form>
  );
}
