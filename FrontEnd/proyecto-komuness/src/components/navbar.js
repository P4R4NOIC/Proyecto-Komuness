import React, {useState} from 'react'
import '../CSS/navbar.css'
import {AiOutlineMenu, AiOutlineClose, AiOutlineSearch, AiOutlineUser} from 'react-icons/ai'
import logo from '../imagenes/logo.png'
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
    const [nav, setNav] = useState(false)
    const navigate = useNavigate();

  return (
    <headder className = "navbar">
        <img src ={logo} className = "logo"  alt = "/"></img>
        <nav>
            <ul className = {nav ? ["menu", "activo"].join(' ') : ["menu"]}>
                <li>
                    <a href = "/">Eventos</a>
                </li>
                <li>
                    <a href = "/">Emprendimientos</a>
                </li>
                <li>
                    <a href = "/" >Publicaciones</a>
                </li>
                <li>
                    <a href = "/">Biblioteca</a>
                </li>
               
                <li>
                    <a href = "/" >Crear</a>
                </li>
                <li>
                    <AiOutlineSearch size={25} style = {{marginTop: '6px'}}/>
                </li>
                <li onClick={() => navigate('/perfilUsuario')}>
                    <AiOutlineUser size={25} style = {{marginTop: '6px'}} />
                </li>
              
            </ul>
        </nav>
        <div onClick = {()=> setNav(!nav)} className = "botonMovil">
            {nav ? <AiOutlineClose size = {25}/> : <AiOutlineMenu size = {25}/>}
            
           
        </div>
    </headder>
  )
}

export default Navbar