import React from "react";
import Slider from "react-slick";

type ProfileSliderProps = {
  names: string[];
};

export default function SimpleSlider({ names }: ProfileSliderProps) {
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500,
  };
  return (
    <Slider {...settings}>
      {names.map((name, index) => (
        <div key={index}>
          <div>{name}</div>
        </div>
      ))}
    </Slider>
  );
}
