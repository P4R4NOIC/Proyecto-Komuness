import { IoMdArrowRoundBack } from "react-icons/io";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { API_URL } from "../utils/api";

import Slider from "./slider";
import ComentariosPub from "./comentariosPub";
import PublicacionModal from "./publicacionModal";
import { useAuth } from "./context/AuthContext";

export const PublicacionDetalle = () => {
  const navigate = useNavigate();

  const { user } = useAuth();
  const [selectedPub, setSelectedPub] = useState(false);
  const [comentarios, setComentarios] = useState([]);
  const { id } = useParams();
  const [publicacion, setPublicacion] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const obtenerPublicacion = async () => {
      try {
        setCargando(true);
        setError(null);

        const response = await fetch(`${API_URL}/publicaciones/${id}`);
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.mensaje || "No se encontró la publicación");
        }
        setPublicacion(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setCargando(false);
      }
    }
    if (id) {
      obtenerPublicacion();
    }
  }, [id]);

  useEffect(() => {
    if (publicacion?.comentarios) {
      setComentarios(publicacion.comentarios);
    }
  }, [publicacion]);

  if (cargando) {
    return (
    <div className="flex flex-col items-center justify-center mt-10 bg-gray-800/80">
      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-3"></div>
      <h2 className="text-white-600">Cargando publicación...</h2>
    </div>
  );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="flex flex-col justify-center items-center h-96 bg-gray-900/80 text-white rounded-lg shadow-lg p-8 w-full max-w-md text-center">
          <p className="text-lg mb-4">{error}</p>
          <button
            onClick={() => (window.location.href = "/publicaciones")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          >
            Volver a publicaciones
          </button>
        </div>
      </div>
    );
  }

  if (!publicacion) {
    return null; 
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
            <div className="flex items-center justify-between w-full mb-4">
              {/* Botón atrás (izquierda) */}
              <div className="w-1/3 flex justify-start">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="hidden md:inline px-1 py-1 bg-white rounded-full"
                >
                  <IoMdArrowRoundBack color={"black"} size={25} />
                </button>
              </div>

              {/* Título (centro) */}
              <h1 className="w-1/3 text-3xl font-bold text-white text-center">
                {publicacion.titulo}
              </h1>

              {/* Botón Eliminar (derecha) */}
              <div className="w-1/3 flex justify-end">
                {user && (user.tipoUsuario === 0 || user.tipoUsuario === 1) && (
                  <div>
                    <button
                      className="bg-red-500 py-2 px-4 rounded hover:bg-red-600"
                      onClick={() => setSelectedPub(true)}
                    >
                      Eliminar
                    </button>

                    <PublicacionModal
                      name={publicacion.titulo}
                      date={publicacion.fecha}
                      tag={publicacion.tag}
                      id={publicacion._id}
                      isOpen={selectedPub}
                      onClose={() => setSelectedPub(false)}
                    />
                  </div>
                )}
              </div>
            </div>

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
          usuario={user}
        />
      </div>
    </div>
  );
};

export default PublicacionDetalle;
