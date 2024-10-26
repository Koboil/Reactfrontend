//@ts-nocheck
/* eslint-disable */
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { register } from 'swiper/element/bundle';

register();

const BrandSlider = () => {
   const swiperElRef = useRef<Element>(null);

   useEffect(() => {
      // listen for Swiper events using addEventListener
      if (!swiperElRef.current) {
         return;
      }
      // swiper parameters
      const swiperParams: SwiperOptions = {
         slidesPerView: 2,
         spaceBetween: 90,
         speed: 1200,
         autoplay: {
            delay: 4000,
            disableOnInteraction: false,
         },
         breakpoints: {
            768: {
               slidesPerView: 3,
            },
            992: {
               slidesPerView: 4,
            },
            1200: {
               slidesPerView: 5,
            },
         },
         injectStyles: [
            `.swiper .brand-slider{
               height:100px;  
               }
      `,
         ],
      };

      // now we need to assign all parameters to Swiper element
      Object.assign(swiperElRef.current, swiperParams);

      // and now initialize it
      swiperElRef.current.initialize();
   }, []);

   return (
      <swiper-container
         class="swiper brand-slider"
         init={false}
         Ref={swiperElRef}
         breakpoints='{
                       "768": { "slidesPerView": 3 },
                       "992": { "slidesPerView": 4 },
                       "1200": { "slidesPerView": 5 }
                     }'
         slides-per-view="2"
         space-between="90"
         speed="1200"
         autoplay-delay={4000}
         autoplay-disable-on-interaction={false}
         loop="true"
         css-mode="true"
      >
         <swiper-slide className="swiper-slide">
            <Image
               src="/assets/img/brands/capgemini.svg"
               alt="Logo capgemini"
               width="186"
               height="46"
               className="h-auto w-fit"
            />
         </swiper-slide>
         <swiper-slide className="swiper-slide">
            <Image
               src="/assets/img/brands/microsoft.svg"
               alt="Logo Microsoft"
               width="186"
               height="46"
               className="h-auto w-fit"
            />
         </swiper-slide>
         <swiper-slide className="swiper-slide">
            <Image
               src="/assets/img/brands/meta.svg"
               alt="Logo Meta"
               width="186"
               height="46"
               className="h-auto w-fit"
            />
         </swiper-slide>
         <swiper-slide className="swiper-slide">
            <Image
               src="/assets/img/brands/bbc.svg"
               alt="Logo BBC"
               width="186"
               height="46"
               className="h-auto w-fit"
            />
         </swiper-slide>

         <swiper-slide className="swiper-slide">
            <Image
               src="/assets/img/brands/sony.svg"
               alt="Logo Sony"
               width="186"
               height="46"
               className="h-auto w-fit"
            />
         </swiper-slide>
         <swiper-slide className="swiper-slide">
            <Image
               src="/assets/img/brands/sanofi.svg"
               alt="Logo Sanofi"
               width="186"
               height="46"
               className="h-auto w-fit"
            />
         </swiper-slide>
         <swiper-slide className="swiper-slide">
            <Image
               src="/assets/img/brands/wwr.svg"
               alt="Logo WWR"
               width="186"
               height="46"
               className="h-auto w-fit"
            />
         </swiper-slide>
      </swiper-container>
   );
};

export default BrandSlider;
