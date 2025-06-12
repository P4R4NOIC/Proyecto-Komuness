import { useState, useRef } from "react";
import { API_URL } from '../utils/api';
const ComentariosPub = ({ comentarios, setComentarios, publicacionId }) => {
  const [nuevoComentario, setNuevoComentario] = useState("");

  // Obtener el usuario desde localStorage
  const usuarioLogueado = JSON.parse(localStorage.getItem("user"));

  const agregarComentario = () => {
    if (!nuevoComentario.trim()) return;

    const comentario = {
      autor: `${usuarioLogueado.nombre} ${usuarioLogueado.apellido}`,
      avatar: usuarioLogueado.avatar || "https://i.pravatar.cc/40",
      contenido: nuevoComentario,
      fecha: new Date().toLocaleDateString("es-ES"),
    };

    setComentarios([comentario, ...comentarios]);
    setNuevoComentario("");
    enviarComentario(comentario);
  };

  const enviarComentario = async (comentario) => {
    try {
      const res = await fetch(
        `${API_URL}/publicaciones/${publicacionId}/comentarios`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(comentario),
        }
      );

      if (!res.ok) {
        console.error("Error al agregar comentario");
      }
    } catch (err) {
      console.error("Error en la solicitud:", err);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      agregarComentario();
    }
  };
  const textareaRef = useRef(null);


  return (
    <div className="mt-6 p-4 bg-gray-800 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-white">Comentarios</h3>

      {/* Caja de comentario solo si el usuario está logueado */}
      {usuarioLogueado && (
        <div className="mt-4 w-full flex flex-col sm:flex-row sm:items-start gap-2">
          <div className="flex flex-col gap-1 w-full">
            <div className="flex items-start gap-2">
             
              <textarea
                ref={textareaRef}
                value={nuevoComentario}
                onChange={(e) => {
                  setNuevoComentario(e.target.value);
                  const textarea = e.target;
                  textarea.style.height = "auto";
                  textarea.style.height = `${textarea.scrollHeight}px`;
                }}
                onKeyDown={handleKeyDown}
                placeholder="Escribe un comentario..."
                className="flex-1 p-2 rounded-lg bg-gray-900 text-white border border-gray-600 resize-none min-h-[40px] max-h-40 overflow-y-auto"
                rows={1}
                maxLength={500}
              />
            </div>
            <p className="text-right text-xs text-gray-400">
              {nuevoComentario.length}/500 caracteres
            </p>
          </div>

          <button
            onClick={agregarComentario}
            className="self-end sm:self-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Comentar
          </button>
        </div>


      )}

      {/* Lista de comentarios */}
      <div className="mt-4 space-y-4 w-full">
        {comentarios.length === 0 ? (
          <p className="text-gray-400">No hay comentarios aún.</p>
        ) : (
          comentarios.map((comentario, index) => (
            <div
              key={index}
              className="flex items-start space-x-2 bg-gray-700 p-3 rounded-lg"
            >
             
              <div className="w-full">
                <p className="text-sm text-gray-300 font-semibold">
                  {comentario.autor}{" "}
                  <span className="text-xs text-gray-400">
                    • {comentario.fecha}
                  </span>
                </p>
                <p className="text-white break-words">{comentario.contenido}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ComentariosPub;
