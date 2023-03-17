import { ContainerHome } from "./style"
import { useState, useEffect } from "react";
import Card from "../../components/card"
import Item from "../../components/item"
import { listExpenses } from "../../services/expenseves/listExpenses";
import {createMonthlyExpense} from "../../services/expenseves/createMonthlyExpense"
import Header from "../../components/header"

export default function Home(){
    const [expenses, setExpenses] = useState([])

    const getExpenses =  async (data) => {
        await setExpenses((await listExpenses(data)).data)
    }
    const createListMonthlyExpense =  async (data) => {
        await createMonthlyExpense()
        getExpenses()
    }
    useEffect(() => {
        getExpenses()
      }, []);
      
    return(
        <>
            <Header/>
            <div style={{display: 'flex', alignItems: "center", justifyContent: 'center'}}>
            <ContainerHome>
                <div style={{padding:"30px"}}>
                    {expenses.length ? (
                        <>
                        {
                            expenses.map(expense=><Card partial_total={expense.partial_total} month={expense.month} id={expense.id} getExpenses={getExpenses}>
                                {expense.expenses.map(
                                    expense2=><Item monthId={expense.id} getExpenses={getExpenses} id={expense2.id} value={expense2.value} name={expense2.name} description={expense2.description} is_fixed={expense2.is_fixed}></Item>
                                )}
                            </Card>)
                        }
                        </>
                    ) : <div></div>

                    }
                </div>
                <button onClick={createListMonthlyExpense} style={{padding:"10px", borderRadius: "70px", backgroundColor: "#6959CD", marginLeft: "40%", fontSize: "50px", color: "white", border: "none", cursor: "pointer"}}>+</button>
            </ContainerHome>
            
            </div>
        </>
    )
}