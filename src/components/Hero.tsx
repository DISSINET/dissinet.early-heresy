import React from "react";

const Hero: React.FC = ({}) => {
  return (
    <div
      className="hero font-bold text-xl pt-12 pb-4 px-4 text-white bg-cover"
      style={{
        background: " cover",
        backgroundImage: `url(
            "https://cdn.muni.cz/media/3132847/out_gradient.png?mode=crop&center=0.54,0.86&rnd=131981761180000000&width=974&heightratio=0.23715"
          )`,
      }}
    >
      <h2 className="heading text-white font-bold">Early Heresy in the West</h2>
      <h4 className="subheading text-white font-medium">Suheading TBA</h4>
    </div>
  );
};

export default Hero;
