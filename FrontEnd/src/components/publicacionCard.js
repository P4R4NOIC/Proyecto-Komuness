import { useNavigate } from "react-router-dom";
let cardColorCounter = 0;

export const PublicacionCard = ({ publicacion }) => {
    const navigate = useNavigate();
    const colores = ["#FFBF30", "#404270", "#12143D"];

  // Obtenemos el color actual y luego avanzamos el contador
  const backgroundColor = colores[cardColorCounter % colores.length];
  cardColorCounter++;

    const handleClick = () => {
        navigate(`/publicaciones/${publicacion._id}`, { state: { publicacion } });
    };

    return (
        <div
            key={publicacion._id}
            className="card"
            style={{ backgroundColor }}
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
    );
};

export default PublicacionCard;
