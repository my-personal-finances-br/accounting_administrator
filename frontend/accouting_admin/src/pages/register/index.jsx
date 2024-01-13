import { AuthWrapper, Card, WrapperInput, Button } from "./style";
import { Form } from "@unform/web";
import InputUnform from "../../components/form/input/input";
import { useRef } from "react";
import { register } from "../../services/auth/register";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Register() {
  const formRef = useRef(null);
  const navigate = useNavigate();
  const handleSubmit = async (data) => {
    if (data.new_password !== data.new_password_confirmation) {
      window.alert("Senhas são diferentes");
      return;
    }
    delete data.password_confirmation;
    await register(data);
    navigate("/");
  };

  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <AuthWrapper>
        <Card>
          <WrapperInput>
            <InputUnform
              placeholder="Usuario"
              name="username"
              style={{ border: "1px solid #ccc" }}
            />
            <InputUnform
              placeholder="Email"
              name="email"
              style={{ border: "1px solid #ccc" }}
            />
            <InputUnform
              placeholder="Primeiro Nome"
              name="first_name"
              style={{ border: "1px solid #ccc" }}
            />
            <InputUnform
              placeholder="Ultimo Nome"
              name="last_name"
              style={{ border: "1px solid #ccc" }}
            />
            <InputUnform
              type="password"
              placeholder="Senha"
              name="password"
              style={{ border: "1px solid #ccc" }}
            />
            <InputUnform
              type="password"
              placeholder="Confirme a Senha"
              name="password_confirmation"
              style={{ border: "1px solid #ccc" }}
            />
          </WrapperInput>
          Já tem uma conta? <Link to="/login">Login</Link>
          <Button>Registre-se</Button>
        </Card>
      </AuthWrapper>
    </Form>
  );
}
