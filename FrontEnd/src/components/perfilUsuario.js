import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { API_URL } from "../utils/api";
import "../CSS/perfilUsuario.css";
import { useAuth } from "./context/AuthContext";
import ModalCambioContrasena from "./modalCambioContra";

export const PerfilUsuario = () => {
  const navigate = useNavigate();
  const [publicaciones, setPublicaciones] = useState([]);
  const [archivos, setArchivos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const { user, logout } = useAuth();
  const [modalAbierto, setModalAbierto] = useState(false);
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  // Función para cargar publicaciones
  const cargarPublicaciones = () => {
    fetch(`${API_URL}/publicaciones/?publicado=false`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setPublicaciones(data.data))
      .catch((error) => console.error("Error al obtener las publicaciones: ", error));
  };

  // Función para cargar archivos
  const cargarArchivos = () => {
    fetch(`${API_URL}/biblioteca/list/0?publico=false&global=true`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setArchivos(data.contentFile))
      .catch((error) => console.error("Error al obtener los archivos: ", error));
  };

  // Función para cargar usuarios
  const cargarUsuarios = () => {
    fetch(`${API_URL}/usuario?tipoUsuario=1,2`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUsuarios(data))
      .catch((error) => console.error("Error al obtener los usuarios: ", error));
  };

  // useEffect que controla la carga de datos administrativos
  useEffect(() => {
    if (user && (user.tipoUsuario === 0 || user.tipoUsuario === 1)) {
      cargarPublicaciones();
      cargarArchivos();
      cargarUsuarios();
    }
  }, [user]);


  const aceptarPost = async (id) => {
    const promesa = fetch(`${API_URL}/publicaciones/${id}`, {
      method: "PUT", // o PATCH, según tu API
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ publicado: true }),
    });

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
    const promesa = fetch(`${API_URL}/publicaciones/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

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
    const promesa = fetch(`${API_URL}/biblioteca/edit/${id}`, {
      method: "PUT", // o PATCH, según tu API
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ esPublico: true }),
    });

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
    const promesa = fetch(`${API_URL}/biblioteca/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

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

  const otorgarPermiso = async (id, tipoUsuarioActual) => {
    const nuevoTipoUsuario = tipoUsuarioActual === 1 ? 2 : 1;

    const promesa = fetch(`${API_URL}/usuario/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ tipoUsuario: nuevoTipoUsuario }),
    });

    toast.promise(promesa, {
      loading: "Actualizando permisos...",
      success: "Permisos actualizados",
      error: "Error al actualizar permisos",
    });

    try {
      const response = await promesa;
      const usuarioActualizado = await response.json();

      setUsuarios((prevUsuarios) =>
        prevUsuarios.map((usuario) =>
          usuario._id === id ? usuarioActualizado : usuario
        )
      );
    } catch (error) {
      console.error("Error al actualizar permisos:", error);
    }
  };

  const [searchTerm, setSearchTerm] = useState("");

  // Filtrar usuarios según nombre, apellido o email que contenga el término de búsqueda (ignorando mayúsculas/minúsculas)
  const usuariosFiltrados = usuarios.filter((item) => {
    const texto = searchTerm.toLowerCase();
    return (
      item.nombre?.toLowerCase().includes(texto) ||
      item.apellido?.toLowerCase().includes(texto) ||
      item.email.toLowerCase().includes(texto)
    );
  });


  return (

    <div className={`flex flex-col md:flex-row gap-6 w-full min-h-screen bg-gray-800/80 p-6
      ${user?.tipoUsuario === 2 ? "justify-center" : "md:flex-row gap-6"}`}>
      <div
        className={`paginaUsuario flex flex-col items-center gap-4 w-full 
          ${user?.tipoUsuario === 2 ? "items-center w-full max-w-md" : "items-center w-full md:w-1/3"}`}>
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
            {modalAbierto && (
              <ModalCambioContrasena
                userId={user._id}
                onClose={() => setModalAbierto(false)}
                API_URL={API_URL}
              />
            )}
            <button
              onClick={() => setModalAbierto(true)}
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              Cambiar contraseña
            </button>
          </div>
          <div>
            <button
              onClick={() => {
                logout();
                navigate("/");
              }}
              className="mt-4 bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>

      {user && (user.tipoUsuario === 0 || user.tipoUsuario === 1) && (
        <div className="w-full md:w-2/3 flex flex-col gap-6 bg-gray-50 rounded-xl p-6">
          <h1 className="text-black">Dashboard Administrativo</h1>

          <div className="overflow-x-auto max-h-[300px] overflow-y-auto bg-white rounded-xl shadow-md p-4">
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
                  <th className="text-left px-4 py-2">Vista Previa</th>
                  <th className="text-left px-4 py-2">Decisión</th>
                </tr>
              </thead>
              <tbody>
                {publicaciones && publicaciones.length > 0 ? (
                  publicaciones.map((item) => (
                    <tr key={item._id} className="border-t">
                      <td className="px-4 py-2">
                        {item.autor ? item.autor.nombre : "Sin autor"}
                      </td>
                      <td className="px-4 py-2">{item.titulo}</td>
                      <td className="px-4 py-2">{item.tag}</td>
                      <td className="px-4 py-2">{item.fecha}</td>
                      <td className="px-4 py-2">
                        <a 
                          href={`publicaciones/${item._id}`} 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          Ver publicación
                        </a>
                      </td>
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

          <div className="overflow-x-auto max-h-[300px] overflow-y-auto bg-white rounded-xl shadow-md p-4">
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
                      <td className="px-4 py-2">
                        {item.autor ? item.autor.nombre : "Sin autor"}
                      </td>
                      <td className="px-4 py-2">{item.nombre}</td>
                      <td className="px-4 py-2">
                        {formatearTamano(item.tamano)}
                      </td>
                      <td className="px-4 py-2">
                        {item.fechaSubida
                          ? new Date(item.fechaSubida).toLocaleDateString(
                            "es-ES"
                          )
                          : "Fecha no disponible"}
                      </td>
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

          {user.tipoUsuario === 0 && (
            <div className="overflow-x-auto max-h-[300px] overflow-y-auto bg-white rounded-xl shadow-md p-4">
              <h2 className="text-lg font-semibold text-black mb-2">Otorgar permisos</h2>

              <input
                type="text"
                placeholder="Busqueda"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-4 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black-400 text-black"
              />

              <table className="min-w-full text-black text-sm">
                <thead>
                  <tr>
                    <th className="text-left px-4 py-2">Nombre</th>
                    <th className="text-left px-4 py-2">Apellidos</th>
                    <th className="text-left px-4 py-2">Email</th>
                    <th className="text-left px-4 py-2">Tipo de Usuario</th>
                  </tr>
                </thead>
                <tbody>
                  {usuariosFiltrados && usuariosFiltrados.length > 0 ? (
                    usuariosFiltrados.map((item) => (
                      <tr key={item._id} className="border-t">
                        <td className="px-4 py-2">{item.nombre || "Sin nombre"}</td>
                        <td className="px-4 py-2">{item.apellido || "Sin apellido"}</td>
                        <td className="px-4 py-2">{item.email}</td>
                        <td className="px-4 py-2">
                          <label className="inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="absolute w-0 h-0 opacity-0 sr-only peer"
                              checked={item.tipoUsuario === 1}
                              onChange={() => otorgarPermiso(item._id, item.tipoUsuario)}
                            />
                            <div
                              className="relative w-14 h-7 bg-gray-200 rounded-full peer dark:bg-gray-700
                          peer-focus:ring-4 peer-focus:ring-yellow-300 dark:peer-focus:ring-yellow-800
                          peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full
                          peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5
                          after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full
                          after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-yellow-400 dark:peer-checked:bg-yellow-400"
                            ></div>
                            <span className="ms-3 text-sm font-medium text-black-900 dark:text-black-300">
                              {item.tipoUsuario === 1 ? "Admin" : "Usuario"}
                            </span>
                          </label>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-4 py-4 text-center text-gray-500">
                        No existen usuarios.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PerfilUsuario;
