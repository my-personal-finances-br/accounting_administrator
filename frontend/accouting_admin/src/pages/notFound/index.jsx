// import bg404 from "../../assets/bg404.png";
import { Card, Container404, HeaderH1, Img, ContainerTitles, SubTitle } from "./style";
import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <Container404>
      <Card>
        {/* <Img src={bg404} /> */}
        <ContainerTitles>
          <HeaderH1>404</HeaderH1>
         <SubTitle>Opa! Pagina não encontrada</SubTitle>
         <Link to="/" >
          Voltar para o início
        </Link>
        </ContainerTitles>
      </Card>
    </Container404>
  );
}