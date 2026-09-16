import React from "react";
import { Route, Routes } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import UserDashboard from "./pages/userDashboard";
import AdminDashboard from "./pages/AdminDashboard";

import ProtectedRoute from "./ProtectedRoute";
import NotFoundPage from "./pages/NotFoundPage";
import UsersTable from "./components/admin/UsersTable";

const App = () => {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/" element={<LoginPage />} />
      <Route path="/ch" element={<UsersTable />} />

      {/* User Dashboard */}
      <Route
        path="/User-Dashboard"
        element={
          <ProtectedRoute allowedRole="User">
            <UserDashboard />
          </ProtectedRoute>
        }
      />

      {/* Admin Dashboard */}
      <Route
        path="/Admin-Dashboard"
        element={
          <ProtectedRoute allowedRole="Admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
