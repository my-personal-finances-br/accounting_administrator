import { Box, CloseButton, Container, Content, SendButton } from "./style";
import { GrFormClose } from "react-icons/gr";
import CreditCardItem from "../CreditCardItem";
import CreditCardCreateModal from "../CreditCardCreateModal";
import { useState } from "react";

export default function CreditCardModal({ isOpen, setIsOpen, data, setData }) {
  const [creditCardCreateModal, setCreditCardCreateModal] = useState(false);

  const closeModal = (e) => {
    e.preventDefault();
    setIsOpen(false);
  };

  const openCreditCardCreateModal = async () => {
    setCreditCardCreateModal(true);
  };

  return (
    <Container isOpen={isOpen}>
      <CreditCardCreateModal
        isOpen={creditCardCreateModal}
        setIsOpen={setCreditCardCreateModal}
        setIsOpenFatherModal={setIsOpen}
        setData={setData}
      />
      <Box>
        <Content size="unpublish">
          <strong>Cartões de credito</strong>
          <CloseButton onClick={closeModal}>
            <GrFormClose size={18} />
          </CloseButton>
          {data.map((creditCard) => (
            <CreditCardItem
              key={creditCard.uuid}
              creditCard={creditCard}
              setData={setData}
            ></CreditCardItem>
          ))}
          <SendButton onClick={openCreditCardCreateModal}>
            Adicionar Novo Cartão de credito
          </SendButton>
        </Content>
      </Box>
    </Container>
  );
}
