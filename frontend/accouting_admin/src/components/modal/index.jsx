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
  const [deadlineType, setDeadlineType] = useState("");
  const [isFixed, setIsFixed] = useState(false);

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

  const handleDeadlineTypeChange = (event) => {
    setDeadlineType(event.target.value);
  };

  const handleIsFixedChange = (event) => {
    const isFixedValue = event.target.value === "true";
    setIsFixed(isFixedValue);
    if (formRef.current) {
      formRef.current.setFieldValue("is_fixed", isFixedValue);
    }
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
            Data de pagamento
            <InputUnform
              placeholder="Data de pagamento"
              type="date"
              name="deadline"
            />
            <InputUnform placeholder="Valor" type="number" name="value" />
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
            É um gasto fixo?
            <RadioTeste
              type="radio"
              name="is_fixed"
              options={[
                { value: true, label: "Sim", id: "1023o54-023i532" },
                { value: false, label: "Não", id: "104532523o54-023i532" },
              ]}
              onChange={handleIsFixedChange}
            />
            {isFixed && (
              <>
                Data de pamento no mês
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
                    name="fixed_deadline"
                  />
                ) : (
                  <></>
                )}
              </>
            )}
            <Button>Criar</Button>
          </Content>
        </Box>
      </Container>
    </Form>
  );
}
