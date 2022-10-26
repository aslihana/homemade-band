import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClientProvider, QueryClient } from 'react-query'
import Add from "./pages/Add";
import Members from "./pages/Members";
import Update from "./pages/Update";
import "./style.css";

const client = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={client}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Members/>}/>
            <Route path="/add" element={<Add/>}/>
            <Route path="/update/:id" element={<Update/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </QueryClientProvider>
  );
}

export default App;
