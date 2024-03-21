import React from "react";
import Todos from "./components/Todos";
// import AnimateRoutes from "./routes/AnimateRoutes";5

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/LoginPage";
import Layout from "./components/Layout";
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Todos />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login/register" element={<SignUp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
