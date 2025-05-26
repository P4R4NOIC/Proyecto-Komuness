import React, { useState } from 'react';
import '../CSS/fuenteKomuness.css';

export const InitForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://proyecto-komuness-backend.vercel.app/usuario/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login exitoso:', data);
        // Aquí puedes redirigir o guardar token, etc.
      } else {
        console.error('Error en login:', data.message || 'Error desconocido');
        // Aquí puedes mostrar un mensaje de error
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-800/80 px-6 py-12 pt-24">
      <div className="w-full max-w-xl bg-[#12143d] text-[#f0f0f0] rounded-2xl shadow-2xl p-10">
        <h2 className="text-4xl font-bold mb-8 text-center text-[#ffbf30]">
          ¡Bienvenido!
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-base mb-2">
              Correo Electrónico
            </label>
            <input
              id="email"
              type="email"
              placeholder="ejemplo@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-3 rounded-xl bg-[#404270] border-none text-[#f0f0f0] focus:ring-2 focus:ring-[#5445ff] outline-none"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-base mb-2">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-3 rounded-xl bg-[#404270] border-none text-[#f0f0f0] focus:ring-2 focus:ring-[#5445ff] outline-none"
              required
            />
            <div className="text-right mt-2">
              <a href="/recuperar" className="text-sm text-[#ffbf30] hover:underline">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-[#5445ff] hover:bg-[#4032cc] text-white font-semibold rounded-xl py-3 text-lg"
          >
            Iniciar Sesión
          </button>
        </form>
        <p className="mt-6 text-sm text-center">
          ¿No tienes cuenta?{" "}
          <a href="/crearUsr" className="text-[#ffbf30] font-medium">
            Regístrate
          </a>
        </p>
      </div>
    </div>
  );
};

export default InitForm;
