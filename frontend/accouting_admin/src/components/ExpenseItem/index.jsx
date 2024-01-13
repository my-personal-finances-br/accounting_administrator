import {
  ItemContainer,
  RedText,
  GreenText,
  OrangeText,
  ButtonContainer,
  Button,
} from "./style.js";
import { useState } from "react";
import PaidModal from "../paidModal";
import { deleteExpenses } from "../../services/expenseves/deleteExpenses";
import formatCurrency from "../../utils/formatCurrent";
export default function ExpenseItem({
  value,
  name,
  description,
  paid_value,
  id,
  getExpenses,
  monthId,
  deadline,
  credit_card,
  creditCards,
}) {
  const [modalOpen, setPaidModalOpen] = useState(false);

  const handleDelete = async () => {
    await deleteExpenses(id);
    await getExpenses();
  };

  const isDeadlinePassed = deadline && new Date(deadline) < new Date();

  let dateComponent;
  if (!paid_value && deadline && new Date(deadline) > new Date()) {
    dateComponent = (
      <OrangeText>
        {deadline ? new Date(deadline).toLocaleDateString("pt-BR") : ""}
      </OrangeText>
    );
  } else if (!isDeadlinePassed || paid_value) {
    dateComponent = (
      <GreenText>
        {deadline ? new Date(deadline).toLocaleDateString("pt-BR") : ""}
      </GreenText>
    );
  } else {
    dateComponent = (
      <RedText>
        {deadline ? new Date(deadline).toLocaleDateString("pt-BR") : ""}
      </RedText>
    );
  }

  return (
    <>
      <PaidModal
        monthId={monthId}
        getExpenses={getExpenses}
        isOpen={modalOpen}
        setIsOpen={setPaidModalOpen}
        id={id}
        name={name}
        value={value}
        description={description}
        deadline={deadline}
        credit_card={credit_card}
        creditCards={creditCards}
      />
      <ItemContainer>
        <span>{name}</span>
        {dateComponent}
        <span>
          {paid_value ? formatCurrency(paid_value) : formatCurrency(value)}
        </span>
      </ItemContainer>
      <ButtonContainer>
        {paid_value ? (
          <></>
        ) : (
          <Button onClick={() => setPaidModalOpen(true)}>Pagar</Button>
        )}

        <Button onClick={() => handleDelete(id)}>Excluir</Button>
        <Button onClick={() => setPaidModalOpen(true)}>Editar</Button>
      </ButtonContainer>
    </>
  );
}
