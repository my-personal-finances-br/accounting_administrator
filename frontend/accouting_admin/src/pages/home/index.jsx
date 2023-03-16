import { ContainerHome } from "./style"
import { useState, useEffect } from "react";
import Card from "../../components/card"
import Item from "../../components/item"
import { listExpenses } from "../../services/expenseves/listExpenses";
import Header from "../../components/header"

export default function Home(){
    const [expenses, setExpenses] = useState([])

    const getExpenses =  async (data) => {
        await setExpenses((await listExpenses(data)).data)
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
                            expenses.map(expense=><Card month={expense.month} id={expense.id}>
                                {expense.expenses.map(
                                    expense2=><Item value={expense2.value} name={expense2.name}></Item>
                                )}
                            </Card>)
                        }
                        </>
                    ) : <div>algooo</div>

                    }
                </div>
                <button onClick={""} style={{padding:"10px", borderRadius: "70px", backgroundColor: "lightgreen", marginLeft: "40%", fontSize: "50px", color: "white", border: "none", cursor: "pointer"}}>+</button>
            </ContainerHome>
            
            </div>
        </>
    )
}