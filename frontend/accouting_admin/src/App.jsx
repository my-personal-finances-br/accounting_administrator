import Rout from "./routes";
import { ThemeProvider } from "styled-components";
import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div style={{ backgroundColor: "#6495ED", minHeight: "100vh" }}>
        <Rout />
      </div>
    </ThemeProvider>
  );
}

export default App;
