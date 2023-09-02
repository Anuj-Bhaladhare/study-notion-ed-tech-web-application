import "./App.css";
import "./index.css";
import { Routes, Route } from "react-router-dom";
import React from "react";
import Home from "./pages/Home";
import Navbaar from "./components/common/Navbaar";
import Login from "./pages/Login";
import Singup from "./pages/Singup";

function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbaar />
      <Routes>
         <Route path="/" element={<Home />}/>
         <Route path="/login" element={<Login />}/>
         <Route path="/singup" element={<Singup />}/>
      </Routes>
    </div>
  );
}

export default App;
