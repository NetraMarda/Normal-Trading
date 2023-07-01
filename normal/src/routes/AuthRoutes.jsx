import { Route, Routes } from "react-router-dom";
import LoginIn from "../pages/login/login";

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/Login" element={<LoginIn />} />
    </Routes>
  );
};
