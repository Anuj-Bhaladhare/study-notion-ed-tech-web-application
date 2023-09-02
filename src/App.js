import "./App.css";
import "./index.css";
import { Routes, Route } from "react-router-dom";
import React from "react";
import Home from "./pages/Home";
import Navbaar from "./components/common/Navbaar";

function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbaar />
      <Routes>
         <Route path="/" element={<Home />}/>
      </Routes>
    </div>
  );
}

export default App;
