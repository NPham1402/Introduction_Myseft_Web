"use client";
import { useEffect, useState, Suspense } from "react";
import "./globals.css";
import { useTranslation } from "react-i18next";
import { Inter } from "next/font/google";
import "../../component/config/i8nConfig";

import Image from "next/image";
import vietnameFLag from "../../source/vietname_flag.png";
import usaFLag from "../../source/usa_Flag.png";
import logo from "../../source/logo.png";

import { BiLogoGithub, BiMessageDetail } from "react-icons/bi";
import { IoPersonOutline, IoBagHandleOutline, IoHomeOutline } from "react-icons/io5";
import { PiGraduationCapFill } from "react-icons/pi";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";

import "react-tooltip/dist/react-tooltip.css";
import { Tooltip as ReactTooltip } from "react-tooltip";

import Loading from "./Loading";
import { delay } from "../../component/function/delay";
import { useRouter, usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

const ROUTES = ["/", "/about", "/resume", "/portfolio", "/contact"];
const PATH_TO_INDEX = {
  "/": 0,
  "/about": 1,
  "/resume": 2,
  "/portfolio": 3,
  "/contact": 4,
};

export default function RootLayout({ children }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [langeuageMenu, setLanguageMenu] = useState(1);
  const [loading, setLoading] = useState(true);
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();

  const positionMenu = PATH_TO_INDEX[pathname] ?? 0;

  useEffect(() => {
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    delay(800).then(() => setLoading(false));
  }, []);

  const navigate = (index) => {
    const next = ((index % ROUTES.length) + ROUTES.length) % ROUTES.length;
    router.push(ROUTES[next]);
  };

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <title>{t("common.profile")}</title>
        <meta
          name="description"
          content="Welcome to the official website of Đỗ Phạm Nguyên. Explore the profile of Đỗ Phạm Nguyên, a multi-talented individual with a passion for innovation, creativity, and technology."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        style={{
          backgroundPosition:
            "calc(0% + -" + mousePos.x / 70 + "px) calc(0% + -" + mousePos.y / 70 + "px)",
        }}
        className={inter.className}
      >
        <main className="flex min-h-screen overflow-hidden">
          <Suspense fallback={<Loading />}>
            <div className="w-[70%] h-[70%] flex flex-row m-auto">
              {/* Card container */}
              <div
                className={`w-[90%] h-[90%] max-h-[80vh] overflow-hidden bg-[#444444] flex flex-row max-w-[1280px] rounded-[32px] z-50 ${
                  loading ? "animate-pulse" : ""
                } m-auto`}
              >
                {/* LEFT: photo + name + download CV */}
                <div className="w-full h-full text-center pt-[72px] relative min-h-[80vh] max-w-[380px]">
                  <div className="anim-rotate w-[180px] relative mx-auto mb-[30px]">
                    <div className="photoBacb"></div>
                    <Image
                      width={180}
                      height={180}
                      alt={"avatar"}
                      src={logo}
                      loading="eager"
                      className="rounded-full border-[3px] mt-3 border-[#fff] bg-[#fff]"
                    />
                  </div>
                  <div className="anim-slideup">
                    <h1 className="text-[36px] font-semibold text-[#f5f5f5]">
                      {t("common.name")}
                    </h1>
                    <p className="text-[18px] font-light text-[#bbb] mb-[32px]">
                      {t("common.title.webDeveloper")}
                    </p>
                    <div className="flex justify-center flex-row">
                      <BiLogoGithub
                        className="cursor-pointer mr-[6px] hover:bg-white/20 hover:rounded-full"
                        color="white"
                        size={30}
                      />
                    </div>
                    <a href="/src/app/cv/cv.pdf" download>
                      <div className="w-[146px] h-[46px] cursor-pointer mx-auto mt-[72px] rounded-[30px] text-white border-[2px] border-[#f5f5f5]">
                        <p className="mt-[8px]">{t("common.title.downloadCV")}</p>
                      </div>
                    </a>
                  </div>
                  <div className="text-[#bbb] text-[12px] text-center absolute bottom-[8px] w-full">
                    © 2020 Do Pham Nguyen.
                  </div>
                </div>

                {/* RIGHT: page content — only this swaps on route change */}
                {children}
              </div>

              {/* Nav icons + language + arrows */}
              <div className="flex flex-col justify-between">
                <ul
                  className={`w-[70px] h-[265px] bg-[#444444] ${
                    loading ? "animate-pulse " : ""
                  } rounded-[35px] z-[100] py-[30px]`}
                >
                  <li className="anim-zoom-1 active" id="homepage">
                    <IoHomeOutline size={30} onClick={() => navigate(0)}
                      className={`mx-auto cursor-pointer hover:text-[#04b4e0] ${positionMenu === 0 ? "text-[#04b4e0]" : "text-[#b5b6b7]"}`}
                    />
                  </li>
                  <li className="anim-zoom-2 pt-[15px]" id="aboutmepage">
                    <IoPersonOutline size={30} onClick={() => navigate(1)}
                      className={`mx-auto cursor-pointer hover:text-[#04b4e0] ${positionMenu === 1 ? "text-[#04b4e0]" : "text-[#b5b6b7]"}`}
                    />
                  </li>
                  <li className="anim-zoom-3 pt-[15px]" id="resumepage">
                    <PiGraduationCapFill size={30} onClick={() => navigate(2)}
                      className={`mx-auto cursor-pointer hover:text-[#04b4e0] ${positionMenu === 2 ? "text-[#04b4e0]" : "text-[#b5b6b7]"}`}
                    />
                  </li>
                  <li className="anim-zoom-4 pt-[15px]" id="portfolio">
                    <IoBagHandleOutline size={30} onClick={() => navigate(3)}
                      className={`mx-auto cursor-pointer hover:text-[#04b4e0] ${positionMenu === 3 ? "text-[#04b4e0]" : "text-[#b5b6b7]"}`}
                    />
                  </li>
                  <li className="anim-zoom-5 pt-[15px]" id="messagepage">
                    <BiMessageDetail size={30} onClick={() => navigate(4)}
                      className={`mx-auto cursor-pointer hover:text-[#04b4e0] ${positionMenu === 4 ? "text-[#04b4e0]" : "text-[#b5b6b7]"}`}
                    />
                  </li>
                </ul>

                <ul
                  className={`w-[70px] h-[130px] bg-[#444444] ${
                    loading ? "animate-pulse " : ""
                  } rounded-[35px] z-[100] pt-[15px]`}
                >
                  <li className="anim-zoom-1 pt-[15px]" id="vietnam">
                    <Image width={30} height={30} alt="Viet Nam Flag"
                      onClick={() => { setLanguageMenu(0); i18n.changeLanguage("vi"); }}
                      src={vietnameFLag}
                      className={`rounded-full opacity-35 mx-auto cursor-pointer ${langeuageMenu === 0 && "border-[0.5px] border-white"}`}
                    />
                  </li>
                  <li className="anim-zoom-2 pt-[15px]" id="usa">
                    <Image width={30} height={30} alt="USA Flag"
                      src={usaFLag}
                      onClick={() => { setLanguageMenu(1); i18n.changeLanguage("en"); }}
                      className={`rounded-full p-0 mx-auto cursor-pointer ${langeuageMenu === 1 && "border-[0.5px] border-white"}`}
                    />
                  </li>
                </ul>

                <ul className={`w-[70px] h-[130px] bg-[#444444] ${loading ? "animate-pulse " : ""} rounded-[35px] z-[100] pt-[15px]`}>
                  <li className="anim-zoom-1 pt-[15px]">
                    <MdArrowForwardIos
                      className="mx-auto cursor-pointer text-[#b5b6b7] hover:text-[#04b4e0]"
                      onClick={() => navigate(positionMenu + 1)}
                      size={30}
                    />
                  </li>
                  <li className="anim-zoom-2 pt-[15px]">
                    <MdArrowBackIosNew
                      className="mx-auto cursor-pointer text-[#b5b6b7] hover:text-[#04b4e0]"
                      onClick={() => navigate(positionMenu - 1)}
                      size={30}
                    />
                  </li>
                </ul>
              </div>
            </div>
          </Suspense>

          <ReactTooltip anchorId="resumepage" place="right" variant="info" content={t("common.title.resume").toUpperCase()} />
          <ReactTooltip anchorId="portfolio" place="right" variant="info" content={t("common.title.portfolio").toUpperCase()} />
          <ReactTooltip anchorId="vietnam" place="right" variant="info" content={t("common.title.vietnam").toUpperCase()} />
          <ReactTooltip anchorId="usa" place="right" variant="info" content={t("common.title.usa").toUpperCase()} />
          <ReactTooltip anchorId="homepage" place="right" variant="info" content={t("common.title.home").toUpperCase()} />
          <ReactTooltip anchorId="messagepage" place="right" variant="info" content={t("common.title.message").toUpperCase()} />
          <ReactTooltip anchorId="aboutmepage" place="right" variant="info" content={t("common.title.aboutMe").toUpperCase()} />
        </main>
      </body>
    </html>
  );
}
