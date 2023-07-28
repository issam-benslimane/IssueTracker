import { Route, Routes } from "react-router";
import { Login } from "../components/Login";
import { Register } from "../components/Register";

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};
