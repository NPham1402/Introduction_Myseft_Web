"use client";
import { IoHomeOutline } from "react-icons/io5";
import Image from "next/image";
import avartar from "../../source/avartar.jpg";
import { BiLogoFacebook, BiLogoGithub, BiMessageDetail } from "react-icons/bi";
import { IoPersonOutline, IoBagHandleOutline } from "react-icons/io5";
import { PiGraduationCapFill } from "react-icons/pi";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";

import "react-tooltip/dist/react-tooltip.css";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { Suspense, useEffect, useState } from "react";
import { LightSpeed, Zoom } from "react-reveal";
import Rotate from "react-reveal/Rotate";
import HomePage from "../../component/page/home/HomePage";
import ResumePage from "../../component/page/resume/ResumePage";
import AboutMe from "../../component/page/aboutMe/AboutMe";
import PortfolioPage from "../../component/page/portfolio/PortfolioPage";
import MessPage from "../../component/page/message/MessPage";
import Loading from "./Loading";
import { delay } from "../../component/function/delay";

export default function Home() {
  const [positionMenu, setPositionMenu] = useState(0);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    delay(800);
    setLoading(false);
  }, []);
  return (
    <main className="  flex  min-h-screen overflow-hidden">
      <Suspense fallback={<Loading />}>
        <div className="w-[70%] h-[70%] flex flex-row m-auto">
          <div
            className={`w-[90%] h-[90%] max-h-[80vh] bg-[#444444] flex flex-row max-w-[1280px] rounded-[32px] z-50 ${
              loading === true ? " animate-pulse" : ""
            }  m-auto`}
          >
            <div className="w-full h-full text-center pt-[72px] relative max-h-[80vh] min-h-[80vh] max-w-[380px] ">
              <Rotate collapse>
                <div className="w-[180px] relative   mx-auto mb-[30px] ">
                  <div className="photoBacb"></div>
                  <Image
                    width={180}
                    height={180}
                    alt={"avartar"}
                    src={avartar}
                    className="rounded-full border-[3px] mt-3 border-[#fff] bg-[#fff]"
                  />
                </div>
              </Rotate>
              <LightSpeed delay={2000} bottom collapse>
                <h1 className="text-[36px] font-semibold text-[#f5f5f5]">
                  Đỗ Phạm Nguyên
                </h1>
                <p className="text-[18px] font-light text-[#bbb]  mb-[32px]">
                  Web Devoloper
                </p>
                <div className="flex justify-center  flex-row">
                  <BiLogoGithub
                    className="cursor-pointer mr-[6px] hover:bg-white/20 hover:rounded-full"
                    color="white"
                    size={30}
                  />
                  <BiLogoFacebook
                    className="cursor-pointer hover:bg-white/20 hover:rounded-full"
                    color="white"
                    size={30}
                  />
                </div>
                <div className="w-[146px] h-[46px] cursor-pointer mx-auto mt-[72px] rounded-[30px] text-white border-[2px] border-[#f5f5f5]">
                  <p className="mt-[8px]">DownLoad CV</p>
                </div>
              </LightSpeed>
              <div className="text-[#bbb] text-[12px]  text-center absolute bottom-[8px] w-full">
                © 2020 Do Pham Nguyen.
              </div>
            </div>
            {positionMenu === 0 && <HomePage />}
            {positionMenu === 1 && <AboutMe />}
            {positionMenu === 2 && <ResumePage />}
            {positionMenu === 3 && <PortfolioPage />}
            {positionMenu === 4 && <MessPage />}
          </div>
          <div className="flex flex-col justify-between">
            <ul
              className={` w-[70px] h-[265px] bg-[#444444] ${
                loading === true ? " animate-pulse " : ""
              } rounded-[35px] z-[100] py-[30px] `}
            >
              <Zoom delay={1200} collapse>
                <li className=" active" id="homepage">
                  <IoHomeOutline
                    size={30}
                    onClick={() => setPositionMenu(0)}
                    className={`mx-auto cursor-pointer hover:text-[#04b4e0]  ${
                      positionMenu === 0 ? "text-[#04b4e0]" : "text-[#b5b6b7]"
                    }`}
                  />
                </li>
              </Zoom>
              <Zoom delay={900} collapse>
                <li className="pt-[15px] " id="aboutmepage">
                  <IoPersonOutline
                    className={`mx-auto cursor-pointer hover:text-[#04b4e0]  ${
                      positionMenu === 1 ? "text-[#04b4e0]" : "text-[#b5b6b7]"
                    }`}
                    onClick={() => setPositionMenu(1)}
                    size={30}
                  />
                </li>
              </Zoom>
              <Zoom delay={600} collapse>
                <li className="pt-[15px] " id="resumepage">
                  <PiGraduationCapFill
                    className={`mx-auto cursor-pointer hover:text-[#04b4e0] ${
                      positionMenu === 2 ? "text-[#04b4e0]" : "text-[#b5b6b7]"
                    }`}
                    onClick={() => setPositionMenu(2)}
                    size={30}
                  />
                </li>
              </Zoom>
              <Zoom delay={300} collapse>
                <li className="pt-[15px] " id="portfolio">
                  <IoBagHandleOutline
                    className={`mx-auto cursor-pointer hover:text-[#04b4e0] ${
                      positionMenu === 3 ? "text-[#04b4e0]" : "text-[#b5b6b7]"
                    }`}
                    onClick={() => setPositionMenu(3)}
                    size={30}
                  />
                </li>
              </Zoom>
              <Zoom collapse>
                <li className="pt-[15px] " id="messagepage">
                  <BiMessageDetail
                    className={`mx-auto cursor-pointer hover:text-[#04b4e0] ${
                      positionMenu === 4 ? "text-[#04b4e0]" : "text-[#b5b6b7]"
                    }`}
                    onClick={() => setPositionMenu(4)}
                    size={30}
                  />
                </li>
              </Zoom>
            </ul>
            <ul
              className={` w-[70px] h-[130px] bg-[#444444] ${
                loading === true ? " animate-pulse " : ""
              } rounded-[35px] z-[100] pt-[15px]  `}
            >
              <Zoom collapse>
                <li className="pt-[15px] ">
                  <MdArrowForwardIos
                    className={`mx-auto cursor-pointer text-[#b5b6b7] hover:text-[#04b4e0] hover:bg-gray hover:rounded-full`}
                    onClick={() => {
                      if (positionMenu === 4) setPositionMenu(0);
                      else setPositionMenu(positionMenu + 1);
                    }}
                    size={30}
                  />
                </li>
              </Zoom>
              <Zoom collapse>
                <li className="pt-[15px] ">
                  <MdArrowBackIosNew
                    className={`mx-auto cursor-pointer text-[#b5b6b7] hover:text-[#04b4e0]`}
                    onClick={() => {
                      if (positionMenu === 0) setPositionMenu(4);
                      else setPositionMenu(positionMenu - 1);
                    }}
                    size={30}
                  />
                </li>
              </Zoom>
            </ul>
          </div>
        </div>
      </Suspense>
      <ReactTooltip
        anchorId="resumepage"
        place="right"
        variant="info"
        content="RESUME"
      />
      <ReactTooltip
        anchorId="portfolio"
        place="right"
        variant="info"
        content="PORFOLIO"
      />
      <ReactTooltip
        anchorId="homepage"
        place="right"
        variant="info"
        content="HOME"
      />
      <ReactTooltip
        anchorId="messagepage"
        place="right"
        variant="info"
        content="MESSAGE"
      />
      <ReactTooltip
        anchorId="aboutmepage"
        place="right"
        variant="info"
        content="ABOUT ME"
      />
    </main>
  );
}
