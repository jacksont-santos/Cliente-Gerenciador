import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Admin from "./pages/admin";
import Sobre from "./pages/aboutUS";
import "./app.css";

const App = () => {

    return (
    <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/sobre"} element={<Sobre />} />
        <Route path={"/Admin"} element={<Admin />} />
    </Routes>
    )
};

export default App