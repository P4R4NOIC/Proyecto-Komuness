import React, {useState} from 'react'
import '../CSS/navbar.css'
import {AiOutlineMenu, AiOutlineClose, AiOutlineSearch, AiOutlineUser} from 'react-icons/ai'
import logo from '../images/logo.png'
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
    const [nav, setNav] = useState(false)
    const navigate = useNavigate();
   

  


  return (
    <header className = "navbar">
        <img src ={logo} className = "logo"  alt = "/"></img>
        <nav>
            <ul className = {nav ? ["menu", "activo"].join(' ') : ["menu"]}>
                <li onClick={() => navigate('/eventos')}>
                    <span  >Eventos</span>
                </li>
                <li onClick={() => navigate('/emprendimientos')}>
                    <span >Emprendimientos</span>
                </li>
                <li onClick={() => navigate('/publicaciones')}>
                    <span  >Publicaciones</span>
                </li>
                <li onClick={() => navigate('/vacioPrueba')}>
                    <span >Biblioteca</span>
                </li>
               
                <li onClick={() => navigate('/vacioPrueba')}>
                    <span>Crear</span>
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
    </header>
  )
}

export default Navbar