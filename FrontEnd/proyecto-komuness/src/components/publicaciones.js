import React, {useEffect, useState} from 'react'
import {useLocation} from 'react-router-dom'
import '../CSS/publicaciones.css'
import PublicacionCard from './publicacionCard';

const publicaciones = [
    { id: 1, title: 'Fiesta Patronal', image: '/imagenEjemplo.jpg', date: '20/3/2025', tag: 'evento' },
    { id: 2, title: 'Fiesta Patronal', image: '/imagenEjemplo.jpg', date: '20/3/2025', tag: 'evento' },
    { id: 3, title: 'Fiesta Patronal', image: '/imagenEjemplo.jpg', date: '20/3/2025', tag: 'evento' },
    { id: 4, title: 'Fiesta Patronal', image: '/imagenEjemplo.jpg', date: '20/3/2025', tag: 'evento' },
    { id: 5, title: 'Fiesta Patronal', image: '/imagenEjemplo.jpg', date: '20/3/2025', tag: 'evento' },
    { id: 6, title: 'Fiesta Patronal', image: '/imagenEjemplo.jpg', date: '20/3/2025', tag: 'evento' },
    { id: 7, title: 'Fiesta Patronal', image: '/imagenEjemplo.jpg', date: '20/3/2025', tag: 'evento' },
    { id: 8, title: 'Fiesta Patronal', image: '/imagenEjemplo.jpg', date: '20/3/2025', tag: 'evento' },

    { id: 9, usuario: 'River Okay', post: "Lorem ipsum dolor sit amet", date: '20/3/2025', tag: 'post' },
    { id: 10, usuario: 'Juan Perez', post: "Lorem ipsum dolor sit amet", date: '20/3/2025', tag: 'post' },
    { id: 11, usuario: 'Juan Perez', post: "Lorem ipsum dolor sit amet", date: '20/3/2025', tag: 'post' },
    { id: 12, usuario: 'Juan Perez', post: "Lorem ipsum dolor sit amet", date: '20/3/2025', tag: 'post' },
    { id: 13, usuario: 'Juan Perez', post: "Lorem ipsum dolor sit amet", date: '20/3/2025', tag: 'post' },
    { id: 14, usuario: 'Juan Perez', post: "Lorem ipsum dolor sit amet", date: '20/3/2025', tag: 'post' },
    { id: 15, usuario: 'Juan Perez', post: "Lorem ipsum dolor sit amet", date: '20/3/2025', tag: 'post' },
    { id: 16, usuario: 'Juan Perez', post: "Lorem ipsum dolor sit amet", date: '20/3/2025', tag: 'post' },

    { id: 17, title: 'Venta de zapatos', image: '/imagenEjemplo2.jpg', date: '20/3/2025', tag: 'empr' },
    { id: 18, title: 'Venta de zapatos', image: '/imagenEjemplo2.jpg', date: '20/3/2025', tag: 'empr' },
    { id: 19, title: 'Venta de zapatos', image: '/imagenEjemplo2.jpg', date: '20/3/2025', tag: 'empr' },
    { id: 20, title: 'Venta de zapatos', image: '/imagenEjemplo2.jpg', date: '20/3/2025', tag: 'empr' },
    { id: 21, title: 'Venta de zapatos', image: '/imagenEjemplo2.jpg', date: '20/3/2025', tag: 'empr' },
    { id: 22, title: 'Venta de zapatos', image: '/imagenEjemplo2.jpg', date: '20/3/2025', tag: 'empr' },
    { id: 23, title: 'Venta de zapatos', image: '/imagenEjemplo2.jpg', date: '20/3/2025', tag: 'empr' },
    { id: 24, title: 'Venta de zapatos', image: '/imagenEjemplo2.jpg', date: '20/3/2025', tag: 'empr' },

   
    ]; 

export const Publicaciones = () => {
    const location = useLocation();
    const [mostrar, setMostrar] = useState(0);
    const [cards, setCards] = useState([]);

   

   
      
    const [publicaciones2, setPublicaciones] = useState([]);

      useEffect(() => {
        const obtenerPublicaciones = async (tag, offset = 0, limit = 10) => {
          try {
            const response = await fetch(`http://localhost:3000/publicaciones/?tag=${tag}&offset=${offset}&limit=${limit}`);
            const data = await response.json();
            const jsonString = JSON.stringify(data);
            setPublicaciones(jsonString); // Guardamos las publicaciones en el estado
            console.log("Publicaciones obtenidas:", data);
          } catch (error) {
            console.error("Error al obtener publicaciones:", error);
          }
        };
        // Check the current path and set 'mostrar' accordingly
        if (location.pathname === '/eventos') {
          setMostrar(0); 
          obtenerPublicaciones('evento',0,10);
       
        } else if (location.pathname === '/emprendimientos') {
          setMostrar(1); 
          obtenerPublicaciones('emprendimiento',0,10);
          
        }else if(location.pathname === '/publicaciones'){
            setMostrar(2); 
            obtenerPublicaciones('publicacion',0,10);
        }else if (location.pathname === '/perfilUsuario'){
             setMostrar(3);
        }
      }, [location.pathname]);

      
   
        useEffect(() => {
            
            if (mostrar === 3) {
                setCards(publicaciones);
            } else {
              
                const newCards = publicaciones.filter(publicacion => {
                    if (mostrar === 0) return publicacion.tag === 'evento';
                    if (mostrar === 1) return publicacion.tag === 'empr';
                    return publicacion.tag === 'post';
                });
                
                setCards(newCards);
            }
        }, [mostrar]);


  return (
    <div className="card-container">
        {/* {cards} */}
        {cards.map((publicacion) => (
            <PublicacionCard key={publicacion.id} publicacion={publicacion} />
        ))}
    </div>
  )
}

export default Publicaciones