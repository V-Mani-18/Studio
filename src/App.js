import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import ManagerAdministration from "./components/mangerComponents/ManagerAdministration";
import ManagerHome from "./components/mangerComponents/ManagerHome";
import ClientPage from "./components/mangerComponents/ClientPage";
import PaymentPage from "./components/mangerComponents/PaymentPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/manager-dashboard" element={<ManagerAdministration />}>
          <Route index element={<Navigate to="home" replace />} />
          <Route path="home" element={<ManagerHome />} />
          <Route path="clients" element={<ClientPage />} />
          <Route path="payment" element={<PaymentPage />} />
          {/* Add more nested routes here if needed */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;