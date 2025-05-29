import React, { useState } from "react";
import "../CSS/navbar.css";
import {
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineUser,
} from "react-icons/ai";
import logo from "../images/logo.png";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  var usuario = JSON.parse(localStorage.getItem("user"));

  console.log(usuario)
  var goToLogin;
  if(usuario !== null ){
    goToLogin = true;
  }else{
    goToLogin = false;
  }
  


  const [nav, setNav] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    setNav(false); 
  };

  return (
    <header className="navbar">
     <a href = "*"><img src={logo} className="logo" alt="/" /></a> 
      <nav>
        <ul className={nav ? ["menu", "activo"].join(" ") : ["menu"]}>
          <li onClick={() => handleNavigation("/publicaciones")}>
            <span>Publicaciones</span>
          </li>
          <li onClick={() => handleNavigation("/eventos")}>
            <span>Eventos</span>
          </li>
          <li onClick={() => handleNavigation("/emprendimientos")}>
            <span>Emprendimientos</span>
          </li>
          <li onClick={() => handleNavigation("/biblioteca")}>
            <span>Biblioteca</span>
          </li>
         
          <li onClick={() => handleNavigation(goToLogin ? "/perfilUsuario" : "/iniciarSesion")}>
            <AiOutlineUser size={25} style={{ marginTop: "6px" }} />
        </li>
        </ul>
      </nav>
      <div onClick={() => setNav(!nav)} className="botonMovil">
        {nav ? <AiOutlineClose size={25} /> : <AiOutlineMenu size={25} />}
      </div>
    </header>
  );
};

export default Navbar;
