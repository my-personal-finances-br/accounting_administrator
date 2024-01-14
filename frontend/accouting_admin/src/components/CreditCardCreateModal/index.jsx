import { Box, CloseButton, Container, Content, SendButton } from "./style";
import { GrFormClose } from "react-icons/gr";
import { Form } from "@unform/web";
import { useRef, useState, useEffect } from "react";
import InputUnform from "../form/input/input";
import { bankList } from "../../services/banks/bankList";
import { creditCardCreate } from "../../services/creditCards/creditCardCreate";
import { listCreditCards } from "../../services/creditCards/listCreditCards";

export default function CreditCardCreateModal({
  isOpen,
  setIsOpen,
  setIsOpenFatherModal,
  setData
}) {
  const formRef = useRef(null);
  const [bank, setBank] = useState("");
  const [banks, setBanks] = useState([]);

  const closeModal = (e) => {
    e.preventDefault();
    setIsOpen(false);
  };

  useEffect(() => {
    getBanks();
  }, []);

  const getBanks = async () => {
    const listBanks = (await bankList()).data;
    if (listBanks) {
      setBanks(listBanks);
    }
  };

  const handleSubmit = async (data) => {
    await creditCardCreate(data);
    setData((await listCreditCards()).data);
    setIsOpen(false);
  };

  const handleBankChange = (event) => {
    setBank(event.target.value);
  };

  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <Container isOpen={isOpen}>
        <Box>
          <Content size="unpublish">
            Adicionar novo Cartão de credito
            <CloseButton onClick={closeModal}>
              <GrFormClose size={18} />
            </CloseButton>
            <InputUnform placeholder="Nome" name="name" />
            <InputUnform
              placeholder="Dia de fechamento da fatura"
              type="number"
              name="closure"
            />
            <InputUnform
              placeholder="Dia de pagamento da fatura"
              type="number"
              name="deadline"
            />
            Bancos:
            <InputUnform
              as="select"
              name="bank"
              value={bank}
              onChange={handleBankChange}
            >
              {banks.map((bankOption) => (
                <option key={bankOption.uuid} value={bankOption.uuid}>
                  {bankOption.name}
                </option>
              ))}
            </InputUnform>
            <SendButton>Adicionar</SendButton>
          </Content>
        </Box>
      </Container>
    </Form>
  );
}
