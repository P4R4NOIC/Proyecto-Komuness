import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { toast } from "react-hot-toast";

import "../CSS/perfilUsuario.css";
import { useAuth } from "./context/AuthContext";

export const PerfilUsuario = () => {
  const navigate = useNavigate();
  const [publicaciones, setPublicaciones] = useState([]);
  const [archivos, setArchivos] = useState([]);
  const { user, logout } = useAuth();

  useEffect(() => {
    fetch(
      `https://proyecto-komuness-backend.vercel.app/publicaciones/?publicado=false`,
      {
        credentials: "include",
      }
    )
      .then((res) => res.json())
      .then((data) => setPublicaciones(data.data))
      .catch((error) => console.error("Error al obtener los datos: ", error));
  }, []);

  useEffect(() => {
    fetch(
      `https://proyecto-komuness-backend.vercel.app/biblioteca/list/0?publico=false&global=true`,
      {
        credentials: "include",
      }
    )
      .then((res) => res.json())
      .then((data) => setArchivos(data.contentFile))
      .catch((error) => console.error("Error al obtener los datos: ", error));
  }, []);

  const aceptarPost = async (id) => {
    const promesa = fetch(
      `https://proyecto-komuness-backend.vercel.app/publicaciones/${id}`,
      {
        method: "PUT", // o PATCH, según tu API
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ publicado: true }),
      }
    );

    toast.promise(promesa, {
      loading: "Aceptando publicación...",
      success: "¡Publicación aceptada!",
      error: "Error al aceptar publicación",
    });

    try {
      await promesa;
      setPublicaciones((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error al aceptar publicación:", error);
    }
  };

  const rechazarPost = async (id) => {
    const promesa = fetch(
      `https://proyecto-komuness-backend.vercel.app/publicaciones/${id}`,
      {
        method: "DELETE",
      }
    );

    toast.promise(promesa, {
      loading: "Eliminando publicación...",
      success: "¡Publicación eliminada!",
      error: "Error al eliminar publicación",
    });

    try {
      await promesa;
      setPublicaciones((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error al eliminar publicación:", error);
    }
  };

  function formatearTamano(bytes) {
    if (bytes < 1024) return `${bytes} B`;
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(1)} KB`;
    const mb = kb / 1024;
    return `${mb.toFixed(1)} MB`;
  }

  const aceptarArchivo = async (id) => {
    const promesa = fetch(
      `https://proyecto-komuness-backend.vercel.app/biblioteca/edit/${id}`,
      {
        method: "PUT", // o PATCH, según tu API
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ esPublico: true }),
      }
    );

    toast.promise(promesa, {
      loading: "Aceptando archivo...",
      success: "¡Archivo aceptado!",
      error: "Error al aceptar el archivo",
    });

    try {
      await promesa;
      setArchivos((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error al aceptar el archivo:", error);
    }
  };

  const rechazarArchivo = async (id) => {
    const promesa = fetch(
      `https://proyecto-komuness-backend.vercel.app/biblioteca/delete/${id}`,
      {
        method: "DELETE",
      }
    );

    toast.promise(promesa, {
      loading: "Eliminando archivo...",
      success: "¡Archivo eliminado!",
      error: "Error al eliminar el archivo",
    });

    try {
      await promesa;
      setArchivos((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error al eliminar archivo:", error);
    }
  };


  return (
    <div className="flex flex-col md:flex-row gap-6 w-full min-h-screen bg-gray-800/80 p-6">
      <div className="paginaUsuario flex flex-col items-center gap-4 w-full md:w-1/3">
        <AiOutlineUser size={150} className="text-white" />

        <div className="text-white text-center md:text-left">
          <div>
            <span className="text-xl font-semibold">
              {user?.nombre} {user?.apellido}
            </span>
          </div>
          <div>
            <a
              href={`mailto:${user?.email}`}
              className="text-blue-400 hover:underline"
            >
              {user?.email}
            </a>
          </div>
          <div>
            <button
              onClick={() => {
                logout();
                navigate('/');

              }}
              className="mt-4 bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>

{user && user.tipoUsuario === 0 && (
      <div className="w-full md:w-2/3 flex flex-col gap-4 bg-white rounded-lg shadow p-4">
        <h1 className="text-black">Dashboard Administrativo</h1>
        <div className="overflow-x-auto max-h-[300px] overflow-y-auto bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold text-black mb-2">
            Publicaciones nuevas
          </h2>
          <table className="min-w-full text-black text-sm">
            <thead>
              <tr>
                <th className="text-left px-4 py-2">Autor</th>
                <th className="text-left px-4 py-2">Título</th>
                <th className="text-left px-4 py-2">Tipo</th>
                <th className="text-left px-4 py-2">Fecha</th>
                <th className="text-left px-4 py-2">Decisión</th>
              </tr>
            </thead>
            <tbody>
              {publicaciones && publicaciones.length > 0 ? (
                publicaciones.map((item) => (
                  <tr key={item._id} className="border-t">
                    <td className="px-4 py-2">{item.autor ? item.autor.nombre : "Sin autor"}</td>
                    <td className="px-4 py-2">{item.titulo}</td>
                    <td className="px-4 py-2">{item.tag}</td>
                    <td className="px-4 py-2">{item.fecha}</td>
                    <td className="px-4 py-2 space-x-2">
                      <div className="flex flex-col gap-2 justify-center">
                        <button
                          onClick={() => aceptarPost(item._id)}
                          className="bg-green-500 hover:bg-green-600 text-white font-medium px-4 py-1 rounded"
                        >
                          Aceptar
                        </button>
                        <button
                          onClick={() => rechazarPost(item._id)}
                          className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-1 rounded"
                        >
                          Rechazar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-4 text-center text-gray-500"
                  >
                    No hay publicaciones pendientes.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="overflow-x-auto max-h-[300px] overflow-y-auto bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold text-black mb-2">
            Archivos nuevos
          </h2>
          <table className="min-w-full text-black text-sm">
            <thead>
              <tr>
                <th className="text-left px-4 py-2">Autor</th>
                <th className="text-left px-4 py-2">Título</th>
                <th className="text-left px-4 py-2">Tamaño</th>
                <th className="text-left px-4 py-2">Fecha</th>
                <th className="text-left px-4 py-2">Decisión</th>
              </tr>
            </thead>
            <tbody>
              {archivos && archivos.length > 0 ? (
                archivos.map((item) => (
                  <tr key={item._id} className="border-t">
                    <td className="px-4 py-2">{item.autor ? item.autor : "Sin autor"}</td>
                    <td className="px-4 py-2">{item.nombre}</td>
                    <td className="px-4 py-2">{formatearTamano(item.tamano)}</td>
                    <td className="px-4 py-2">{item.fechaSubida}</td>
                    <td className="px-4 py-2 space-x-2">
                      <div className="flex flex-col gap-2 justify-center">
                        <button
                          onClick={() => aceptarArchivo(item._id)}
                          className="bg-green-500 hover:bg-green-600 text-white font-medium px-4 py-1 rounded"
                        >
                          Aceptar
                        </button>
                        <button
                          onClick={() => rechazarArchivo(item._id)}
                          className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-1 rounded"
                        >
                          Rechazar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-4 text-center text-gray-500"
                  >
                    No hay archivos pendientes.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      )}
    </div>
  );
};

export default PerfilUsuario;
