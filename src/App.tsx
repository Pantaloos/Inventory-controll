import "./App.scss";
import MainPage from "./Routes/MainPage";
import AddForm from "./Routes/AddForm";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage></MainPage>}></Route>
        <Route path="/add" element={<AddForm></AddForm>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
