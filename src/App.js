import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route index element={<Home />}></Route>
    </Routes>
  );
}

export default App;
