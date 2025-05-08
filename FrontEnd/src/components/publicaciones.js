import React, {useEffect, useState} from 'react'
import {useLocation} from 'react-router-dom'
import '../CSS/publicaciones.css'
import PublicacionCard from './publicacionCard';

// const publicaciones = [
//     { _id: 1, title: 'Fiesta Patronal', image: '/imagenEjemplo.jpg', date: '20/3/2025', tag: 'evento' },
//     { _id: 2, title: 'Fiesta Patronal', image: '/imagenEjemplo.jpg', date: '20/3/2025', tag: 'evento' },
//     { _id: 3, title: 'Fiesta Patronal', image: '/imagenEjemplo.jpg', date: '20/3/2025', tag: 'evento' },
//     { _id: 4, title: 'Fiesta Patronal', image: '/imagenEjemplo.jpg', date: '20/3/2025', tag: 'evento' },
//     { _id: 5, title: 'Fiesta Patronal', image: '/imagenEjemplo.jpg', date: '20/3/2025', tag: 'evento' },
//     { _id: 6, title: 'Fiesta Patronal', image: '/imagenEjemplo.jpg', date: '20/3/2025', tag: 'evento' },
//     { _id: 7, title: 'Fiesta Patronal', image: '/imagenEjemplo.jpg', date: '20/3/2025', tag: 'evento' },
//     { _id: 8, title: 'Fiesta Patronal', image: '/imagenEjemplo.jpg', date: '20/3/2025', tag: 'evento' },

//     { _id: 9, usuario: 'River Okay', post: "Lorem ipsum dolor sit amet", date: '20/3/2025', tag: 'post' },
//     { _id: 10, usuario: 'Juan Perez', post: "Lorem ipsum dolor sit amet", date: '20/3/2025', tag: 'post' },
//     { _id: 11, usuario: 'Juan Perez', post: "Lorem ipsum dolor sit amet", date: '20/3/2025', tag: 'post' },
//     { _id: 12, usuario: 'Juan Perez', post: "Lorem ipsum dolor sit amet", date: '20/3/2025', tag: 'post' },
//     { _id: 13, usuario: 'Juan Perez', post: "Lorem ipsum dolor sit amet", date: '20/3/2025', tag: 'post' },
//     { _id: 14, usuario: 'Juan Perez', post: "Lorem ipsum dolor sit amet", date: '20/3/2025', tag: 'post' },
//     { _id: 15, usuario: 'Juan Perez', post: "Lorem ipsum dolor sit amet", date: '20/3/2025', tag: 'post' },
//     { _id: 16, usuario: 'Juan Perez', post: "Lorem ipsum dolor sit amet", date: '20/3/2025', tag: 'post' },

//     { _id: 17, title: 'Venta de zapatos', image: '/imagenEjemplo2.jpg', date: '20/3/2025', tag: 'empr' },
//     { _id: 18, title: 'Venta de zapatos', image: '/imagenEjemplo2.jpg', date: '20/3/2025', tag: 'empr' },
//     { _id: 19, title: 'Venta de zapatos', image: '/imagenEjemplo2.jpg', date: '20/3/2025', tag: 'empr' },
//     { _id: 20, title: 'Venta de zapatos', image: '/imagenEjemplo2.jpg', date: '20/3/2025', tag: 'empr' },
//     { _id: 21, title: 'Venta de zapatos', image: '/imagenEjemplo2.jpg', date: '20/3/2025', tag: 'empr' },
//     { _id: 22, title: 'Venta de zapatos', image: '/imagenEjemplo2.jpg', date: '20/3/2025', tag: 'empr' },
//     { _id: 23, title: 'Venta de zapatos', image: '/imagenEjemplo2.jpg', date: '20/3/2025', tag: 'empr' },
//     { _id: 24, title: 'Venta de zapatos', image: '/imagenEjemplo2.jpg', date: '20/3/2025', tag: 'empr' },

   
//     ]; 
  //   {
  //     "_id": "67dbb128624d67fc3db90c02",
  //     "titulo": "Locuron el partido no?",
  //     "contenido": "Que golazo de mi hermano juas juas juas",
  //     "autor": "67da43f3651480413241b33c",
  //     "fecha": "Tue Mar 18 2025 06:00:00 GMT-0600 (hora estándar central)",
  //     "adjunto": [],
  //     "tag": "publicacion",
  //     "comentarios": [],
  //     "__v": 0
  // }

export const Publicaciones = () => {
    const location = useLocation();
    const [mostrar, setMostrar] = useState(0);
    const [cards, setCards] = useState([]);
    const [paginaActual, setPaginaActual] = useState(0);
    const limite = 10; // Definimos cuántas publicaciones por página
    
   

   
      
    const [publicaciones, setPublicaciones] = useState([]);

      useEffect(() => {
        const obtenerPublicaciones = async (tag, offset = 0, limit = 10) => {
          try {
            const response = await fetch(`https://proyecto-komuness-backend.vercel.app/publicaciones/?tag=${tag}&offset=${offset}&limit=${limit}`);
            const data = await response.json();
            setPublicaciones(data); // Guardamos las publicaciones en el estado
            console.log("Publicaciones obtenidas:", data);
          } catch (error) {
            console.error("Error al obtener publicaciones:", error);
          }
        };
        // Check the current path and set 'mostrar' accordingly
        if (location.pathname === '/eventos') {
          setMostrar(0);
          obtenerPublicaciones('evento', paginaActual * limite, limite);
        } else if (location.pathname === '/emprendimientos') {
          setMostrar(1);
          obtenerPublicaciones('emprendimiento', paginaActual * limite, limite);
        } else if (location.pathname === '/publicaciones') {
          setMostrar(2);
          obtenerPublicaciones('publicacion', paginaActual * limite, 20);
        } else if (location.pathname === '/perfilUsuario') {
          setMostrar(3);
        }
      }, [location.pathname, paginaActual]);

      
   
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
      
      const paginacion = (valor) => {
        // Calculamos la nueva página actual
        setPaginaActual((prev) => Math.max(prev + valor, 0)); // Nunca permitirá una página negativa
      };

  return (
    <div className="card-container">
        {/* {cards} */}
        {cards.length === 0 ? (
          <p>No hay publicaciones para mostrar.</p>
        ) : (
          cards.map((publicacion) => (
            <PublicacionCard key={publicacion._id} publicacion={publicacion} />
          ))
        )}
        {/* <div className="paginacion mt-4 flex justify-center gap-4">
          <button
            onClick={() => paginacion(-1)} // Reduce la página en 1
            disabled={paginaActual === 0} // Deshabilita el botón si estamos en la página 0
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Anterior
          </button>

          <span>Página {paginaActual + 1}</span> 

          <button
            onClick={() => paginacion(1)} // Aumenta la página en 1
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Siguiente
          </button>
        </div> */}
    </div>

    
  )
}

export default Publicaciones