import {
  ContainerHome,
  MonthButton,
  CardContainer,
  CardContent,
} from "./style";
import { useState, useEffect } from "react";
import Card from "../../components/card";
import ExpenseItem from "../../components/ExpenseItem";
import { listExpenses } from "../../services/expenseves/listExpenses";
import { createMonthlyExpense } from "../../services/expenseves/createMonthlyExpense";
import Header from "../../components/header";
import { listCreditCards } from "../../services/creditCards/listCreditCards";

export default function Home() {
  const [creditCards, setCreditCards] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const getExpenses = async (data) => {
    await setExpenses((await listExpenses(data)).data);
  };
  const getCreditCards = async () => {
    await setCreditCards((await listCreditCards()).data);
  };
  const createListMonthlyExpense = async (data) => {
    await createMonthlyExpense();
    getExpenses();
  };
  useEffect(() => {
    getExpenses();
    getCreditCards();
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
          <MonthButton onClick={createListMonthlyExpense}>Novo mês</MonthButton>
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
                    month_data={expense}
                  >
                    <CardContainer>
                      <CardContent>
                        {Object.keys(expense.expenses).map((cardKey) => (
                          <div key={cardKey}>
                            {cardKey !== "no_card" ? (
                              <p>
                                {" "}
                                Gastos no cartão: <strong>{cardKey}</strong>
                                <br />
                                Data de fechamento:{" "}
                                <strong>
                                  {new Date(
                                    expense.expenses[cardKey]["closure"],
                                  ).toLocaleDateString("pt-BR")}
                                </strong>
                                <br />
                                Data de vencimento:{" "}
                                <strong>
                                  {new Date(
                                    expense.expenses[cardKey]["deadline"],
                                  ).toLocaleDateString("pt-BR")}
                                </strong>
                              </p>
                            ) : (
                              <strong>Gastos fora do cartão</strong>
                            )}
                            {expense.expenses[cardKey]["expenses"].map(
                              (expense2) => (
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
                                  creditCards={creditCards}
                                  credit_card={{
                                    uuid: expense2.credit_card?.uuid,
                                    name: expense2.credit_card?.name,
                                  }}
                                />
                              ),
                            )}
                          </div>
                        ))}
                      </CardContent>
                    </CardContainer>
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
