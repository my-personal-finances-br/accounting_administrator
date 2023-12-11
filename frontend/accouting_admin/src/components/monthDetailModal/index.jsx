import { Box, CloseButton, Container, Content, Button } from "./style";
import { GrFormClose } from "react-icons/gr";

export default function MonthDetailModal({ isOpen, setIsOpen, data }) {
  const closeModal = (e) => {
    e.preventDefault();
    setIsOpen(false);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  return (
    <Container isOpen={isOpen}>
      <Box>
        <Content size="unpublish">
          Detalhes do mês{" "}
          <b>
            <em>{data.month}</em>
          </b>
          <CloseButton onClick={closeModal}>
            <GrFormClose size={18} />
          </CloseButton>
          <Content>Salario - {formatCurrency(data.salary_total)}</Content>
          <Content>Total a ser pago - {formatCurrency(data.total)}</Content>
          <Content>Falta pagar - {formatCurrency(data.to_pay)}</Content>
          <Content>Tentar economizar - {formatCurrency(data.to_save)}</Content>
        </Content>
      </Box>
    </Container>
  );
}
