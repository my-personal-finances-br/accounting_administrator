import { BrowserRouter, Link } from "react-router-dom"
import Routes from "./routes"

function App() {
 
  return (
    <div style={{backgroundColor: '#6495ED', minHeight: '100vh'}}>
    <BrowserRouter>
      <Routes/>
    </BrowserRouter>
    </div>
  )
}

export default App