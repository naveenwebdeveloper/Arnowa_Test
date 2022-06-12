import './App.css';
import Login from './login.js';
import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import Home from './home.js';
import forpage from './forpage';

function App() {
  return (
    <div className="App" >
      {/* <Login /> */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" component={forpage} />
      </Routes>
    </div>
  );
}

export default App;