import Lottie from "lottie-react";
import animationData from "../../assets/lottieanimation/Food Loading Animation.json";

const FoodAnimation = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center  backdrop-blur-md">
      <Lottie animationData={animationData} loop/>
    </div>
  );
};

export default FoodAnimation;
