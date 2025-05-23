import { useNavigate } from "react-router-dom";
export const PublicacionModal = ({ name, date, tag, id, isOpen, onClose }) => {
    const navigate = useNavigate();
    if (!isOpen) return null;

    const rutas = {
        evento: `/eventos`,
        emprendimiento: `/emprendimientos`,
        publicacion: `/publicaciones`
    };

    const eliminarPublicacion = async() => {
        

        try {
            const res = await fetch(`https://proyecto-komuness-backend.vercel.app/publicaciones/${id}`, {
                method: "DELETE",
                headers: {
                "Content-Type": "application/json"
                },
            
            });

        if (res.ok) {
            const data = await res.json();
        
            console.log("Publicación eliminada:", data);
            if (rutas[tag]) {
                navigate(rutas[tag]);
            }
            onClose();

        } else {
            console.error("Error al eliminar la publicación");
        }
        } catch (err) {
            console.error("Error en la solicitud:", err);
        }
        
    };

    return (
    
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-[#2A2A35] text-white p-6 rounded-lg shadow-[0_4px_20px_rgba(0,0,0,1)] w-[90%] max-w-md text-center">
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-xl font-semibold">¿Está seguro/a de borrar la publicación?</h2>
            <p className="text-sm text-gray-300">{name}</p> 
            <p className="text-sm text-gray-300">{date}</p>

            {/* Botones */}
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={eliminarPublicacion}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white"
              >
                Eliminar
              </button>
              <button
                onClick={onClose}
                className="bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded text-white"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>


  )
}


export default PublicacionModal