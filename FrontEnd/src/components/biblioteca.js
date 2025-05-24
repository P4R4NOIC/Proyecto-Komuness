import React, { useState, useCallback, useEffect } from 'react'
import DocumentCard from './documentCard'
import DocumentModal from './documentModal'

import { useNavigate } from "react-router-dom";
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
import { useDropzone } from 'react-dropzone'

export const Biblioteca = () => {
  const navigate = useNavigate();

  const [selectedDoc, setSelectedDoc] = useState(null);
  const handleOpenModal = (doc) => setSelectedDoc(doc);
  const handleCloseModal = () => setSelectedDoc(null);
  const handleDownload = () => {
    alert(`Descargando: ${selectedDoc.nombre}`);
    handleCloseModal();
  };

  //Json prueba
  const [documentos, setDocumentos] = useState([
    /*{nombre: "Carpeta office", autor: "",size: "",tag: "carpeta",},
    {nombre: "Nombre largo de archivo para prueba de espacio en la caja de archivos en la seccion de biblioteca del proyecto ", autor: "Juan Pérez", size: "1.2 MB", tag: "pdf", },
    {nombre: "Presupuesto Q1", autor: "Ana Gómez",size: "850 KB",tag: "excel",},
    {nombre: "Acta Reunión",autor: "Luis Martínez",size: "620 KB",tag: "word", },
    {nombre: "Presentación Ventas",autor: "Camila Torres",size: "4.1 MB",tag: "ppt",},
    {nombre: "Notas de Proyecto",autor: "Pedro Sánchez",size: "150 KB",tag: "text",},
    {nombre: "Diseño Logo",autor: "Laura Gómez",size: "3.3 MB",tag: "img",},
    {nombre: "Archivos Comprimidos",autor: "Equipo TI",size: "5.4 MB",tag: "zip",},
    {nombre: "Documento sin tipo",autor: "Desconocido",size: "100 KB",tag: "otro",},*/
  ]);

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

  // const onDrop = useCallback(acceptedFiles => {
  // const file = new FileReader;
  // file.onload = function(){
  //   setPreview(file.result);
  // }
  // file.readAsDataURL(acceptedFiles[0])
  // }, [])

  /**
   * Feat búsqueda de archivos ya sea en una carpeta específica o en toda la biblioteca
   * //creamos la url
   * const url = new URL('http://localhost:3000/biblioteca/list');
   * //agregamos los parámetros
   * para la carpeta raiz le mandamos id=0 en el path variables
   * 
   * url.pathname += "/0";
   * 
   * si es un directorio especifico le mandamos el id de la carpeta
   * 
   * url.pathname += `/${idCarpeta}`;
   * 
   * //agregamos los parámetros
   * url.searchParams.append('nombre', nombre);
   * url.searchParams.append('global', "true"); //si es true busca en toda la biblioteca, si no se agrega este global, busca solo en la carpeta
   * 
   * ejemplo: http://localhost:3000/biblioteca/list/0?nombre=nombreArchivo&global=true
   * en el ejemplo anterior se busca desde la carpeta raiz (id=0) y en toda la biblioteca
   * 
   * ejemplo: http://localhost:3000/biblioteca/list/<idcarpeta>?nombre=nombreArchivo
   * en el ejemplo anterior se busca desde la carpeta con <idcarpeta> solo en esa carpeta el "nombreArchivo"
   */

  const { acceptedFiles, getRootProps, getInputProps, isDragActive } = useDropzone()

  const files = acceptedFiles.map(file => (
    // <li key={file.name}>
    //   {file.name} - {file.size} bytes
    // </li>
    // console.log(file)
    <div className='mb-5'>
      <DocumentCard
        key={file.name}
        name={file.name}
        author={'Desconocido'}
        size={file.size}
        type={file.type}
      />
    </div>
  ));


  const handleNavigation = (folderId, folderName) => {
    navigate(`/biblioteca/${folderId}`, {
      state: { folderName }, // pasa el nombre aquí
    });
  };

  // SUBIDA DE ARCHIVOS
  const idCarpeta = 0;
  const idUser = "Animo";
  async function handleOnSubmit(params) {
    params.preventDefault();

    const data = new FormData();
    acceptedFiles.forEach((archivo) => {
      data.append("archivos", archivo); 
    });
    // data.append("folderId",idCarpeta.toString()) Si le envío id, es porque hay una carpeta
    data.append("userId", idUser.toString())

    try {
      const response = await fetch('http://localhost:3000/biblioteca/upload/', {
      // const response = await fetch('https://proyecto-komuness-backend.vercel.app/biblioteca/upload/', {
        method: 'POST',
        body: data,
      });

      const result = await response.json(); 
      if (response.ok) {
        console.log("Archivos subidos con éxito:", result);
      } else {
        console.error("Error al subir archivos:", result);
      }

    } catch (error) {
      console.error("Error de red:", error);
    }
  }

  // SEARCH
  const [nombre, setNombre] = useState('');
  const [etiqueta, setEtiqueta] = useState('');
  const handleSearch = async (e) => {
    e.preventDefault();
    console.log("Buscando: ", { nombre, etiqueta })

    try {
      // const respuesta = await fetch("https://api.ejemplo.com/documentos");
      // const datos = await respuesta.json();
      const datos = [{
        nombre: "Informe Final",
        autor: "Anonimo",
        size: "2.0 MB",
        tag: "pdf"
      },
      { nombre: "Nombre largo de archivo para prueba de espacio en la caja de archivos en la seccion de biblioteca del proyecto ", autor: "Juan Pérez", size: "1.2 MB", tag: "pdf", },
      { nombre: "Presupuesto Q1", autor: "Ana Gómez", size: "850 KB", tag: "excel", },
      ];
      setDocumentos(datos);
    } catch (error) {
      console.log("Error al buscar documentos:", error);
    }
  }

  // OBTENER TODOS LOS ARCHIVOS
  const [ubicacion, setUbicacion] = useState(0);
  useEffect(() => {
    const obtenerArchivos = async () => {
      try {
        const response = await fetch(`https://proyecto-komuness-backend.vercel.app/biblioteca/list/${ubicacion}`);
        const data = await response.json();
        const archivos = data.contentFile.map(file => ({
          nombre: file.nombre,
          autor: file.autor,
          size: `${(file.tamano / (1024 * 1024)).toFixed(2)} MB`,
          tag: mapTipoArchivo(file.tipoArchivo),
          url: file.url
        }));

        const carpetas = data.contentFolder.map(folder => ({
          nombre: folder.nombre,
          autor: "",
          size: "",
          tag: "carpeta",
          id: folder._id
        }));

        setDocumentos([...carpetas, ...archivos]);
        console.log("Archivos obtenidos:", data);
      } catch (error) {
        console.error("Error al obtener archivos:", error);
      }
    };
    obtenerArchivos();
  }, [ubicacion]);



  const mapTipoArchivo = (mime) => {
    if (mime.includes("pdf")) return "pdf";
    if (mime.includes("word")) return "word";
    if (mime.includes("excel")) return "excel";
    if (mime.includes("presentation")) return "ppt";
    if (mime.includes("text")) return "text";
    if (mime.includes("zip") || mime.includes("rar")) return "zip";
    if (mime.includes("image")) return "img";
    return "otro";
  };

  return (

    <div className="flex flex-col items-center gap-4  bg-gray-800/80 pt-16 min-h-screen  ">

      <h1 className="text-4xl sm:text-5xl font-bold text-white drop-shadow-[0_2px_6px_rgba(0,0,0,1)]">
        <span className="text-gray-200">Biblioteca</span>
      </h1>

      <div
        {...getRootProps()}
        className="flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-xl p-8 text-center cursor-pointer transition hover:border-blue-500 hover:bg-blue-50"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-blue-600 font-medium">Suelta los archivos aquí ...</p>
        ) : (
          <p className="text-gray-600">
            Arrastra y suelta algunos archivos aquí, o{' '}
            <span className="text-blue-600 underline">haz clic para seleccionarlos</span>
          </p>
        )}
      </div>

      {acceptedFiles.length !== 0 && (
        <div className="mt-6 space-y-4">
          <div className='grid grid-cols-2 gap-8'>
            <button
              onClick={handleOnSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition"
            >
              Subir
            </button>
          </div>
          <ul className="">{files}</ul>
        </div>
      )}


      <div className="w-full px-4 py-2 text-black">
        <form className="flex flex-col md:flex-row gap-2 md:items-center w-full">

          {/* <!-- Input de búsqueda --> */}
          <input
            type="text"
            placeholder="Buscar por nombre..."
            className="w-full md:w-auto flex-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />

          {/* <!-- Select de etiquetas --> */}
          <select
            value={etiqueta}
            onChange={(e) => setEtiqueta(e.target.value)}
            className="w-full md:w-48 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todos los archivos</option>
            <option value="pdf">Pdf</option>
            <option value="excel">Excel</option>
            <option value="word">Word</option>
            <option value="ppt">Ppt</option>
            <option value="text">Texto</option>
            <option value="img">Img</option>
            <option value="zip">Zip</option>
            
            
          </select>

          {/* <!-- Botón de búsqueda --> */}
          <button
            className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
            onClick={handleSearch}
          >
            Buscar
          </button>

        </form>
      </div>


      {documentos.map((doc, index) => (
        <DocumentCard
          key={index}
          name={doc.nombre}
          author={doc.autor}
          size={doc.size}
          type={doc.tag}
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




  )
}

export default Biblioteca