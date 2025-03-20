import React from 'react'
import { AiOutlineUser } from 'react-icons/ai'
import {Publicaciones} from './publicaciones'

import '../CSS/perfilUsuario.css'

export const PerfilUsuario = () => {


  return (
    <div>

      <div className = "paginaUsuario">
        <AiOutlineUser size = {300}/>

        <div>
          <div>
            <span>Nombre de usuario</span>
          </div>
          <div>
            <a href ="mailto:correo@ejemoplo.com">correo@ejemplo.com</a>
          </div>
        </div>
        
        
      </div>

    
      <Publicaciones />
     
      
    </div>
  )
}

export default PerfilUsuario