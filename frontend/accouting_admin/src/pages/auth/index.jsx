import { AuthWrapper, Card, WrapperInput, Button } from "./style";
import { Form } from "@unform/web";
import InputUnform from "../../components/form/input/input";
import { useRef } from "react";
import { auth } from "../../services/auth/auth";
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const formRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    await auth(data);
    navigate('/');
    window.location.reload();
  };

  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <AuthWrapper>
        <Card>
          <WrapperInput>
            <InputUnform placeholder="Usuario" name="username" />
            <InputUnform type="password" placeholder="Senha" name="password" />
          </WrapperInput>
          <Button>login</Button>
        </Card>
      </AuthWrapper>
    </Form>
  );
}
