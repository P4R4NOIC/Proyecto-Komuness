import { useNavigate } from "react-router-dom";

export const PublicacionCard = ({ publicacion }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/publicaciones/${publicacion.id}`, {state: {publicacion}}); 
    };
    
    return (
        <div 
            key={publicacion.id} 
            className="card"
            onClick={handleClick}
        >
            {publicacion.tag !== 'post' && (
                <div className="imagen">
                    <img src={publicacion.image} alt={publicacion.title} className="thumbnail" />
                </div>
            )}
            {publicacion.tag !== 'post' && (
                <div className="card-details">
                    <h3 className="title">{publicacion.title}</h3>
                    <p className="date">Publicado el {publicacion.date}</p>
                </div>
            )}
            {publicacion.tag === 'post' && (
                <div className="tweet">
                    <div className="tweet-header">
                        <div className="tweet-user">
                            <h4 className="user-name">{publicacion.usuario}</h4>
                        </div>
                    </div>
                    <div className="tweet-content">
                        <p>{publicacion.post}</p>
                    </div>
                    <div className="tweet-footer">
                        <p className="tweet-date">Publicado el {publicacion.date}</p>
                    </div>
                </div>
            )}
        </div>
    );
  };
  
export default PublicacionCard;
  