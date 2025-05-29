import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useAuth } from "../components/context/AuthContext";

export const FormularioPublicacion = ({ isOpen, onClose}) => {
  
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    titulo: "",
    contenido: "",
    autor: "",
    fecha: new Date().toLocaleDateString(),
    archivos: [],
    comentarios: [],
    tag: "",
    publicado: false,
    fechaEvento: "",
    precio: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      archivos: [...prev.archivos, ...files],
    }));
  };

  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      archivos: prev.archivos.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    const data = new FormData();

    data.append("titulo", formData.titulo);
    data.append("contenido", formData.contenido);
    data.append("autor", user._id);
    data.append("fecha", formData.fecha);
    data.append("tag", formData.tag);
    data.append("publicado", formData.publicado.toString());
    data.append("fechaEvento", formData.fechaEvento);
    data.append("precio", formData.precio);
    // data.append("comentarios", formData.comentarios);
    // archivos:
    formData.archivos.forEach((archivo) => {
      data.append("archivos", archivo); // O "archivos[]", según espera tu backend
    });

    try {
      const response = await fetch(
        "https://proyecto-komuness-backend.vercel.app/publicaciones/v2/",
        {
          method: "POST",
          body: data,
        }
      );

      const result = await response.json(); // Si el servidor responde en JSON
      if (response.ok) {
        console.log("Publicación enviada con éxito:", result);
      } else {
        console.error("Error al enviar publicación:", result);
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {isOpen && (
        
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-start pt-10 px-4 overflow-y-auto">
           <div className="max-w-3xl w-full bg-white text-zinc-950 shadow-md rounded-lg p-4 md:p-6">
            {/* Formulario */}
            <form onSubmit={handleSubmit} className="grid gap-4">
              {/* Botones flotantes SOLO en móviles, dentro del formulario */}
              <div className="md:hidden flex justify-between w-full  mb-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="text-gray-600 text-2xl font-bold"
                >
                  <IoMdClose size={35} />
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white text-sm px-3 py-1 rounded"
                >
                  Publicar
                </button>
              </div>
              {/* Título */}
              <div>
                <label className="block font-semibold">Título:</label>
                <input
                  type="text"
                  name="titulo"
                  value={formData.titulo}
                  onChange={handleChange}
                  maxLength={100}
                  className="w-full p-2 border rounded"
                  required
                />
                <p className="text-sm text-gray-500">
                  {formData.titulo.length}/100 caracteres
                </p>
              </div>

              {/* Categoría */}
              <div>
                <label className="block font-semibold">Categoría:</label>
                <select
                  name="tag"
                  value={formData.tag}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="">Selecciona una categoría</option>
                  <option value="publicacion">Publicacion</option>
                  <option value="evento">Evento</option>
                  <option value="emprendimiento">Emprendimiento</option>
                </select>
              </div>

              {/* Descripción */}
              <div>
                <label className="block font-semibold">Descripción:</label>
                <textarea
                  name="contenido"
                  value={formData.contenido}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Numero de telefono:
            Enlace de contacto:"
                  rows="4"
                  required
                ></textarea>
              </div>

              {/* Precio */}
              {(formData.tag === "evento" ||
                formData.tag === "emprendimiento") && (
                <div>
                  {/* Precio */}
                  <div>
                    <label className="block font-semibold">Precio:</label>
                    <input
                      type="number"
                      name="precio"
                      value={formData.precio}
                      onChange={handleChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold">Imágenes:</label>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                </div>
              )}

              {/* Subir imágenes */}

              {/* Vista previa de imágenes */}
              {formData.archivos.length > 0 && (
                <div className="mt-3">
                  <h3 className="font-semibold mb-2">Vista previa:</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {formData.archivos.map((img, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(img)}
                          alt={`Imagen ${index + 1}`}
                          className="w-full h-20 object-cover rounded border"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="absolute top-0 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded-full"
                        >
                          <IoMdClose />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {/* Date picker (solo si es evento) */}
              {formData.tag === "evento" && (
                <div>
                  <label className="block font-semibold">
                    Fecha del evento:
                  </label>
                  <input
                    type="date"
                    name="fechaEvento"
                    value={formData.fechaEvento}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
              )}
              {/* Botones normales (SOLO en pantallas grandes) */}
              <div className="hidden md:flex justify-between gap-3 mt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-400 text-white rounded w-full md:w-auto"
                >
                  Volver
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded w-full md:w-auto"
                >
                  Publicar
                </button>
              </div>
            </form>
          </div>
          </div>
      )}
    </>
  );
};

export default FormularioPublicacion;
