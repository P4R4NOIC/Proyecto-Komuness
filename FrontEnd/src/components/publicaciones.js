import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import '../CSS/publicaciones.css'
import PublicacionCard from './publicacionCard';
import FormularioPublicacion from '../pages/formulario';
import { useAuth } from './context/AuthContext';
import { API_URL } from '../utils/api';

export const Publicaciones = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mostrar, setMostrar] = useState(0);
  const [cards, setCards] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);

  const limite = 12; // Definimos cuántas publicaciones por página
  const [tag, setTag] = useState(null);
  const [formulario, setFormulario] = useState(false);

  const { user } = useAuth();

  const [publicaciones, setPublicaciones] = useState([]);

  useEffect(() => {
    const path = location.pathname;
    // Check the current path and set 'mostrar' accordingly
    if (path === '/eventos') {
      setMostrar(0);
      setTag('evento');
    } else if (path === '/emprendimientos') {
      setMostrar(1);
      setTag('emprendimiento');
    } else if (path === '/publicaciones') {
      setMostrar(2);
      setTag('publicacion');
    } else if (path === '/perfilUsuario') {
      setMostrar(3);
    }
    setPublicaciones([]);
  }, [location.pathname]);

  useEffect(() => {
    if (tag) {
      obtenerPublicaciones(tag, 1, limite);
    }
  }, [tag]);

  useEffect(() => {
    if (mostrar === 3) {
      setCards(publicaciones);
    } else {
      const newCards = publicaciones.filter(publicacion => {
        if (mostrar === 0) return publicacion.tag === 'evento';
        if (mostrar === 1) return publicacion.tag === 'emprendimiento';
        return publicacion.tag === 'publicacion';
      });

      setCards(newCards);
    }
  }, [mostrar, publicaciones]);

  const obtenerPublicaciones = async (tag, page = 1, limit) => {
    const offset = (page - 1) * limit; 
    try {
      const response = await fetch(`${API_URL}/publicaciones/?tag=${tag}&offset=${offset}&limit=${limit}`);

      if (!response.ok) {
        if (response.status === 404) {
          console.warn("No hay publicaciones.");
          return;
        } else {
          throw new Error(`Error HTTP: ${response.status}`);
        }
      }

      const data = await response.json();
     
      setPublicaciones(data.data);
      setPaginaActual(page);
      setTotalPaginas(data.pagination.pages);

      console.log("Publicaciones obtenidas:", data);
    } catch (error) {
      console.error("Error al obtener publicaciones:", error);
      
    }
  };


  return (
    <div className='bg-gray-800/80 pt-16 min-h-screen'>
      <div className="card-container">
        {/* {cards} */}
        {cards.length === 0 ? (
          <p>No hay publicaciones para mostrar.</p>
        ) : (
          cards.map((publicacion) => (
            <PublicacionCard key={publicacion._id} publicacion={publicacion} />
          ))
        )}
      </div>

      <div className="w-full flex justify-center mt-6 gap-2 flex-wrap pb-6">
        {paginaActual > 1 && (
          <button
            onClick={() => obtenerPublicaciones(tag, paginaActual - 1, limite)}
            className="px-3 py-1 rounded bg-yellow-500 hover:bg-yellow-600"
          >
            « Anterior
          </button>
        )}

        {Array.from({ length: totalPaginas }, (_, i) => i + 1)
          .filter(p =>
            p === 1 || 
            p === totalPaginas ||
            (p >= paginaActual - 2 && p <= paginaActual + 2)
          )
          .map((p, i, arr) => (
            <React.Fragment key={p}>
              {i > 0 && p - arr[i - 1] > 1 && (
                <span className="px-2 py-1 text-gray-500">...</span>
              )}
              <button
                onClick={() => obtenerPublicaciones(tag, p, limite)}
                className={`px-3 py-1 rounded text-sm ${
                  p === paginaActual
                    ? "bg-[#5445FF] text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {p}
              </button>
            </React.Fragment>
          ))}

        {paginaActual < totalPaginas && (
          <button
            onClick={() => obtenerPublicaciones(tag, paginaActual + 1, limite)}
            className="px-3 py-1 rounded bg-yellow-500 hover:bg-yellow-600"
          >
            Siguiente »
          </button>
        )}
      </div>



      <button
        onClick={() => {
          if(user){
            setFormulario(true)
          } else {
            navigate('/iniciarSesion')
          }
        }}
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 bg-blue-600 text-white w-14 h-14 md:w-16 md:h-16 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 z-50 flex items-center justify-center text-2xl"
      >
        +
      </button>
      <FormularioPublicacion
        isOpen={formulario}
        onClose={()=>setFormulario(false)}
        openTag={tag}
      />
    </div>


  )
}

export default Publicaciones