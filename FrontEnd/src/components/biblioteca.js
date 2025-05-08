import React,{useState, useCallback, useEffect} from 'react'
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
import {useDropzone} from 'react-dropzone'

export const Biblioteca = () => {

    const [selectedDoc, setSelectedDoc] = useState(null);
    const handleOpenModal = (doc) => setSelectedDoc(doc);
    const handleCloseModal = () => setSelectedDoc(null);
    const handleDownload = () => {
      alert(`Descargando: ${selectedDoc.nombre}`);
      handleCloseModal();
    };
    
//Json prueba
    const [documentos, setDocumentos] = useState([
        {nombre: "Nombre largo de archivo para prueba de espacio en la caja de archivos en la seccion de biblioteca del proyecto ", autor: "Juan Pérez", size: "1.2 MB", tag: "pdf", },
        {nombre: "Presupuesto Q1", autor: "Ana Gómez",size: "850 KB",tag: "excel",},
        {nombre: "Acta Reunión",autor: "Luis Martínez",size: "620 KB",tag: "word", },
        {nombre: "Presentación Ventas",autor: "Camila Torres",size: "4.1 MB",tag: "ppt",},
        {nombre: "Notas de Proyecto",autor: "Pedro Sánchez",size: "150 KB",tag: "text",},
        {nombre: "Diseño Logo",autor: "Laura Gómez",size: "3.3 MB",tag: "img",},
        {nombre: "Archivos Comprimidos",autor: "Equipo TI",size: "5.4 MB",tag: "zip",},
        {nombre: "Documento sin tipo",autor: "Desconocido",size: "100 KB",tag: "otro",},
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
      
      const {acceptedFiles, getRootProps, getInputProps, isDragActive} = useDropzone()
      
      const files = acceptedFiles.map(file => (
        // <li key={file.name}>
        //   {file.name} - {file.size} bytes
        // </li>
        // console.log(file)
        <DocumentCard
          key={file.name}
          name={file.name}
          author={'Desconocido'}
          size={file.size}
          type={file.type}
        />
      ));
      
      const idCarpeta = 0;
      const idUser = "Animo";
      async function handleOnSubmit(params) {
        params.preventDefault();
        // console.log("Buscando: ", {nombre, etiqueta})
        
        const data = new FormData();
        acceptedFiles.forEach((archivo) => {
          data.append("archivos", archivo); // O "archivos[]", según espera tu backend
        });
        // data.append("folderId",idCarpeta.toString()) Si le envío id, es porque hay una carpeta
        data.append("userId", idUser.toString())

        try {
          const response = await fetch('http://localhost:3000/biblioteca/upload/',{
            method: 'POST',
            body: data,
          });
          
          const result = await response.json();  // Si el servidor responde en JSON
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
        console.log("Buscando: ", {nombre, etiqueta})

        try{
          // const respuesta = await fetch("https://api.ejemplo.com/documentos");
          // const datos = await respuesta.json();
          const datos = [{
            nombre: "Informe Final",
            autor: "Anonimo",
            size: "2.0 MB",
            tag: "pdf"
          },
          {nombre: "Nombre largo de archivo para prueba de espacio en la caja de archivos en la seccion de biblioteca del proyecto ", autor: "Juan Pérez", size: "1.2 MB", tag: "pdf", },
          {nombre: "Presupuesto Q1", autor: "Ana Gómez",size: "850 KB",tag: "excel",},
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
            const response = await fetch(`http://localhost:3000/biblioteca/list/${ubicacion}`);
            const data = await response.json();
            // setPublicaciones(data); // Guardamos las publicaciones en el estado
            console.log("Archivos obtenidos:", data);
          } catch (error) {
            console.error("Error al obtener archivos:", error);
          }
        };
        obtenerArchivos();
      }, [ubicacion]);

  return (
    
    <div className="flex flex-col items-center gap-4 pt-16 min-h-screen ">

    <h1 className="text-4xl sm:text-5xl font-bold text-white drop-shadow-[0_2px_6px_rgba(0,0,0,1)]">
        <span className="text-gray-200">Biblioteca</span>
    </h1>

    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
    </div>
    
    {acceptedFiles.length!=0 && (
      <div>
        <button onClick={handleOnSubmit}> Subir </button>
        <ul>{files}</ul>
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
          <option value="">Todas las etiquetas</option>
          <option value="educación">Educación</option>
          <option value="salud">Salud</option>
          <option value="cultura">Cultura</option>
          {/* <!-- Agrega más opciones según tus etiquetas --> */}
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