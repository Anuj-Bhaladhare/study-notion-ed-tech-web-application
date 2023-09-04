import { Routes, Route } from "react-router-dom";
import React from "react";
import "./App.css";

import OpenRoute from "./components/core/Auth/OpenRoute";
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

         <Route path="/login" 
                element={
                          <OpenRoute> 
                            <Login /> 
                          </OpenRoute>
                        }
          />

         <Route path="/singup" 
                element={
                          <OpenRoute> 
                            <Singup /> 
                          </OpenRoute>
                        }
          />

      </Routes>
    </div>
  );
}

export default App;
