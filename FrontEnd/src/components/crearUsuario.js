import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs'; // ← IMPORTACIÓN

export const CrearUsuario = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    confirmarContraseña: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación de campos requeridos
    const { usuario, apellido, correo, contraseña, confirmarContraseña } = formData;
    if (!usuario || !apellido || !correo || !contraseña || !confirmarContraseña) {
      alert("Todos los campos son obligatorios");
      return;
    }

    if (contraseña !== confirmarContraseña) {
      alert("Las contraseñas no coinciden");
      return;
    }

    // Hashear la contraseña antes de continuar
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(contraseña, salt);

    // Crear nuevo objeto sin confirmarContraseña
    const usuarioFinal = {
      usuario,
      apellido,
      correo,
      contraseña: hash
    };

    console.log("Usuario final con contraseña hasheada:", usuarioFinal);

    // Simular que pasas los datos al siguiente paso
    navigate('/codigoGen', { state: usuarioFinal });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800/80 px-6 py-20">
      <div className="w-full max-w-xl bg-[#12143d] text-[#f0f0f0] rounded-2xl shadow-2xl p-10">
        <h2 className="text-4xl font-bold mb-6 text-center text-[#ffbf30]">Crear Cuenta</h2>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-base mb-1">Nombre</label>
            <input
              name="usuario"
              type="text"
              placeholder="Tu nombre"
              value={formData.usuario}
              onChange={handleChange}
              required
              className="w-full px-5 py-3 rounded-xl bg-[#404270] text-[#f0f0f0]"
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
              required
              className="w-full px-5 py-3 rounded-xl bg-[#404270] text-[#f0f0f0]"
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
              required
              className="w-full px-5 py-3 rounded-xl bg-[#404270] text-[#f0f0f0]"
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
                required
                placeholder="Contraseña"
                className="w-full px-5 py-3 pr-12 rounded-xl bg-[#404270] text-[#f0f0f0]"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-white">👁️</button>
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
                required
                placeholder="Confirmar Contraseña"
                className="w-full px-5 py-3 pr-12 rounded-xl bg-[#404270] text-[#f0f0f0]"
              />
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-3 text-white">👁️</button>
            </div>
          </div>

          <button type="submit" className="w-full bg-[#ffbf30] text-[#12141a] font-bold rounded-xl py-3 text-lg">Registrarse</button>
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
};

export default CrearUsuario;
