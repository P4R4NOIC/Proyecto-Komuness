import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export const RecuperarContra = () => {
  const codeRefs = useRef([]);
  const navigate = useNavigate();

  const handleInput = (e, index) => {
    const value = e.target.value;
    if (value && index < codeRefs.current.length - 1) {
      codeRefs.current[index + 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí podrías validar que el código esté completo antes de continuar
    navigate('/nuevaCont');
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-800/80 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-xl bg-[#12143d] text-[#f0f0f0] rounded-2xl shadow-2xl p-8 sm:p-10">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-[#ffbf30]">
          Código de Recuperación
        </h2>
        <p className="text-sm text-center mb-8 text-[#f0f0f0]">
          Se ha generado un código único para tu cuenta. Guárdalo cuidadosamente, ya que no se podrá recuperar.
        </p>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-base mb-2 text-center">Ingresa tu código de recuperación</label>
            <div className="grid grid-cols-6 sm:grid-cols-12 gap-2">
              {[...Array(12)].map((_, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  ref={(el) => (codeRefs.current[index] = el)}
                  onChange={(e) => handleInput(e, index)}
                  className="text-center px-2 py-3 rounded-xl bg-[#404270] border-none text-[#f0f0f0] focus:ring-2 focus:ring-[#5445ff] outline-none"
                />
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#5445ff] hover:bg-[#4032cc] text-white font-semibold rounded-xl py-3 text-lg"
          >
            Siguiente
          </button>
        </form>
        <p className="mt-6 text-sm text-center">
          ¿Recordaste tu contraseña?{' '}
          <a href="/iniciarSesion" className="text-[#ffbf30] font-medium">
            Inicia Sesión
          </a>
        </p>
      </div>
    </div>
  );
};

export default RecuperarContra;