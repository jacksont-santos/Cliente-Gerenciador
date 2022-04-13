import { React } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "./icones/SUA-MARCA1.png";
import "./navbar1.css";

export default function Navbar1() {
  const navigate = useNavigate();
  const sobre = () => navigate("/sobre");
  const inicio = () => navigate("/");

  return (
    <nav id="navbar1">
      <ul>
        <li onClick={inicio}>
            <img src={Logo} alt="Restoque" id="logoBlack"/>
        </li>
        <li onClick={sobre}><h1>SOBRE NÓS</h1></li>
      </ul>
    </nav>
  );
}
