import { AuthWrapper, Card, WrapperInput, Button } from "./style";
import { Form } from "@unform/web";
import InputUnform from "../../components/form/input/input";
import { useRef, useState } from "react";
import { auth } from "../../services/auth/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Auth() {
  const formRef = useRef(null);
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(false);

  const handleSubmit = async (data) => {
    try {
      await auth(data);
      navigate("/");
      window.location.reload();
    } catch (error) {
      setLoginError(true);
    }
  };

  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <AuthWrapper>
        <Card>
          <WrapperInput>
            {loginError ? <p>SENHA ERRADA </p> : <></>}
            <InputUnform
              placeholder="Usuario"
              name="username"
              style={{
                border: loginError ? "1px solid red" : "1px solid #ccc",
              }}
            />
            <InputUnform
              type="password"
              placeholder="Senha"
              name="password"
              style={{
                border: loginError ? "1px solid red" : "1px solid #ccc",
              }}
            />
          </WrapperInput>
          Não tem uma conta? <Link to="/register">Cadastre-se</Link>
          <Button>Login</Button>
        </Card>
      </AuthWrapper>
    </Form>
  );
}
