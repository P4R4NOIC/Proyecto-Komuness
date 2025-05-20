import React from 'react'

export const NuevaContra = () => {
  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-800/80 px-6 py-20">
      <div className="w-full max-w-xl bg-[#12143d] text-[#f0f0f0] rounded-2xl shadow-2xl p-10">
        <h2 className="text-4xl font-bold mb-6 text-center text-[#ffbf30]">
          Nueva Contraseña
        </h2>
        <p className="text-sm text-center mb-8 text-[#f0f0f0]">
          Ingresa tu nueva contraseña para actualizarla.
        </p>
        <form className="space-y-6">
          <div>
            <label htmlFor="new-password" className="block text-base mb-2">
              Introduzca Nueva Contraseña
            </label>
            <input
              id="new-password"
              type="password"
              placeholder="Nueva contraseña"
              className="w-full px-5 py-3 rounded-xl bg-[#404270] border-none text-[#f0f0f0] focus:ring-2 focus:ring-[#5445ff] outline-none"
            />
          </div>

          <div>
            <label htmlFor="confirm-password" className="block text-base mb-2">
              Repita la Nueva Contraseña
            </label>
            <input
              id="confirm-password"
              type="password"
              placeholder="Repetir contraseña"
              className="w-full px-5 py-3 rounded-xl bg-[#404270] border-none text-[#f0f0f0] focus:ring-2 focus:ring-[#5445ff] outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#5445ff] hover:bg-[#4032cc] text-white font-semibold rounded-xl py-3 text-lg"
          >
            Actualizar Contraseña
          </button>
        </form>
        <p className="mt-6 text-sm text-center">
          ¿Recordaste tu contraseña? {" "}
          <a href="/iniciarSesion" className="text-[#ffbf30] font-medium">
            Inicia Sesión
          </a>
        </p>
      </div>
    </div>
  );
}

export default NuevaContra
