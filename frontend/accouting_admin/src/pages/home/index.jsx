import { ContainerHome } from "./style"
import { useState, useEffect } from "react";
import Card from "../../components/card"
import Item from "../../components/item"
import { listExpenses } from "../../services/expenseves/listExpenses";

export default function Home(){
    const [expenses, setExpenses] = useState([])

    const getExpenses =  async (data) => {
        await setExpenses((await listExpenses(data)).data)
     }
    useEffect(() => {
        getExpenses()        
      }, []);
    return(
        <ContainerHome>
           <div style={{padding:"30px"}}>
                {expenses.length ? (
                    <>
                    {
                        expenses.map(expense=><Card month={expense.month}>
                            {expense.expenses.map(
                                expense2=><Item value={expense2.value} name={expense2.name}></Item>
                            )}
                        </Card>)
                    }
                    </>
                ) : <div>algooo</div>

                }
            </div>
        </ContainerHome>
    )
}