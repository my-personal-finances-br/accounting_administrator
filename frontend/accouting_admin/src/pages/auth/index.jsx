import { AuthWrapper, Card, WrapperInput, Button } from "./style";
import { Form } from "@unform/web";
import InputUnform from "../../components/form/input/input";
import { useRef } from "react";
import { auth } from "../../services/auth/auth";

export default function Auth() {
  const formRef = useRef(null);

  const handleSubmit = async (data) => {
    await auth(data);
  };

  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <AuthWrapper>
        <Card>
          <WrapperInput>
            <InputUnform placeholder="Usuario" name="username" />
            <InputUnform placeholder="Senha" name="password" />
          </WrapperInput>
          <Button>login</Button>
        </Card>
      </AuthWrapper>
    </Form>
  );
}
