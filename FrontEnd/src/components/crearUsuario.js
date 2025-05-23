import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
export const CrearUsuario = () => {

  const navigate = useNavigate();


   const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    contraseña: "",
    confirmarContraseña: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría lógica de validación/envío
    navigate('/codigoGen')
    console.log(formData);
  };

  const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800/80 px-6 py-20">
      <div className="w-full max-w-xl bg-[#12143d] text-[#f0f0f0] rounded-2xl shadow-2xl p-10">
        <h2 className="text-4xl font-bold mb-6 text-center text-[#ffbf30]">
          Crear Cuenta
        </h2>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-base mb-1">Nombre</label>
            <input
              name="usuario"
              type="text"
              placeholder="Tu nombre"
              value={formData.usuario}
              onChange={handleChange}
              className="w-full px-5 py-3 rounded-xl bg-[#404270] text-[#f0f0f0] focus:ring-2 focus:ring-[#5445ff] outline-none"
            />
          </div>

          <div>
            <label className="block text-base mb-1">Apellidos</label>
            <input
              name="apellido"
              type="text"
              placeholder="Tus apellidos"
              value={formData.apellido}
              onChange={handleChange}
              className="w-full px-5 py-3 rounded-xl bg-[#404270] text-[#f0f0f0] focus:ring-2 focus:ring-[#5445ff] outline-none"
            />
          </div>

          <div>
            <label className="block text-base mb-1">Correo Electrónico</label>
            <input
              name="correo"
              type="email"
              placeholder="ejemplo@correo.com"
              value={formData.correo}
              onChange={handleChange}
              className="w-full px-5 py-3 rounded-xl bg-[#404270] text-[#f0f0f0] focus:ring-2 focus:ring-[#5445ff] outline-none"
            />
          </div>

          <div>
  <label className="block text-base mb-2">Contraseña</label>
  <div className="relative">
    <input
      type={showPassword ? "text" : "password"}
      name="contraseña"
      value={formData.contraseña}
      onChange={handleChange}
      placeholder="Contraseña"
      className="w-full px-5 py-3 pr-12 rounded-xl bg-[#404270] border-none text-[#f0f0f0] focus:ring-2 focus:ring-[#5445ff] outline-none"
    />
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-3 top-3 text-white"
    >
      👁️
    </button>
  </div>
</div>

<div>
  <label className="block text-base mb-2">Confirmar Contraseña</label>
  <div className="relative">
    <input
      type={showConfirmPassword ? "text" : "password"}
      name="confirmarContraseña"
      value={formData.confirmarContraseña}
      onChange={handleChange}
      placeholder="Confirmar Contraseña"
      className="w-full px-5 py-3 pr-12 rounded-xl bg-[#404270] border-none text-[#f0f0f0] focus:ring-2 focus:ring-[#5445ff] outline-none"
    />
    <button
      type="button"
      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
      className="absolute right-3 top-3 text-white"
    >
      👁️
    </button>
  </div>
</div>


          <button
            type="submit"
            className="w-full bg-[#ffbf30] hover:bg-[#e0a820] text-[#12141a] font-bold rounded-xl py-3 text-lg"
          >
            Registrarse
          </button>
        </form>

        <p className="mt-6 text-sm text-center">
          ¿Ya tienes cuenta?{" "}
          <a href="/iniciarSesion" className="text-[#ffbf30] font-medium">
            Inicia Sesión
          </a>
        </p>
      </div>
    </div>
  );
}

export default CrearUsuario
