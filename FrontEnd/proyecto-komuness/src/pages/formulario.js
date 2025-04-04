import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
const FormularioPublicacion = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "", //   contenido: "",
    //   autor: "",
    //   fecha: new Date().toISOString(), // Se inicializa con la fecha actual en formato ISO
    imagenes: [], //   adjunto: [],
    //   comentarios: [], // Se asume que inicialmente no hay comentarios
    categoria: "", //   tag: "",
    //   publicado: false,
    fechaEvento: "",
    precio: "",
    
  });

  // const [formData, setFormData] = useState({
  //   titulo: "",
  //   contenido: "",
  //   autor: "",
  //   fecha: new Date().toISOString(), // Se inicializa con la fecha actual en formato ISO
  //   adjunto: [],
  //   comentarios: [], // Se asume que inicialmente no hay comentarios
  //   tag: "",
  //   publicado: false,
  //   fechaEvento: "", // Opcional
  //   Precio: "", // Opcional, lo dejamos como string para evitar problemas con inputs de texto
  // });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      imagenes: [...prev.imagenes, ...files],
    }));
  };

  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      imagenes: prev.imagenes.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://0.0.0.0:3000/publicaciones", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log("Publicación enviada con éxito:", data);
      } else {
        console.error("Error al enviar publicación:", data);
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };
  

  return (
    <div className="max-w-3xl mx-auto mt-5 p-4 md:p-6 bg-white text-zinc-950 shadow-md rounded-lg">
      
      {/* Formulario */}
      <form onSubmit={handleSubmit} className="grid gap-4">
        {/* Botones flotantes SOLO en móviles, dentro del formulario */}
        <div className="md:hidden flex justify-between w-full  mb-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="text-gray-600 text-2xl font-bold"
          >
            <IoMdClose size={35}/>
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
          <p className="text-sm text-gray-500">{formData.titulo.length}/100 caracteres</p>
        </div>

        {/* Categoría */}
        <div>
          <label className="block font-semibold">Categoría:</label>
          <select
            name="categoria"
            value={formData.categoria}
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
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Numero de telefono:
            Enlace de contacto:"
            rows="4"
            required
          ></textarea>
        </div>

        {/* Precio y Enlace de contacto en la misma línea en pantallas grandes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

          {/* Enlace de contacto */}
          <div>
            <label className="block font-semibold">Enlace de contacto:</label>
            <input
              type="url"
              name="enlace"
              value={formData.enlace}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Ej: https://wa.me/123456789"
              required
            />
          </div>
        </div>

        {/* Subir imágenes */}
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

        {/* Vista previa de imágenes */}
        {formData.imagenes.length > 0 && (
          <div className="mt-3">
            <h3 className="font-semibold mb-2">Vista previa:</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {formData.imagenes.map((img, index) => (
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
                    <IoMdClose/>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Date picker (solo si es evento) */}
        {formData.categoria === "evento" && (
          <div>
            <label className="block font-semibold">Fecha del evento:</label>
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
            onClick={() => navigate(-1)}
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
  );
};

export default FormularioPublicacion;
