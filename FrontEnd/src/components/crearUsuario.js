import React, { useState } from "react";

export const CrearUsuario = () => {
   const [formData, setFormData] = useState({
    usuario: "",
    correo: "",
    contraseña: "",
    confirmarContraseña: "",
    edad: "",
    genero: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría lógica de validación/envío
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
            <label className="block text-base mb-1">Nombre de Usuario</label>
            <input
              name="usuario"
              type="text"
              placeholder="Tu nombre de usuario"
              value={formData.usuario}
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
      onMouseDown={() => setShowPassword(true)}
      onMouseUp={() => setShowPassword(false)}
      onMouseLeave={() => setShowPassword(false)}
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
      onMouseDown={() => setShowConfirmPassword(true)}
      onMouseUp={() => setShowConfirmPassword(false)}
      onMouseLeave={() => setShowConfirmPassword(false)}
      className="absolute right-3 top-3 text-white"
    >
      👁️
    </button>
  </div>
</div>

          <div>
  <label className="block text-base mb-1">Fecha de Nacimiento</label>
  <div className="grid grid-cols-3 gap-2">
    <input
      type="number"
      name="dia"
      min="1"
      max="31"
      placeholder="Día"
      value={formData.dia}
      onChange={handleChange}
      className="w-full px-4 py-3 rounded-xl bg-[#404270] text-[#f0f0f0] focus:ring-2 focus:ring-[#5445ff] outline-none"
    />
    <select
      name="mes"
      value={formData.mes}
      onChange={handleChange}
      className="w-full px-4 py-3 rounded-xl bg-[#404270] text-[#f0f0f0] focus:ring-2 focus:ring-[#5445ff] outline-none"
    >
      <option value="">Mes</option>
      {[
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
      ].map((mes, index) => (
        <option key={index} value={index + 1}>{mes}</option>
      ))}
    </select>
    <input
      type="number"
      name="anio"
      min="1900"
      max={new Date().getFullYear()}
      placeholder="Año"
      value={formData.anio}
      onChange={handleChange}
      className="w-full px-4 py-3 rounded-xl bg-[#404270] text-[#f0f0f0] focus:ring-2 focus:ring-[#5445ff] outline-none"
    />
  </div>
</div>
          <div>
            <label className="block text-base mb-1">Género (opcional)</label>
            <select
              name="genero"
              value={formData.genero}
              onChange={handleChange}
              className="w-full px-5 py-3 rounded-xl bg-[#404270] text-[#f0f0f0] focus:ring-2 focus:ring-[#5445ff] outline-none"
            >
              <option value="">Selecciona una opción</option>
              <option value="femenino">Femenino</option>
              <option value="masculino">Masculino</option>
              <option value="otro">Otro</option>
              <option value="prefiero no decirlo">Prefiero no decirlo</option>
            </select>
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
