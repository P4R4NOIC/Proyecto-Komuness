import { useLocation, useNavigate } from "react-router-dom";

export const PublicacionDetalle = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const publicacion = location.state?.publicacion;

    if (!publicacion) {
        return <h2 className="text-center text-xl font-semibold mt-10">Publicación no encontrada</h2>;
    }

    return (
        <div className="max-w-4xl mx-auto p-4 space-y-6">
            {publicacion.tag !== "post" ? (
                <>
                    <h1 className="text-3xl font-bold text-white">{publicacion.title}</h1>
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
                    <h2 className="text-2xl font-semibold text-white-800">{publicacion.usuario}</h2>
                    <p className="mt-4 text-white">{publicacion.post}</p>
                    <p className="mt-2 text-white"><strong>Fecha:</strong> {publicacion.date}</p>
                </>
            )}
            <div className="mt-6">
                <button 
                    onClick={() => navigate(-1)} 
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                    Volver
                </button>
            </div>
        </div>
    );
};

export default PublicacionDetalle;
