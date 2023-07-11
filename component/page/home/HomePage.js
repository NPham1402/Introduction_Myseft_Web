import React, { useEffect, useState } from "react";
import Fade from "react-reveal/Fade";
function HomePage(props) {
  return (
    <div className="w-full  h-full mt-auto align-middle min-h-[80vh]     bg-[#222] rounded-r-[30px] p-[60px] text-white">
      <Fade delay={2000} opposite collapse>
        <div className="m-aut o text-[#f5f5f5] text-[60px] font-semibold text-center">
          Đỗ Phạm Nguyên
          <p className="text-[21px] text-center font-light text-[#bbb]  ">
            Web Developer
          </p>
        </div>
      </Fade>
    </div>
  );
}

export default HomePage;
