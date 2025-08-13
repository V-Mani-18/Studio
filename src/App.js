import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import ManagerAdministration from "./components/mangerComponents/ManagerAdministration";
import ManagerHome from "./components/mangerComponents/ManagerHome";
import ClientPage from "./components/mangerComponents/ClientPage";
import PaymentPage from "./components/mangerComponents/PaymentPage";
import AdminHome from "./components/adminComponents/AdminHome";
import UserManagement from "./components/adminComponents/UserManagement";
import UserDetails from "./components/adminComponents/UserDetails";

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
        </Route>
        <Route path="/admin-home" element={<AdminHome />}>
          <Route path="users" element={<UserManagement />} />
          <Route path="user/:id" element={<UserDetails />} />
          {/* Add more nested routes here if needed */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
