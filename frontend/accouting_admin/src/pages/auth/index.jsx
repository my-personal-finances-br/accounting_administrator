import {
  Bolder,
  Card,
  Container,
  FormContainer,
  FormContent,
  Header,
  Image,
  ImageContainer,
  LogoContainer,
  Row,
  SubTitle,
  Title,
} from "./style";
import { Form } from "@unform/web";
import InputUnform from "../../components/form/input/input";
import { useRef, useState } from "react";
import { auth } from "../../services/auth/auth";
import { getMe } from "../../services/me/getMe";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import PigLogo from "../../assets/pig_logo.svg";
import MinhasFinancas from "../../assets/minhas_financas.svg";

export default function Auth() {
  const formRef = useRef(null);
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(false);

  const handleSubmit = async (data) => {
    try {
      await auth(data);
      navigate("/");
      localStorage.setItem("me", JSON.stringify((await getMe()).data));
      window.location.reload();
    } catch (error) {
      setLoginError(true);
    }
  };

  return (
    <Container>
      <Card>
        <ImageContainer>
          <Image />
        </ImageContainer>
        <Form
          style={{ display: "contents" }}
          ref={formRef}
          onSubmit={handleSubmit}
        >
          <FormContainer>
            <FormContent>
              <LogoContainer>
                <img width={48} src={PigLogo} />
                <img width={240} src={MinhasFinancas} />
              </LogoContainer>
              <Header>
                <Title>Bem-vindo!</Title>
                <SubTitle>entre para controlar sua vida financeira.</SubTitle>
              </Header>
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
              <Button title="Entrar" />
              <Row>
                <Bolder>Não tem uma conta?</Bolder>
                <Link to="/register">Cadastre-se</Link>
              </Row>
            </FormContent>
          </FormContainer>
        </Form>
      </Card>
    </Container>
  );
}
