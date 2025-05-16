import { IoMdArrowRoundBack } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Slider from "./slider";

export const PublicacionDetalle = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [comentarios, setComentarios] = useState([]);
    const [nuevoComentario, setNuevoComentario] = useState("");

    const publicacion = location.state?.publicacion;

    if (!publicacion) {
        return <h2 className="text-center text-xl font-semibold mt-10">Publicación no encontrada</h2>;
    }

const usuarioLogueado = {
    id: "67da43f3651480413241b33c",
    nombre: "Usuario Anónimo",
    avatar: "https://i.pravatar.cc/40",
  };


    const agregarComentario = () => {
        if (!nuevoComentario.trim()) return;

        /*const comentario = {
            id: Date.now(),
            usuario: "Usuario Anónimo",
            avatar: "https://i.pravatar.cc/40", // Avatar aleatorio
            texto: nuevoComentario,
            fecha: new Date().toLocaleDateString(),
        };*/

       // setComentarios([comentario, ...comentarios]);
       // setNuevoComentario("");
       const comentario = {
            autor: "Juan Pérez",
            contenido: nuevoComentario
        };
        enviarComentario(comentario);
    };

 

    // QUIZA LE SIRVA
     /*const [comentario, setComentario] = useState({
         autor: "6612abcd1234567890fedcba", // TODO: SE SACA DEL USUARIO LOGGEADO
         contenido: ""
     });*/

     
  

    // -----------CODIGO POST PARA ENVIAR UN COMENTARIO --------------------------
     const enviarComentario = async (nuevoComentario) => {
         try {
            //console.log(nuevoComentario)
           const res = await fetch(`https://proyecto-komuness-backend.vercel.app/publicaciones/${publicacion._id}/comentarios`, {
             method: "POST",
             headers: {
               "Content-Type": "application/json"
             },
             body: JSON.stringify(nuevoComentario)
            
           });

           if (res.ok) {
             const data = await res.json();
           
             console.log("Comentario agregado:", data);
           } else {
             console.error("Error al agregar comentario");
           }
         } catch (err) {
           console.error("Error en la solicitud:", err);
         }
     };


    return (
        <div className="max-w-4xl mx-auto p-4 space-y-6">
            <div className="md:hidden flex justify-between w-full  mb-4">
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="text-gray-600 text-2xl font-bold"
                >
                    <IoMdArrowRoundBack color={"white"} size={35} />
                </button>
            </div>
            {publicacion.tag !== "publicacion" ? (
                // EVENTO - EMPRENDIMIENTO
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
                    {/* <img src={publicacion.adjunto[0]?.url ?? '/notFound.jpg'}
                        alt={publicacion.titulo}
                        className="w-full h-auto rounded-lg shadow-lg" /> */}
                    <Slider key={publicacion._id} publicacion={publicacion}></Slider>
                    <div className="text-white-600">
                        <p className="mt-2"><strong>Fecha:</strong> {publicacion.fecha}</p>
                        <p><strong>Categoría:</strong> {publicacion.tag}</p>
                    </div>
                </div>
            ) : (
                // PUBLICACIÓN
                <div>
                    <h2 className="text-2xl font-semibold text-white-800">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="hidden md:inline px-1 py-1 bg-white rounded-full mr-2"
                        >
                            <IoMdArrowRoundBack color={"black"} size={25} />
                        </button>
                        {publicacion.autor?.nombre || 'Desconocido '}
                    </h2>
                    <p className="mt-4 text-white">{publicacion.contenido}</p>
                    <p className="mt-2 text-white"><strong>Fecha:</strong> {publicacion.fecha}</p>
                </div>
            )}

            {/* SECCION DE COMENTARIOS */}
            <div className="mt-6 p-4 bg-gray-800 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-white">Comentarios</h3>
                <div className="mt-4 flex w-full">
                    <img src="https://i.pravatar.cc/40" alt="avatar" className="rounded-full mr-2" />
                    <input
                        type="text"
                        value={nuevoComentario}
                        onChange={(e) => setNuevoComentario(e.target.value)}
                        placeholder="Escribe un comentario..."
                        className="flex-1 p-2 rounded-lg bg-gray-900 text-white border border-gray-600"
                    />
                </div>
                    <button
                        onClick={agregarComentario}
                        className="left-0 ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Comentar
                    </button>

                <div className="mt-4 space-y-4 w-full">
                    {comentarios.length === 0 ? (
                        <p className="text-gray-400">No hay comentarios aún. Sé el primero en comentar.</p>
                    ) : (
                        comentarios.map((comentario) => (
                            <div key={comentario.id} className="flex items-start space-x-2 bg-gray-700 p-3 rounded-lg">
                                <img src={comentario.avatar} alt="avatar" className="rounded-full w-10 h-10 flex-shrink-0" />
                                <div className="w-full">
                                    <p className="text-sm text-gray-300 font-semibold">{comentario.usuario} <span className="text-xs text-gray-400">• {comentario.fecha}</span></p>
                                    <p className="text-white break-words">{comentario.texto}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

        </div>
    );
};

export default PublicacionDetalle;
