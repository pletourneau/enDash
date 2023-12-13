// App.js

import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import AuthorizationCallback from "./components/AuthorizationCallback";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";
import "./index.css";

const App = () => {
  return (
    <div id="root" className="main">
      <div className="content">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/callback" element={<AuthorizationCallback />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
      <Footer className="footer" />
    </div>
  );
};

export default App;
