import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { Publicaciones } from "./publicaciones";

import "../CSS/perfilUsuario.css";

export const PerfilUsuario = () => {
  return (
    <div>
      <div className="paginaUsuario bg-gray-800/80 p-6 rounded-lg flex flex-col items-center gap-4 md:flex-row md:items-start md:gap-8">
        <AiOutlineUser size={150} className="text-white" />

        <div className="text-white text-center md:text-left">
          <div>
            <span className="text-xl font-semibold">Nombre de usuario</span>
          </div>
          <div>
            <a
              href="mailto:correo@ejemplo.com"
              className="text-blue-400 hover:underline"
            >
              correo@ejemplo.com
            </a>
          </div>
        </div>
      </div>

      <Publicaciones />
    </div>
  );
};

export default PerfilUsuario;
