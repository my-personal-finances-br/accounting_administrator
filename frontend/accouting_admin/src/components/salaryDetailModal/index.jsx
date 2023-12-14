import { Box, CloseButton, Container, Content, SendButton } from "./style";
import { GrFormClose } from "react-icons/gr";
import SalaryItem from "../SalaryItem";
import { useState } from "react";
import SalaryCreateModal from "../SalaryCreateModal";

export default function SalaryDetailModal({
  isOpen,
  setIsOpen,
  data,
  month,
  month_id,
}) {
  const [salaryCreateModal, setSalaryCreateModal] = useState(false);

  const closeModal = (e) => {
    e.preventDefault();
    setIsOpen(false);
  };
  const openSalaryCreateModal = async () => {
    setSalaryCreateModal(true);
  };
  return (
    <Container isOpen={isOpen}>
      <SalaryCreateModal
        isOpen={salaryCreateModal}
        setIsOpen={setSalaryCreateModal}
        setIsOpenFatherModal={setIsOpen}
        month_id={month_id}
      />
      <Box>
        <Content size="unpublish">
          Salarios do mês {month}
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
              data={salary}
            />
          ))}
          <SendButton onClick={openSalaryCreateModal}>
            Adicionar Novo Salario do mês
          </SendButton>
        </Content>
      </Box>
    </Container>
  );
}
