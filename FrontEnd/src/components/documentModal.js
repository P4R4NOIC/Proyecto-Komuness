import React from 'react'

export const DocumentModal = ({ isOpen, onClose, onDownload, name, size, icon, author }) => {
  
    if (!isOpen) return null;
    return (
    
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-[#2A2A35] text-white p-6 rounded-lg shadow-[0_4px_20px_rgba(0,0,0,1)] w-[90%] max-w-md text-center">
          <div className="flex flex-col items-center gap-4">
            {/* Icono grande */}
            <div className="text-6xl">{icon}</div>
  
            {/* Info */}

            <h2 className="text-xl font-semibold">{name}</h2>
            <p className="text-sm text-gray-300">{author}</p> 
            <p className="text-sm text-gray-300">{size}</p>
  
            {/* Botones */}
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={onDownload}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
              >
                Descargar
              </button>
              <button
                onClick={onClose}
                className="bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded text-white"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>


  )
}


export default DocumentModal