import { BrowserRouter, Link } from "react-router-dom"
import Routes from "./routes"

function App() {
 
  return (
    <div style={{backgroundColor: '#262738', minHeight: '100vh'}}>
    <BrowserRouter>
      <Routes/>
    </BrowserRouter>
    </div>
  )
}

export default App