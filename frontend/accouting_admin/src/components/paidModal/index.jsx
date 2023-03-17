import { Box, BubbleDialog, CloseButton, Container, WrapperTitle, Content, Button } from "./style"
import { GrFormClose } from 'react-icons/gr';
import InputUnform from "../../components/form/input/input";
import { Form } from "@unform/web";
import { useRef } from "react";
import { createExpenses } from "../../services/expenseves/createExpenses"

export default function PaidModal ({isOpen, setIsOpen, name, value, description, id, getExpenses, monthId}){

  const closeModal = (e) => {
    e.preventDefault()
    setIsOpen(false)
  }
  const formRef = useRef(null)

  const handleSubmit = async (data) => {
    data.expected_paid = id
    data.is_to_fiex = false
    data.monthly_expense=monthId
    await createExpenses(data)
    await getExpenses()
    setIsOpen(false)
 }
  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <Container isOpen={isOpen}>
          <Box>
            <Content size="unpublish">
              Gasto em <b><em>{name}</em></b>
              <CloseButton onClick={closeModal}>
                <GrFormClose size={18} />
              </CloseButton>
              <InputUnform placeholder="Nome" value={name} name="name"/>
              <InputUnform placeholder="Descrição" value={description} name="description"/>
              <InputUnform placeholder="Valor" type="number" value={value} name="value"/>
              <Button>Pagar</Button>
            </Content>
          </Box>
        </Container>
    </Form>
  )
}