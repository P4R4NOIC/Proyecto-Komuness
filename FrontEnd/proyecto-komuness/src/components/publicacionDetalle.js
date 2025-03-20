import { useLocation, useNavigate } from "react-router-dom";

export const PublicacionDetalle = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Obtenemos la publicación desde el estado de navegación
    const publicacion = location.state?.publicacion;

    if (!publicacion) {
        return <h2>Publicación no encontrada</h2>;
    }

    return (
        <div className="detalle-container">
            {publicacion.tag !== "post" ? (
                <>
                    <h1>{publicacion.title}</h1>
                    <img src={publicacion.image} alt={publicacion.title} />
                    <p>Fecha: {publicacion.date}</p>
                    <p>Categoría: {publicacion.tag}</p>
                </>
            ) : (
                <>
                    <h2>{publicacion.usuario}</h2>
                    <p>{publicacion.post}</p>
                    <p>Fecha: {publicacion.date}</p>
                </>
            )}
        </div>
    );
};

export default PublicacionDetalle;
