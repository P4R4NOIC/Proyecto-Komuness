import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import '../CSS/publicaciones.css'
import PublicacionCard from './publicacionCard';
import FormularioPublicacion from '../pages/formulario';
import { useAuth } from './context/AuthContext';


export const Publicaciones = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mostrar, setMostrar] = useState(0);
  const [cards, setCards] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const limite = 10; // Definimos cuántas publicaciones por página
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
    setOffset(0);
    setHasMore(true);
  }, [location.pathname]);

  useEffect(() => {
    if (tag) {
      obtenerPublicaciones(tag, 0, limite);
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

  const obtenerPublicaciones = async (tag, offset, limit = 10) => {
    try {
      const response = await fetch(`https://proyecto-komuness-backend.vercel.app/publicaciones/?tag=${tag}&offset=${offset}&limit=${limit}`);

      if (!response.ok) {
        if (response.status === 404) {
          console.warn("No hay más publicaciones para cargar.");
          setHasMore(false);
          return;
        } else {
          throw new Error(`Error HTTP: ${response.status}`);
        }
      }

      const data = await response.json();
      // setPublicaciones(data); // Guardamos las publicaciones en el estado
      setPublicaciones((prev) => {
        const nuevos = data.data.filter(pub => !prev.some(p => p._id === pub._id));
        return [...prev, ...nuevos];
      });
      setOffset((prev) => prev + limit); // Aumentar offset

      console.log("Publicaciones obtenidas:", data);
    } catch (error) {
      console.error("Error al obtener publicaciones:", error);
      setHasMore(false);
    }
  };

  const handleLoadMore = () => {
    obtenerPublicaciones(tag, offset, limite);
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
      <div className="w-full flex justify-center mt-6">
        {hasMore && (
          <button
            onClick={handleLoadMore}
            className="px-6 py-2 bg-[#5445FF] hover:bg-[#2e2f50] text-white rounded-lg  transition-colors duration-200 text-sm sm:text-base"
          >
            Cargar más
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
      />
    </div>


  )
}

export default Publicaciones