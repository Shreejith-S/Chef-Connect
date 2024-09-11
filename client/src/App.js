import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CustomerRoutes from "./Layouts/Customer/CustomerRoutes";
import AdminRoutes from "./Layouts/Admin/AdminRoutes";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/*" element={<CustomerRoutes />} />
        <Route exact path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
