import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from "swiper/modules";
import 'swiper/css'
import "swiper/css/navigation";
import "swiper/css/pagination";

export const Slider = ({ publicacion }) => {
    const imagenes = publicacion?.adjunto ?? [];
  const [zoomedImg, setZoomedImg] = useState(null);

  const abrirZoom = (img) => setZoomedImg(img);
  const cerrarZoom = () => setZoomedImg(null);

  if (imagenes.length === 0) return <p>No hay imágenes disponibles.</p>;

  return (
    <div className="w-full max-w-md mx-auto h-64 relative">
        <Swiper   spaceBetween={10} 
                slidesPerView={1} 
                loop={true} 
                modules={[Navigation,Pagination]}
                navigation={true}
                pagination={{clickable: true}}
        >
        {imagenes.map((img, idx) => (
          <SwiperSlide key={idx}>
            <img
              src={img.url ?? "/notFound.jpg"}
              alt={publicacion.titulo}
              className="w-full h-64 object-cover rounded-lg shadow-lg cursor-pointer"
              onClick={() => abrirZoom(img.url)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
        <style>{`
        .swiper-pagination-bullet {
          background-color: white;
          opacity: 0.6;
        }
        .swiper-pagination-bullet-active {
          background-color: white;
          opacity: 1;
        }
        .swiper-button-next,
        .swiper-button-prev {
          color: white;
        }
      `}</style>
      {zoomedImg && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={cerrarZoom}
        >
          <img
            src={zoomedImg}
            alt="Imagen ampliada"
            className="max-w-4xl max-h-[80vh] rounded-lg shadow-2xl"
          />
        </div>
      )}
    </div>
  );
};

export default Slider;