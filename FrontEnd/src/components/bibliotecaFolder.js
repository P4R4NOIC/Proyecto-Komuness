import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import DocumentCard from './documentCard';
import DocumentModal from './documentModal';

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
} from 'react-icons/ai';

export const BibliotecaFolder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const location = useLocation();
  const [folderName, setFolderName] = useState(location.state?.folderName || 'Carpeta');
  const [documentos, setDocumentos] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null);

  const handleOpenModal = (doc) => setSelectedDoc(doc);
  const handleCloseModal = () => setSelectedDoc(null);

  const handleDownload = () => {
    alert(`Descargando: ${selectedDoc.nombre}`);
    handleCloseModal();
  };

  const handleNavigation = (folderId, folderName) => {
    navigate(`/biblioteca/${folderId}`, {
      state: { folderName }, // pasa el nombre aquí
    });
  };

  const modalIconMap = {
    pdf: <AiFillFilePdf className="text-[#ed1c22] text-7xl" />,
    excel: <AiFillFileExcel className="text-green-500 text-7xl" />,
    word: <AiFillFileWord className="text-blue-500 text-7xl" />,
    ppt: <AiFillFilePpt className="text-orange-500 text-7xl" />,
    text: <AiFillFileText className="text-[#fb544a] text-7xl" />,
    img: <AiFillFileImage className="text-[#fea190] text-7xl" />,
    zip: <AiFillFileZip className="text-[#f8bd3a] text-7xl" />,
    carpeta: <AiFillFolder className="text-[#ffd04c] text-4xl min-w-[32px]" />,
    default: <AiFillFile className="text-gray-400 text-7xl" />,
  };

  const mapTipoArchivo = (mime) => {
    if (mime.includes('pdf')) return 'pdf';
    if (mime.includes('word')) return 'word';
    if (mime.includes('excel')) return 'excel';
    if (mime.includes('presentation')) return 'ppt';
    if (mime.includes('text')) return 'text';
    if (mime.includes('image')) return 'img';
    if (mime.includes('zip') || mime.includes('rar')) return 'zip';
    return 'otro';
  };

  useEffect(() => {
    const obtenerArchivos = async () => {
      try {
        const response = await fetch(`https://proyecto-komuness-backend.vercel.app/biblioteca/list/${id}`);
        const data = await response.json();

        

        const archivos = data.contentFile.map(file => ({
          nombre: file.nombre,
          autor: file.autor || 'Desconocido',
          size: `${(file.tamano / (1024 * 1024)).toFixed(2)} MB`,
          tag: mapTipoArchivo(file.tipoArchivo),
          url: file.url,
        }));

        const carpetas = data.contentFolder.map(folder => ({
          nombre: folder.nombre,
          autor: '',
          size: '',
          tag: 'carpeta',
          id: folder._id,
        }));

        setDocumentos([...carpetas, ...archivos]);
        console.log("Archivos obtenidos:", data);
      } catch (error) {
        console.error("Error al obtener archivos:", error);
      }
    };

    obtenerArchivos();
  }, [id]);

  return (
    <div className="flex flex-col items-center bg-gray-800/80 gap-4 pt-16 min-h-screen">
      {/* Título grande como en Biblioteca */}
      <h1 className="text-4xl sm:text-5xl font-bold text-white drop-shadow-[0_2px_6px_rgba(0,0,0,1)]">
        <span className="text-gray-200">Biblioteca</span>
      </h1>

      {/* Nombre de la carpeta actual */}
      <p className="text-xl text-white font-semibold flex items-center gap-2">
        <AiFillFolder className="text-[#ffd04c] text-2xl" />
        {folderName}
    </p>

      {/* Lista de carpetas y archivos */}
      {documentos.map((doc, index) => (
        <DocumentCard
          key={index}
          name={doc.nombre}
          author={doc.autor}
          size={doc.size}
          type={doc.tag}
          icon={modalIconMap[doc.tag] || modalIconMap.default}
          onClick={() => {
            if (doc.tag === 'carpeta') {
              handleNavigation(doc.id, doc.nombre);
            } else {
              handleOpenModal(doc);
            }
          }}
        />
      ))}

      <DocumentModal
        isOpen={!!selectedDoc}
        name={selectedDoc?.nombre}
        size={selectedDoc?.size}
        author={selectedDoc?.autor}
        icon={modalIconMap[selectedDoc?.tag] || modalIconMap.default}
        onClose={handleCloseModal}
        onDownload={handleDownload}
      />
    </div>
  );
};

export default BibliotecaFolder;
