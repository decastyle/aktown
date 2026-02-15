import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

export default function Gallery() {
  const images = [
    "https://raw.githubusercontent.com/creativetimofficial/public-assets/refs/heads/master/creative-ai/bg-3.jpg",
    "https://raw.githubusercontent.com/creativetimofficial/public-assets/refs/heads/master/creative-ai/bg-2.jpg",
    "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&w=2000&q=85",
  ];

  return (
    <>
      <style>{`
        .swiper-pagination-bullet {
          background: white !important;
        }
      `}</style>
      <div className="w-full max-w-4xl">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          loop
          spaceBetween={30}
          slidesPerView={1}
          className="rounded-lg"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                <img
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
