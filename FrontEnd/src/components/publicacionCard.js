import { useNavigate } from "react-router-dom";

export const PublicacionCard = ({ publicacion }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/publicaciones/${publicacion._id}`, { state: { publicacion } });
    };

    return (
        <div
            key={publicacion._id}
            className="card"
            onClick={handleClick}
        >
            {publicacion.tag !== 'publicacion' && (
                <div className="imagen">
                    <img src={publicacion.adjunto[0]?.url ?? "/notFound.jpg"}
                        alt={publicacion.titulo}
                        className="thumbnail" />
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
    );
};

export default PublicacionCard;
