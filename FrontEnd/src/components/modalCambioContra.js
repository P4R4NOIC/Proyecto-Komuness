// components/ModalCambioContrasena.jsx
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function ModalCambioContrasena({ userId, onClose, API_URL }) {
  const [nuevaContrasena, setNuevaContrasena] = useState("");
  const [confirmarContrasena, setConfirmarContrasena] = useState("");

  const manejarCambioContrasena = async () => {
    if (nuevaContrasena !== confirmarContrasena) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/usuario/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: nuevaContrasena }),
      });

      if (!res.ok) throw new Error("Error al actualizar contraseña");

      toast.success("Contraseña actualizada con éxito");
      onClose();
    } catch (error) {
      toast.error("No se pudo cambiar la contraseña");
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-[#12143d] text-[#f0f0f0] rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#ffbf30]">
          Cambiar Contraseña
        </h2>
        <input
          type="password"
          placeholder="Nueva contraseña"
          className="w-full mb-4 px-5 py-3 rounded-xl bg-[#404270] border-none text-[#f0f0f0] focus:ring-2 focus:ring-[#5445ff] outline-none"
          value={nuevaContrasena}
          onChange={(e) => setNuevaContrasena(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirmar contraseña"
          className="w-full mb-6 px-5 py-3 rounded-xl bg-[#404270] border-none text-[#f0f0f0] focus:ring-2 focus:ring-[#5445ff] outline-none"
          value={confirmarContrasena}
          onChange={(e) => setConfirmarContrasena(e.target.value)}
        />
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white font-medium rounded-xl"
          >
            Cancelar
          </button>
          <button
            onClick={manejarCambioContrasena}
            className="px-4 py-2 bg-[#ffbf30] hover:bg-yellow-400 text-black font-semibold rounded-xl"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
