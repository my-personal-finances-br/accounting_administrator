import React, { useRef } from "react";
import { Box, CloseButton, Container, Content, Button } from "./style";
import { GrFormClose } from "react-icons/gr";
import formatCurrency from "../../utils/formatCurrent";

export default function MonthDetailModal({ isOpen, setIsOpen, data }) {
  const textToCopy = `*Detalhes do mês ${data.month}* -\n
*Entrada* - ${formatCurrency(data.salary_total)}
*Total a ser pago* - ${formatCurrency(data.total)}
*Já pago* - ${formatCurrency(data.paid)}
*Falta pagar* - ${formatCurrency(data.to_pay)}
*Tentar economizar* - ${formatCurrency(data.to_save)}
*Dinheiro restante* - ${formatCurrency(data.salary_left)}`;

  const textareaRef = useRef(null);

  const closeModal = (e) => {
    e.preventDefault();
    setIsOpen(false);
  };

  const copyToClipboard = () => {
    textareaRef.current.select();
    document.execCommand("copy");
  };

  return (
    <Container isOpen={isOpen}>
      <Box>
        <Content size="unpublish">
          Detalhes do mês
          <b>
            <em>{data.month}</em>
          </b>
          <CloseButton onClick={closeModal}>
            <GrFormClose size={18} />
          </CloseButton>
          <Content>Entradas - {formatCurrency(data.salary_total)}</Content>
          <Content>Total a ser pago - {formatCurrency(data.total)}</Content>
          <Content>Já pago - {formatCurrency(data.paid)}</Content>
          <Content>Falta pagar - {formatCurrency(data.to_pay)}</Content>
          <Content>Tentar economizar - {formatCurrency(data.to_save)}</Content>
          <Content>Dinheiro restante - {formatCurrency(data.salary_left)}</Content>
          <textarea
            ref={textareaRef}
            style={{ position: "absolute", left: "-9999px" }}
            value={textToCopy}
            readOnly
          />
          <Button onClick={copyToClipboard}>
            Copiar para a área de transferência
          </Button>
        </Content>
      </Box>
    </Container>
  );
}
