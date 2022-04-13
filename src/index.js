import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter,Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Admin from "./pages/admin";
import Sobre from "./pages/aboutUS";
import axios from "axios";

axios.defaults.baseURL = 'https://blue-march.herokuapp.com';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter> 
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/sobre"} element={<Sobre />} />
        <Route path={"/Admin"} element={<Admin />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
