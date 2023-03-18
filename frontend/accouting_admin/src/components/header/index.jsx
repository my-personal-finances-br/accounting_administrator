import { HeaderDiv, Nav, Container } from "./style";
import { logout } from "../../services/auth/logout"

export default function Header () {

  const doLogout =  async (data) => {
    logout()
    window.location.reload(false)
}


  return (
    <HeaderDiv>
     <Container>
      <span>Finanças</span>
        <Nav>
          <button>Gastos fixos</button>
          <button><a arget="_blank" href="http://localhost:8000/api-auth/login/">login</a></button>
          <button onClick={doLogout} >sair</button>
        </Nav>
     </Container>
    </HeaderDiv>
  )
}