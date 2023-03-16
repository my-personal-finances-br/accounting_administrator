import { Box, BubbleDialog, CloseButton, Container, WrapperTitle, Content, Button } from "./style"
import { GrFormClose } from 'react-icons/gr';
import InputUnform from "../../components/form/input/input";
import { Form } from "@unform/web";
import { useRef } from "react";
import { createExpenses } from "../../services/expenseves/createExpenses"

export default function Modal ({isOpen, setIsOpen, id})  {

  const closeModal = (e) => {
    e.preventDefault()
    setIsOpen(false)
  }
  const formRef = useRef(null)

  const handleSubmit = async (data) => {
    data.monthly_expense = id
    await createExpenses(data)
 }
  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <Container isOpen={isOpen}>
          <Box>
            <Content size="unpublish">
              Novo Gasto
              <CloseButton onClick={closeModal}>
                <GrFormClose size={18} />
              </CloseButton>
              <InputUnform placeholder="Nome" name="name"/>
              <InputUnform placeholder="Descrição" name="description"/>
              <InputUnform placeholder="Valor" type="number" name="value"/>
              <InputUnform placeholder="isto sera um boolean" name="isto sera um boolean"/>
              <Button>Algo</Button>
            </Content>
          </Box>
        </Container>
    </Form>
  )
}