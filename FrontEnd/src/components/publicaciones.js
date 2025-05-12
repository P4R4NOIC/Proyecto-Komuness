import React, { useEffect, useState, useRef } from 'react' // Añadir useRef
import { useLocation } from 'react-router-dom'
import '../CSS/publicaciones.css'
import PublicacionCard from './publicacionCard'


export const Publicaciones = () => {
  const location = useLocation();
  const [publicaciones, setPublicaciones] = useState([]);
  const [paginacion, setPaginacion] = useState({
    offset: 0,
    limit: 10,
    total: 0,
    pages: 0
  })

  // Definir la referencia para trackear la ruta anterior
  const prevPath = useRef(location.pathname)

  useEffect(() => {
    let limitePorRuta = 10
    if (location.pathname === '/publicaciones') limitePorRuta = 10

    const obtenerPublicaciones = async (tag) => {
      try {
        // modo de prueba local
        const url = new URL("http://localhost:3000/publicaciones");
        // modo de prueba en la nube
        // const url = new URL("https://proyecto-komuness-backend.vercel.app/publicaciones");
        url.searchParams.set('tag', tag);
        url.searchParams.set('offset', paginacion.offset);
        url.searchParams.set('limit', limitePorRuta);
        console.log(url)
        const response = await fetch(new Request(url));
        const responseData = await response.json()
        console.log(responseData)
        setPublicaciones(responseData.data)
        setPaginacion(prev => ({
          ...prev,
          limit: limitePorRuta,
          ...responseData.pagination
        }))

      } catch (error) {
        console.error("Error al obtener publicaciones:", error)
      }
    }

    // Resetear paginación solo cuando cambia la ruta
    if (location.pathname !== prevPath.current) {
      setPaginacion(prev => ({
        ...prev,
        offset: 0,
        limit: limitePorRuta
      }))
      prevPath.current = location.pathname // Actualizar la referencia
    }

    const routeConfig = {
      '/eventos': { tag: 'evento' },
      '/emprendimientos': { tag: 'emprendimiento' },
      '/publicaciones': { tag: 'publicacion' },
      '/perfilUsuario': { tag: null }
    }

    const config = routeConfig[location.pathname] || {}

    if (config.tag) {
      obtenerPublicaciones(config.tag)
    }
    //este useEffect se ejecuta cada vez que cambia la ruta o el offset 
    //para obtener las publicaciones de la API
  }, [location.pathname, paginacion.offset])


  const handlePagina = (nuevaPagina) => {
    setPaginacion(prev => ({
      ...prev,
      offset: nuevaPagina * prev.limit
    }))
  }

  const currentPage = Math.floor(paginacion.offset / paginacion.limit)

  return (
    <div className="card-container">
      {publicaciones.length === 0 ? (
        <p>No hay publicaciones para mostrar.</p>
      ) : (
        publicaciones.map((publicacion) => (
          <PublicacionCard key={publicacion._id} publicacion={publicacion} />
        ))
      )}

      {paginacion.pages > 1 && (
        <div className="paginacion mt-4 flex justify-center gap-4">
          <button
            onClick={() => handlePagina(currentPage - 1)}
            disabled={currentPage === 0}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Anterior
          </button>

          <span>
            Página {currentPage + 1} de {paginacion.pages}
            <br />
            <small>
              Mostrando {paginacion.offset + 1}-{
                Math.min(paginacion.offset + paginacion.limit, paginacion.total)
              } de {paginacion.total}
            </small>
          </span>

          <button
            onClick={() => handlePagina(currentPage + 1)}
            disabled={currentPage >= paginacion.pages - 1}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  )
}

export default Publicaciones