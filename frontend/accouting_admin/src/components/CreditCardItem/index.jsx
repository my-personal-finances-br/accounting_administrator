import "./style.css";
import { deleteCreditCard } from "../../services/creditCards/deleteCreditCard";
import { listCreditCards } from "../../services/creditCards/listCreditCards";

export default function CreditCardItem({ creditCard, setData }) {
  const handleDelete = async () => {
    await deleteCreditCard(creditCard.uuid);
    setData((await listCreditCards()).data);
  };

  return (
    <>
      <div className="ItemC">
        <span className="ItemNameC">
          Nome: <strong>{creditCard.name}</strong>
        </span>
        <span className="ItemClosureC">
          Dia de fechamento: <strong>{creditCard.closure}</strong>
        </span>
        <span className="ItemDeadlineC">
          Dia de vencimento: <strong>{creditCard.deadline}</strong>
        </span>
        <span className="ItemBankC">
          Banco: <strong>{creditCard.bank?.name}</strong>
        </span>
      </div>
      <div className="ButtonContainerC">
        <button onClick={() => handleDelete()}>Excluir</button>
      </div>
    </>
  );
}
