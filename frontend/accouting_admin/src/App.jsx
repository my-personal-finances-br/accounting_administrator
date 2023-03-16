import { BrowserRouter, Link } from "react-router-dom"
import Header from "./components/header"
import Routes from "./routes"

function App() {
 
  return (
    <div style={{backgroundColor: '#262738'}}>
    <BrowserRouter>
      <Header />
      <Routes/>
    </BrowserRouter>
    </div>
  )
}

export default App