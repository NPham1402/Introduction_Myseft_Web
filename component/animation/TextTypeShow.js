import React from "react";
import { TypeAnimation } from "react-type-animation";

function TextTypeShow({ sequence, className, repeat }) {
  return (
    <TypeAnimation
      sequence={sequence}
      wrapper="span"
      speed={50}
      typeof="a"
      className={className}
      style={{ display: "inline-block" }}
      repeat={1}
    />
  );
}

export default TextTypeShow;
