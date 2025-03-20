import React, {useEffect, useState} from 'react'
import {useLocation} from 'react-router-dom'
import '../CSS/publicaciones.css'

export const Publicaciones = () => {
    const location = useLocation();
    const [mostrar, setMostrar] = useState(0);
    const [cards, setCards] = useState([]);

   

   
      
     


      useEffect(() => {
        // Check the current path and set 'mostrar' accordingly
        if (location.pathname === '/eventos') {
          setMostrar(0); 
       
        } else if (location.pathname === '/emprendimientos') {
          setMostrar(1); 
          
        }else if(location.pathname === '/publicaciones'){
            setMostrar(2); 
        }else if (location.pathname === '/perfilUsuario'){
             setMostrar(3);
        }
      }, [location.pathname]);

      
   
        useEffect(() => {
            const publicaciones = [
                { id: 1, title: 'Fiesta Patronal', image: '/imagenEjemplo.jpg', date: '20/3/2025', tag: 'evento' },
                { id: 2, title: 'Fiesta Patronal', image: '/imagenEjemplo.jpg', date: '20/3/2025', tag: 'evento' },
                { id: 3, title: 'Fiesta Patronal', image: '/imagenEjemplo.jpg', date: '20/3/2025', tag: 'evento' },
                { id: 4, title: 'Fiesta Patronal', image: '/imagenEjemplo.jpg', date: '20/3/2025', tag: 'evento' },
                { id: 5, title: 'Fiesta Patronal', image: '/imagenEjemplo.jpg', date: '20/3/2025', tag: 'evento' },
                { id: 6, title: 'Fiesta Patronal', image: '/imagenEjemplo.jpg', date: '20/3/2025', tag: 'evento' },
                { id: 7, title: 'Fiesta Patronal', image: '/imagenEjemplo.jpg', date: '20/3/2025', tag: 'evento' },
                { id: 8, title: 'Fiesta Patronal', image: '/imagenEjemplo.jpg', date: '20/3/2025', tag: 'evento' },
        
                { id: 9, usuario: 'Juan Perez', post: "Lorem ipsum dolor sit amet", date: '20/3/2025', tag: 'post' },
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
            if (mostrar === 3) {
                setCards(publicaciones.map(publicacion => (
                    <div key={publicacion.id} className="card">
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
                )));
            } else {
              
                const newCards = publicaciones.filter(publicacion => {
                    if (mostrar === 0) return publicacion.tag === 'evento';
                    if (mostrar === 1) return publicacion.tag === 'empr';
                    return publicacion.tag === 'post';
                }).map(publicacion => (
                    <div key={publicacion.id} className="card">
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
                ));
                setCards(newCards);
            }
        }, [mostrar]);


  return (
    <div className="card-container" key={location.pathname}>{cards}</div>
  )
}

export default Publicaciones