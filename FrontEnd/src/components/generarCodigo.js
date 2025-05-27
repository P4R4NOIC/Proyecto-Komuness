import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const GenerarCodigo = () => {
  const [codigo, setCodigo] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const datosUsuario = location.state; // Aquí llegan los datos del formulario anterior

  const generarCodigo = () => {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let nuevoCodigo = '';
    for (let i = 0; i < 12; i++) {
      const index = Math.floor(Math.random() * caracteres.length);
      nuevoCodigo += caracteres[index];
    }
    setCodigo(nuevoCodigo);

    // Combina los datos del usuario + código y guarda en un JSON
    const datosFinales = {
      ...datosUsuario,
      codigo: nuevoCodigo
    };

    // Guardar como archivo JSON en local (simulado aquí con consola)
    console.log("Datos completos a guardar:", datosFinales);

   
    // fetch('http://localhost:3000/usuarios', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(datosFinales)
    // });
  };

  const salir = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-800/80 text-[#f0f0f0] px-4 py-10">
      <div className="bg-[#12143d] rounded-2xl shadow-2xl p-8 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4 text-[#ffbf30]">Código de Seguridad</h2>
        <p className="text-sm mb-6">
          Este código es único y se usará para recuperar tu cuenta. <strong>Guárdalo en un lugar seguro.</strong>
        </p>

        {codigo && (
          <div className="text-xl font-mono bg-[#404270] text-[#ffbf30] p-3 rounded-xl mb-4">
            {codigo}
          </div>
        )}

        {!codigo && (
          <button
            onClick={generarCodigo}
            className="bg-[#5445ff] hover:bg-[#4032cc] text-white font-semibold rounded-xl py-2 px-6 text-lg mb-4"
          >
            Generar Código
          </button>
        )}

        {codigo && (
          <button
            onClick={salir}
            className="bg-[#ff4b5c] hover:bg-[#cc3b4a] text-white font-semibold rounded-xl py-2 px-6 text-lg"
          >
            Salir
          </button>
        )}
      </div>
    </div>
  );
};

export default GenerarCodigo;
