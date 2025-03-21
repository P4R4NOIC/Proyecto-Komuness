import { IoMdArrowRoundBack  } from "react-icons/io";
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
        </div>
    );
};

export default PublicacionDetalle;
