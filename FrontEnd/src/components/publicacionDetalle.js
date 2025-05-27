import { IoMdArrowRoundBack } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Slider from "./slider";
import ComentariosPub from "./comentariosPub";

export const PublicacionDetalle = () => {
  const location = useLocation();
  const navigate = useNavigate();

  var usuario = JSON.parse(localStorage.getItem("user"))

  const [comentarios, setComentarios] = useState([]);
  const publicacion = location.state?.publicacion;

  useEffect(() => {
    if (publicacion?.comentarios) {
      setComentarios(publicacion.comentarios);
    }
  }, [publicacion]);

  if (!publicacion) {
    return (
      <h2 className="text-center text-xl font-semibold mt-10">
        Publicación no encontrada
      </h2>
    );
  }

  return (
    <div className="min-h-screen bg-gray-800/80">
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        <div className="md:hidden flex justify-between w-full mb-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="text-gray-600 text-2xl font-bold"
          >
            <IoMdArrowRoundBack color={"white"} size={35} />
          </button>
        </div>

        {
          <div>
            <h1 className="text-3xl font-bold text-white">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="hidden md:inline px-1 py-1 bg-white rounded-full mr-2"
              >
                <IoMdArrowRoundBack color={"black"} size={25} />
              </button>
              {publicacion.titulo}
            </h1>
            <h2>
              {publicacion.autor
                ? publicacion.autor.nombre
                : "Autor desconocido"}
            </h2>
            <Slider key={publicacion._id} publicacion={publicacion} />
            <div className="text-white-600">
              <p className="mt-2">
                <strong>Fecha:</strong> {publicacion.fecha}
              </p>
              <p>
                <strong>Categoría:</strong> {publicacion.tag}
              </p>
              <p className="mt-4 text-white">{publicacion.contenido}</p>
            </div>
          </div>
        }

        {/* COMENTARIOS */}
        <ComentariosPub
          comentarios={comentarios}
          setComentarios={setComentarios}
          publicacionId={publicacion._id}
          usuario={usuario}
        />
      </div>
    </div>
  );
};

export default PublicacionDetalle;
