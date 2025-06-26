"use client"
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay"
import Image from 'next/image';



const  PartnerSlider = () => {
  const partners = [
    { id: 1, src: "/logo.png", alt: "Real Estate Experts" },
    { id: 2, src: "/logo.png", alt: "Real Estate Experts" },
    { id: 3, src: "/logo.png", alt: "Real Estate Experts" },
    { id: 4, src: "/logo.png", alt: "Real Estate Experts" },
  ];

  return (
    <div className="bg-black text-foreground p-10 md:py-20 mx-auto">
      <h1 className="lg:text-4xl md:text-2xl text-xl font-bold text-center mb-10">
        Our Partners
      </h1>
      
      <div className="w-3/4 mx-auto">
        <Carousel
        plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
          opts={{
            align: "start",
            loop: true,
            
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {partners.map((partner) => (
              <CarouselItem key={partner.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/4">
                <div className="p-1">
                  <Image
                    src={partner.src}
                    alt={partner.alt}
                    width={120}
                    height={50}
                    className="object-contain mx-auto"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </div>
  );
};

export default PartnerSlider;