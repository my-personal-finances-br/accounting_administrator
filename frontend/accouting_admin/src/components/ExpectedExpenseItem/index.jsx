import "./style.css";

export default function ExpectedExpenseItem({ value, name }) {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  return (
    <>
      <div className="Item">
        <span>{name}</span>
        <span>{formatCurrency(value)}</span>
      </div>
    </>
  );
}
