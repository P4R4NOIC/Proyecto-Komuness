import React, {useRef} from 'react'

export const RecuperarContra = () => {
const codeRefs = useRef([]);



  const handleInput = (e, index) => {
    const value = e.target.value;
    if (value && index < codeRefs.current.length - 1) {
      codeRefs.current[index + 1].focus();
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-800/80 px-6 py-20">
      <div className="w-full max-w-xl bg-[#12143d] text-[#f0f0f0] rounded-2xl shadow-2xl p-10">
        <h2 className="text-4xl font-bold mb-6 text-center text-[#ffbf30]">
          Recuperar Contraseña
        </h2>
        <p className="text-sm text-center mb-8 text-[#f0f0f0]">
          Ingresa tu correo electrónico y te enviaremos un código de verificación para restablecer tu contraseña.
        </p>
        <form className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-base mb-2">
              Correo Electrónico
            </label>
            <input
              id="email"
              type="email"
              placeholder="ejemplo@correo.com"
              className="w-full px-5 py-3 rounded-xl bg-[#404270] border-none text-[#f0f0f0] focus:ring-2 focus:ring-[#5445ff] outline-none"
            />
          </div>

          <button
            type="button"
            className="w-full bg-[#ffbf30] hover:bg-[#e0a820] text-[#12141a] font-semibold rounded-xl py-3 text-lg"
          >
            Enviar Código
          </button>

          <div>
            <label className="block text-base mb-2">Código de Verificación</label>
            <div className="flex justify-between gap-2">
              {[...Array(7)].map((_, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  ref={el => (codeRefs.current[index] = el)}
                  onChange={e => handleInput(e, index)}
                  className="w-full text-center px-3 py-3 rounded-xl bg-[#404270] border-none text-[#f0f0f0] focus:ring-2 focus:ring-[#5445ff] outline-none"
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
          ¿Recordaste tu contraseña? {" "}
          <a href="/iniciarSesion" className="text-[#ffbf30] font-medium">
            Inicia Sesión
          </a>
        </p>
      </div>
    </div>
  );
}

export default RecuperarContra