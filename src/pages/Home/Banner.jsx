import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const bannerData = [
  {
    image: 'https://i.ibb.co/60NXCckj/banner7.webp',
    title: 'Together We Can Stop Food Waste',
    text: 'Join our mission to redistribute surplus food and nourish communities.',
  },
  {
    image: 'https://i.ibb.co/mC6YmyCs/banner1.jpg',
    title: 'Every Bite Matters',
    text: 'Your leftover today could be someone’s meal tonight.',
  },
  {
    image: 'https://i.ibb.co/XxM5Q6Gh/banner2.jpg',
    title: 'Bridge Between Surplus and Need',
    text: 'We connect donors and receivers with love and logistics.',
  },
  {
    image:
      'https://imgs.search.brave.com/uyolQqCoQXOGJu082KBPFoGaNdCYRGQ1WZMZMOYuMEI/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS12ZWN0/b3IvZm9vZC1kb25h/dGlvbi1ib3gtdm9s/dW50ZWVyaW5nLWNo/YXJpdHktc3VwcG9y/dC1jb25jZXB0LXN0/b2NrLWlsbHVzdHJh/dGlvbl8xMDM4ODIx/LTEwODQuanBnP3Nl/bXQ9YWlzX2h5YnJp/ZCZ3PTc0MA',
    title: 'Feeding Hope, Not Landfills',
    text: 'Be part of the sustainable movement that saves food and lives.',
  },
  {
    image:
      'https://imgs.search.brave.com/ben2PZ8hC2MFpsaesweW2cVkem-jNXIzMn7QZjKbrE4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzEyLzg2LzQ3LzY2/LzM2MF9GXzEyODY0/NzY2MDBfMzNiellw/bFRUSzNOWnFRYjNo/ZUc2UlpqTERCUHVP/QkMuanBn',
    title: 'Join the Food Recovery Revolution',
    text: 'SurplusShare ensures good food never goes to waste.',
  },
]

const Banner = () => {
  return (
    <div className="md:my-5 my-2">
      <Carousel
        autoPlay
        infiniteLoop
        showArrows
        showStatus={false}
        showThumbs={false}
        useKeyboardArrows
        interval={3000}
      >
        {bannerData.map((item, index) => (
          <div
            key={index}
            className="relative w-full h-[50vh] sm:h-[60vh] md:h-[52vh] lg:h-[72vh]"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover rounded-md"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 bg-gradient-to-t from-black/70 via-black/40 to-transparent">
              <h2 className="text-xl sm:text-3xl md:text-5xl font-extrabold text-primary drop-shadow-3xl mb-3">
                {item.title}
              </h2>
              <p className="text-sm sm:text-lg md:text-xl text-gray-200 max-w-2xl drop-shadow-md">
                {item.text}
              </p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  )
};

export default Banner;
