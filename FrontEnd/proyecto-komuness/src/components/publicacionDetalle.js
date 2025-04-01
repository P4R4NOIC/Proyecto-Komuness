import { IoMdArrowRoundBack  } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export const PublicacionDetalle = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [comentarios, setComentarios] = useState([]);
    const [nuevoComentario, setNuevoComentario] = useState("");

    const publicacion = location.state?.publicacion;

    if (!publicacion) {
        return <h2 className="text-center text-xl font-semibold mt-10">Publicación no encontrada</h2>;
    }

    const agregarComentario = () => {
        if (nuevoComentario.trim() === "") return;
        setComentarios([...comentarios, nuevoComentario]);
        setNuevoComentario("");
    };

    return (
        <div className="max-w-4xl mx-auto p-4 space-y-6">
            <div className="md:hidden flex justify-between w-full  mb-4">
                <button
                type="button"
                onClick={() => navigate(-1)}
                className="text-gray-600 text-2xl font-bold"
                >
                <IoMdArrowRoundBack  color={"white"} size={35}/>
                </button>
            </div>
            {publicacion.tag !== "post" ? (
                <>
                    
                    <h1 className="text-3xl font-bold text-white">
                        <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="hidden md:inline px-1 py-1 bg-white rounded-full mr-2"
                        >
                            <IoMdArrowRoundBack  color={"black"} size={25}/>
                        </button>
                        {publicacion.title}
                    </h1>
                    <img 
                        src={publicacion.image} 
                        alt={publicacion.title} 
                        className="w-full h-auto rounded-lg shadow-lg" 
                    />
                    <div className="text-white-600">
                        <p className="mt-2"><strong>Fecha:</strong> {publicacion.date}</p>
                        <p><strong>Categoría:</strong> {publicacion.tag}</p>
                    </div>
                </>
            ) : (
                <>
                    <h2 className="text-2xl font-semibold text-white-800">
                        <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="hidden md:inline px-1 py-1 bg-white rounded-full mr-2"
                        >
                            <IoMdArrowRoundBack  color={"black"} size={25}/>
                        </button>
                        {publicacion.usuario}
                    </h2>
                    <p className="mt-4 text-white">{publicacion.post}</p>
                    <p className="mt-2 text-white"><strong>Fecha:</strong> {publicacion.date}</p>
                </>
            )}

            {/* SECCION DE COMENTARIOS */}
            <div className="mt-6 p-4 bg-gray-800 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-white">Comentarios</h3>
                <div className="mt-4 flex flex-col space-y-2">
                    <div className="flex">
                        <input
                            type="text"
                            value={nuevoComentario}
                            onChange={(e) => setNuevoComentario(e.target.value)}
                            placeholder="Escribe un comentario..."
                            className="flex-1 p-2 rounded-l-lg bg-gray-900 text-white border border-gray-600"
                        />
                        <button
                            onClick={agregarComentario}
                            className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700"
                        >
                            Comentar
                        </button>
                    </div>
                    <div className="mt-2 space-y-2">
                        {comentarios.length === 0 ? (
                            <p className="text-gray-400">No hay comentarios aún. Sé el primero en comentar.</p>
                        ) : (
                            comentarios.map((comentario, index) => (
                                <div key={index} className="p-2 bg-gray-700 rounded-lg text-white">
                                    {comentario}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PublicacionDetalle;
