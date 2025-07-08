import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const bannerData = [
  {
    image: "https://i.ibb.co/60NXCckj/banner7.webp",
    title: "Together We Can Stop Food Waste",
    text: "Join our mission to redistribute surplus food and nourish communities.",
  },
  {
    image: "https://i.ibb.co/mC6YmyCs/banner1.jpg",
    title: "Every Bite Matters",
    text: "Your leftover today could be someone’s meal tonight.",
  },
  {
    image: "https://i.ibb.co/XxM5Q6Gh/banner2.jpg",
    title: "Bridge Between Surplus and Need",
    text: "We connect donors and receivers with love and logistics.",
  },
  {
    image: "https://i.ibb.co/LdHbmptD/banner3.jpg",
    title: "Feeding Hope, Not Landfills",
    text: "Be part of the sustainable movement that saves food and lives.",
  },
  {
    image: "https://i.ibb.co/YsXmCB2/banner4.jpg",
    title: "Join the Food Recovery Revolution",
    text: "SurplusShare ensures good food never goes to waste.",
  },
  {
    image: "https://i.ibb.co/DDLtgJRJ/banner6.jpg",
    title: "Support, Share, Sustain",
    text: "Together, we create a world where no food is wasted.",
  },
];

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
          <div key={index} className="relative w-full h-[50vh] sm:h-[60vh] md:h-[52vh] lg:h-[72vh]">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover rounded-md"
            />
            <div className="absolute inset-0 bg-opacity-0.3 flex flex-col justify-center items-center text-white text-center px-4">
              {/* <h2 className="text-lg sm:text-2xl text-black md:text-4xl font-bold mb-2 drop-shadow-lg">
                {item.title}
              </h2>
              <p className="text-sm sm:text-base md:text-lg max-w-2xl drop-shadow-md">
                {item.text}
              </p> */}
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
