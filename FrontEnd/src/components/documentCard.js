import React from 'react'

import {
    AiFillFilePdf,
    AiFillFileExcel,
    AiFillFileWord,
    AiFillFilePpt,
    AiFillFileText,
    AiFillFileImage,
    AiFillFileZip,
    AiFillFile,
    AiFillFolder,

} from 'react-icons/ai'


export const DocumentCard = ({ name, author, type = 'defiault', size, onClick }) => {
   
  

    const iconMap = {
        pdf: <AiFillFilePdf className="text-[#ed1c22] text-2xl min-w-[32px]" />,
        excel: <AiFillFileExcel className="text-green-500 text-2xl min-w-[32px]" />,
        word: <AiFillFileWord className="text-blue-500 text-2xl min-w-[32px]" />,
        ppt: <AiFillFilePpt className="text-orange-500 text-2xl min-w-[32px]" />,
        text: <AiFillFileText className="text-[#fb544a] text-2xl min-w-[32px]" />,
        img: <AiFillFileImage className="text-[#fea190] text-2xl min-w-[32px]" />,
        zip: <AiFillFileZip className="text-[#f8bd3a] text-2xl min-w-[32px]" />,
        carpeta: <AiFillFolder className="text-[#ffd04c] text-2x1 min-w-[32px]"/>,
        default: <AiFillFile className="text-gray-400 text-2xl min-w-[32px]" />,
      };


   

      const icon = iconMap[type.toLowerCase()] || iconMap.default;

     
      return (
  <div
    onClick={onClick}
    className="flex items-center gap-3 px-4 py-3 rounded-lg shadow bg-[#5445ff] hover:bg-[#3f35cc] cursor-pointer transition-all w-[90%] max-w-full"
  >
    {/* Icono de documento */}
    {icon}

    {/* Info del documento */}
    <div className="flex flex-col sm:flex-row w-full sm:gap-8 gap-1 sm:items-center min-w-0">
      {/* Nombre */}
      <div className="text-sm font-la text-white-900 truncate min-w-0 sm:w-1/3">
        {name}
      </div>

      {/* Autor (alineado + movido ligeramente a la derecha) */}
      
      {type !== 'carpeta' && (
        <div className="text-xs font-medium text-white-600 truncate min-w-0 sm:w-1/3 sm:text-left sm:pl-4">
        Autor: {author}
        </div>
      )}

      {/* Tamaño */}
      <div className="text-xs font-medium text-white-600 truncate min-w-0 sm:w-1/3 sm:text-right">
        {size}
      </div>
    </div>
  </div>
);

      
      

      
}

export default DocumentCard
