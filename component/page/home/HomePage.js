import React, { useEffect, useState } from "react";
import Fade from "react-reveal/Fade";
function HomePage(props) {
  return (
    <div className="w-full  min-h-[80vh] bg-[#222] rounded-r-[30px] text-white">
      <div className=" mt-[40%] text-[#f5f5f5] text-[60px] font-semibold text-center">
        <Fade delay={2000} opposite collapse>
          Đỗ Phạm Nguyên
          <p className="text-[21px] text-center font-light text-[#bbb]  ">
            Web Developer
          </p>
        </Fade>
      </div>
    </div>
  );
}

export default HomePage;
