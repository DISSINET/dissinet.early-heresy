import React from "react";
import packageJson from "../../package.json";

const Hero: React.FC = ({}) => {
  return (
    <div
      className="hero font-bold text-xl pt-12 pb-4 px-4 text-white bg-cover"
      style={{
        paddingTop: "2em",
        background: " cover",
        backgroundPosition: "right",
        backgroundSize: "cover",
        backgroundImage: `url(
            "https://cdn.muni.cz/media/3132847/out_gradient.png?mode=crop&center=0.54,0.86&rnd=131981761180000000&width=974&heightratio=0.23715"
          )`,
      }}
    >
      <h4>
        Early Heresy{" "}
        <span style={{ fontSize: "13px" }}> v. {packageJson.version}</span>
      </h4>
      <span>Heresy cases in the West, c.1000-c.1150</span>
    </div>
  );
};

export default Hero;
