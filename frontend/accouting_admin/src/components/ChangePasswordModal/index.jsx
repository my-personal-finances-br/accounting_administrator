import { Box, CloseButton, Container, Content, SendButton } from "./style";
import { GrFormClose } from "react-icons/gr";
import { Form } from "@unform/web";
import { useRef } from "react";
import InputUnform from "../form/input/input";
import { changePassword } from "../../services/auth/changePassword";

export default function ChangePasswordModal({ isOpen, setIsOpen }) {
  const formRef = useRef(null);
  const closeModal = (e) => {
    e.preventDefault();
    setIsOpen(false);
  };

  const handleSubmit = async (data) => {
    if (data.new_password !== data.new_password_confirmation) {
      window.alert("Novas senhas são diferentes");
      return;
    }

    const response = await changePassword(data);
    if (response.response?.status === 403) {
      window.alert("Senha antiga errada.");
    } else {
      setIsOpen(false);
      window.alert("Você redefiniu a senha.");
    }
  };

  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <Container isOpen={isOpen}>
        <Box>
          <Content size="unpublish">
            Mudar senha
            <CloseButton onClick={closeModal}>
              <GrFormClose size={18} />
            </CloseButton>
            <InputUnform
              placeholder="Digite a senha antiga"
              type="password"
              name="old_password"
            />
            <InputUnform
              placeholder="Digite a nova senha"
              type="password"
              name="new_password"
            />
            <InputUnform
              placeholder="Confirme a nova senha"
              type="password"
              name="new_password_confirmation"
            />
            <SendButton>Mudar senha</SendButton>
          </Content>
        </Box>
      </Container>
    </Form>
  );
}
