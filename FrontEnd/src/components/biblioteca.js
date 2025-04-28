import React,{useState} from 'react'
import DocumentCard from './documentCard'
import DocumentModal from './documentModal'
import {
    AiFillFilePdf,
    AiFillFileExcel,
    AiFillFileWord,
    AiFillFilePpt,
    AiFillFileText,
    AiFillFileImage,
    AiFillFileZip,
    AiFillFile,

} from 'react-icons/ai'

export const Biblioteca = () => {

    const [selectedDoc, setSelectedDoc] = useState(null);
    const handleOpenModal = (doc) => setSelectedDoc(doc);
    const handleCloseModal = () => setSelectedDoc(null);
    const handleDownload = () => {
      alert(`Descargando: ${selectedDoc.nombre}`);
      handleCloseModal();
    };
    
//Json prueba
    const documentos = [
        {nombre: "Nombre largo de archivo para prueba de espacio en la caja de archivos en la seccion de biblioteca del proyecto ", autor: "Juan Pérez", size: "1.2 MB", tag: "pdf", },
        {nombre: "Presupuesto Q1", autor: "Ana Gómez",size: "850 KB",tag: "excel",},
        {nombre: "Acta Reunión",autor: "Luis Martínez",size: "620 KB",tag: "word", },
        {nombre: "Presentación Ventas",autor: "Camila Torres",size: "4.1 MB",tag: "ppt",},
        {nombre: "Notas de Proyecto",autor: "Pedro Sánchez",size: "150 KB",tag: "text",},
        {nombre: "Diseño Logo",autor: "Laura Gómez",size: "3.3 MB",tag: "img",},
        {nombre: "Archivos Comprimidos",autor: "Equipo TI",size: "5.4 MB",tag: "zip",},
        {nombre: "Documento sin tipo",autor: "Desconocido",size: "100 KB",tag: "otro",},
      ];

    const modalIconMap = {
        pdf: <AiFillFilePdf className="text-[#ed1c22] text-7xl" />,
        excel: <AiFillFileExcel className="text-green-500 text-7xl" />,
        word: <AiFillFileWord className="text-blue-500 text-7xl" />,
        ppt: <AiFillFilePpt className="text-orange-500 text-7xl" />,
        text: <AiFillFileText className="text-[#fb544a] text-7xl" />,
        img: <AiFillFileImage className="text-[#fea190] text-7xl" />,
        zip: <AiFillFileZip className="text-[#f8bd3a] text-7xl" />,
        default: <AiFillFile className="text-gray-400 text-7xl" />,
      };


  return (
    
    <div className="flex flex-col items-center gap-4 pt-16 min-h-screen ">

    <h1 className="text-4xl sm:text-5xl font-bold text-white drop-shadow-[0_2px_6px_rgba(0,0,0,1)]">
        <span className="text-gray-200">Biblioteca</span>
    </h1>
    
    {documentos.map((doc, index) => (
        <DocumentCard
          key={index}
          name={doc.nombre}
          author={doc.autor}
          size={doc.size}
          type={doc.tag}
          onClick={() => handleOpenModal(doc)}
        />
      ))}

<DocumentModal
        isOpen={!!selectedDoc}
        name={selectedDoc?.nombre}
        size={selectedDoc?.size}
        author = {selectedDoc?.autor}
        icon={modalIconMap[selectedDoc?.tag] || modalIconMap.default}
        onClose={handleCloseModal}
        onDownload={handleDownload}
      />

  </div>

  


  )
}

export default Biblioteca