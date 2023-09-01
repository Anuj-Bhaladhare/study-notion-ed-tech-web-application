import react from "react";
import Home from "./pages/Home";
import "./index.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Routes>
         <Route patt="/" element={<Home />}/>
      </Routes>
    </div>
  );
}

export default App;
