// App.js

import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import AuthorizationCallback from "./components/AuthorizationCallback";
import Dashboard from "./components/Dashboard";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/callback" element={<AuthorizationCallback />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default App;
