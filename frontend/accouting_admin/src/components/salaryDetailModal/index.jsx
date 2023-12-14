import { Box, CloseButton, Container, Content, AreaMessage } from "./style";
import { GrFormClose } from "react-icons/gr";
import SalaryItem from "../SalaryItem";

export default function SalaryDetailModal({ isOpen, setIsOpen, data }) {
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
          Salario do mês
          <b>
            <em>{data.month}</em>
          </b>
          <CloseButton onClick={closeModal}>
            <GrFormClose size={18} />
          </CloseButton>
          {data.map((salary) => (
            <SalaryItem
              key={salary.uuid}
              id={salary.uuid}
              value={salary.net}
              name={salary.name}
            />
          ))}
        </Content>
      </Box>
    </Container>
  );
}
