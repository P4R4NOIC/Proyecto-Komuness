import { useState } from "react";

const ComentariosPub = ({ comentarios, setComentarios, publicacionId }) => {
    const [nuevoComentario, setNuevoComentario] = useState("");

    const usuarioLogueado = {
        id: "67da43f3651480413241b33c",
        nombre: "Usuario Anónimo",
        avatar: "https://i.pravatar.cc/40",
    };

    const agregarComentario = () => {
        if (!nuevoComentario.trim()) return;

        const comentario = {
            autor: usuarioLogueado.nombre,
            avatar: usuarioLogueado.avatar,
            contenido: nuevoComentario,
            fecha: new Date().toLocaleDateString()
        };

        setComentarios([comentario, ...comentarios]);
        setNuevoComentario("");
        enviarComentario(comentario);
    };

    const enviarComentario = async (comentario) => {
        try {
            const res = await fetch(`https://proyecto-komuness-backend.vercel.app/publicaciones/${publicacionId}/comentarios`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(comentario)
            });

            if (!res.ok) {
                console.error("Error al agregar comentario");
            }
        } catch (err) {
            console.error("Error en la solicitud:", err);
        }
    };

    return (
        <div className="mt-6 p-4 bg-gray-800 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-white">Comentarios</h3>
            <div className="mt-4 flex w-full">
                <img src={usuarioLogueado.avatar} alt="avatar" className="rounded-full mr-2" />
                <input
                    type="text"
                    value={nuevoComentario}
                    onChange={(e) => setNuevoComentario(e.target.value)}
                    placeholder="Escribe un comentario..."
                    className="flex-1 p-2 rounded-lg bg-gray-900 text-white border border-gray-600"
                />
                <button
                    onClick={agregarComentario}
                    className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Comentar
                </button>
            </div>

            <div className="mt-4 space-y-4 w-full">
                {comentarios.length === 0 ? (
                    <p className="text-gray-400">No hay comentarios aún. Sé el primero en comentar.</p>
                ) : (
                    comentarios.map((comentario, index) => (
                        <div key={index} className="flex items-start space-x-2 bg-gray-700 p-3 rounded-lg">
                            <img src={comentario.avatar} alt="avatar" className="rounded-full w-10 h-10 flex-shrink-0" />
                            <div className="w-full">
                                <p className="text-sm text-gray-300 font-semibold">
                                    {comentario.autor}{" "}
                                    <span className="text-xs text-gray-400">• {comentario.fecha}</span>
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
