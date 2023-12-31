import { ContainerHome } from "./style";
import { useState, useEffect } from "react";
import Card from "../../components/card";
import ExpenseItem from "../../components/ExpenseItem";
import { listExpenses } from "../../services/expenseves/listExpenses";
import { createMonthlyExpense } from "../../services/expenseves/createMonthlyExpense";
import Header from "../../components/header";

export default function Home() {
  const [expenses, setExpenses] = useState([]);

  const getExpenses = async (data) => {
    await setExpenses((await listExpenses(data)).data);
  };
  const createListMonthlyExpense = async (data) => {
    await createMonthlyExpense();
    getExpenses();
  };
  useEffect(() => {
    getExpenses();
  }, []);

  return (
    <>
      <Header />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ContainerHome>
          <button
            onClick={createListMonthlyExpense}
            style={{
              padding: "10px",
              borderRadius: "20px",
              backgroundColor: "#226feb",
              marginLeft: "41%",
              fontSize: "20px",
              color: "white",
              border: "none",
              cursor: "pointer",
              marginTop: "1%",
            }}
          >
            Novo mês
          </button>
          <div style={{ padding: "30px" }}>
            {expenses && expenses.length ? (
              <>
                {expenses.map((expense) => (
                  <Card
                    key={expense.uuid}
                    partial_total={expense.total}
                    month={expense.month}
                    id={expense.uuid}
                    getExpenses={getExpenses}
                  >
                    {expense.expenses.map((expense2) => (
                      <ExpenseItem
                        key={expense2.uuid}
                        monthId={expense.id}
                        getExpenses={getExpenses}
                        id={expense2.uuid}
                        paid_value={expense2.paid_value}
                        value={expense2.value}
                        name={expense2.name}
                        description={expense2.description}
                        deadline={expense2.deadline}
                      ></ExpenseItem>
                    ))}
                  </Card>
                ))}
              </>
            ) : (
              <div></div>
            )}
          </div>
        </ContainerHome>
      </div>
    </>
  );
}
