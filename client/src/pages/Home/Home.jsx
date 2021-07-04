import React from "react";
import Category from "../../components/Category/Category";
import Slider from "../../components/Slider/Slider";
const Home = () => {
  const images = [
    "https://i.ibb.co/8jh84k2/cover1.jpg",
    "https://i.ibb.co/q0qnxyv/cover2.jpg",
    "https://i.ibb.co/Xk6q9YR/cover3.jpg",
  ];
  return (
    <div>
      <Slider images={images} />
      <Category />
    </div>
  );
};
export default Home;
