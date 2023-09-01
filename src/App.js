import "./App.css";
import "./index.css";
import React from "react";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Routes>
         <Route path="/" element={<Home />}/>
      </Routes>
    </div>
  );
}

export default App;
