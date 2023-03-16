import { ContainerHome } from "./style"
import { useState, useEffect } from "react";
import Card from "../../components/card"
import Item from "../../components/item"
import { listExpenses } from "../../services/expenseves/listExpenses";
import { Object } from "./object";
import Modal from "../../components/modal";

export default function Home(){
    const [expenses, setExpenses] = useState(Object)
    const [modalOpen, setModalOpen] = useState(false)

    

    const getExpenses =  async (data) => {
        // await setExpenses((await listExpenses(data)).data)
     }
    useEffect(() => {
        getExpenses()        
      }, []);
    return(
        <div style={{display: 'flex', alignItems: "center", justifyContent: 'center'}}>
            <Modal isOpen={modalOpen} setIsOpen={setModalOpen}/>
        <ContainerHome>
           <div style={{padding:"30px"}}>
                {expenses.length ? (
                    <>
                    {
                        expenses.map(expense=><Card month={expense.month} setModalOpen={setModalOpen}>
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
        </div>
    )
}