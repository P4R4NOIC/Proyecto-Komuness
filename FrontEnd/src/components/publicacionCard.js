import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PublicacionModal from "./publicacionModal";
import { useAuth } from "./context/AuthContext";

export const PublicacionCard = ({ publicacion }) => {
    const navigate = useNavigate();
   
    const [selectedPub, setSelectedPub] = useState(false);
    const { user } = useAuth();
    const handleClick = () => {
       
        navigate(`/publicaciones/${publicacion._id}`, { state: { publicacion } });
    };

    return (
        <div className="flex flex-col justify-between card">
            <div
                key={publicacion._id}
                className=""
            
                onClick={handleClick}
            >
            {publicacion.tag !== 'publicacion' && (
                <div className="imagen">
                    <img src={publicacion.adjunto[0]?.url ?? "/notFound.jpg"}
                        alt={publicacion.titulo}
                        className="object-fill h-60 w-96" />
                </div>
            )}
            {publicacion.tag !== 'publicacion' && (
                <div className="card-details">
                    <h3 className="titulo">{publicacion.titulo}</h3>
                    <p className="fecha">Publicado el {publicacion.fecha}</p>
                </div>
            )}
            {publicacion.tag === 'publicacion' && (
                <div className="tweet">
                    <div className="tweet-header">
                        <div className="tweet-user">
                            <h4 className="user-name">{publicacion.autor?.nombre || 'Desconocido'}</h4>
                        </div>
                    </div>
                    <div className="tweet-content">
                        <p>{publicacion.titulo}</p>
                    </div>
                    <div className="tweet-footer">
                        <p className="tweet-date">Publicado el {publicacion.fecha}</p>
                    </div>
                </div>
            )}
            </div>
            {user && user.tipoUsuario === 0 && (
                <div>
                    <button className="w-full bg-red-500 py-2 px-4 rounded hover:bg-red-600 mx-auto block"
                        onClick={()=>setSelectedPub(true)}
                    >
                        Eliminar
                    </button>
                    
                    <PublicacionModal
                        name = {publicacion.titulo}
                        date = {publicacion.fecha}
                        tag = {publicacion.tag}
                        id = {publicacion.id}
                        isOpen={selectedPub}
                        onClose={()=>setSelectedPub(false)}
                    />
                </div>
            )}
        </div>
    );
};

export default PublicacionCard;
