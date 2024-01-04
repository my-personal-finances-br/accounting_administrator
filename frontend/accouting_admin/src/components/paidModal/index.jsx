import { Box, CloseButton, Container, Content, Button } from "./style";
import { GrFormClose } from "react-icons/gr";
import InputUnform from "../../components/form/input/input";
import { Form } from "@unform/web";
import { useRef, useState, useEffect } from "react";
import { updateExpenses } from "../../services/expenseves/updateExpenses";
import { listCreditCards } from "../../services/creditCards/listCreditCards";

export default function PaidModal({
  isOpen,
  setIsOpen,
  name,
  value,
  description,
  id,
  getExpenses,
  deadline,
  monthId,
}) {
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

  const handleSubmit = async (data) => {
    delete data.deadline;
    await updateExpenses(data, id);
    await getExpenses();
    setIsOpen(false);
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
            Gasto em
            <b>
              <em>{name}</em>
            </b>
            <CloseButton onClick={closeModal}>
              <GrFormClose size={18} />
            </CloseButton>
            <InputUnform placeholder="Nome" value={name} name="name" />
            <InputUnform
              placeholder="Descrição"
              value={description}
              name="description"
            />
            <InputUnform
              placeholder="Data de vencimento"
              value={
                deadline ? new Date(deadline).toLocaleDateString("pt-BR") : ""
              }
              name="deadline"
            />
            <InputUnform
              placeholder="Valor"
              type="number"
              value={value}
              name="paid_value"
            />
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
            <Button>Pagar</Button>
          </Content>
        </Box>
      </Container>
    </Form>
  );
}
