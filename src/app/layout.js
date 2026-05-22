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
import { BsSun, BsMoon } from "react-icons/bs";

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
  const [isDark, setIsDark] = useState(true);
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

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light") { setIsDark(false); document.documentElement.classList.add("light"); }
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    if (next) { document.documentElement.classList.remove("light"); localStorage.setItem("theme", "dark"); }
    else       { document.documentElement.classList.add("light");    localStorage.setItem("theme", "light"); }
  };

  const navigate = (index) => {
    const next = ((index % ROUTES.length) + ROUTES.length) % ROUTES.length;
    router.push(ROUTES[next]);
  };

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <title>Đỗ Phạm Nguyên — Portfolio</title>
        <meta name="description" content="Welcome to the official website of Đỗ Phạm Nguyên — Full-stack developer passionate about innovation and technology." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Đỗ Phạm Nguyên" />
        <meta name="keywords" content="Đỗ Phạm Nguyên, portfolio, web developer, full-stack, ReactJS, NextJS, Cloudflare" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dophamnguyen.xyz/" />
        <meta property="og:title" content="Đỗ Phạm Nguyên — Portfolio" />
        <meta property="og:description" content="Full-stack developer passionate about innovation, creativity, and technology." />
        <meta property="og:image" content="https://dophamnguyen.xyz/og-image.png" />
        <meta property="og:locale" content="vi_VN" />
        <meta property="og:locale:alternate" content="en_US" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://dophamnguyen.xyz/" />
        <meta name="twitter:title" content="Đỗ Phạm Nguyên — Portfolio" />
        <meta name="twitter:description" content="Full-stack developer passionate about innovation, creativity, and technology." />
        <meta name="twitter:image" content="https://dophamnguyen.xyz/og-image.png" />

        <link rel="canonical" href="https://dophamnguyen.xyz/" />
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

            {/* ── DESKTOP layout ── */}
            <div className="hidden md:flex w-[70%] h-[70%] flex-row m-auto">
              {/* Card container */}
              <div className={`w-[90%] h-[90%] max-h-[80vh] overflow-hidden bg-[#444444] flex flex-row max-w-[1280px] rounded-[32px] z-50 ${loading ? "animate-pulse" : ""} m-auto`}>
                {/* LEFT sidebar */}
                <div className="w-full h-full text-center pt-[72px] relative min-h-[80vh] max-w-[380px]">
                  <div className="anim-rotate w-[180px] relative mx-auto mb-[30px]">
                    <div className="photoBacb"></div>
                    <Image width={180} height={180} alt="avatar" src={logo} loading="eager"
                      className="rounded-full border-[3px] mt-3 border-[#fff] bg-[#fff]" />
                  </div>
                  <div className="anim-slideup">
                    <h1 className="text-[36px] font-semibold text-[#f5f5f5]">{t("common.name")}</h1>
                    <p className="text-[18px] font-light text-[#bbb] mb-[32px]">{t("common.title.webDeveloper")}</p>
                    <div className="flex justify-center flex-row">
                      <BiLogoGithub className="cursor-pointer mr-[6px] hover:bg-white/20 hover:rounded-full" color="white" size={30} />
                    </div>
                    <a href="/src/app/cv/cv.pdf" download>
                      <div className="w-[146px] h-[46px] cursor-pointer mx-auto mt-[72px] rounded-[30px] text-white border-[2px] border-[#f5f5f5]">
                        <p className="mt-[8px]">{t("common.title.downloadCV")}</p>
                      </div>
                    </a>
                  </div>
                  <div className="text-[#bbb] text-[12px] text-center absolute bottom-[8px] w-full">© 2020 Do Pham Nguyen.</div>
                </div>
                {children}
              </div>

              {/* Desktop side nav */}
              <div className="flex flex-col justify-between">
                <ul className={`w-[70px] h-[265px] bg-[#444444] ${loading ? "animate-pulse " : ""} rounded-[35px] z-[100] py-[30px]`}>
                  <li className="anim-zoom-1 active" id="homepage">
                    <IoHomeOutline size={30} onClick={() => navigate(0)} className={`mx-auto cursor-pointer hover:text-[#04b4e0] ${positionMenu === 0 ? "text-[#04b4e0]" : "text-[#b5b6b7]"}`} />
                  </li>
                  <li className="anim-zoom-2 pt-[15px]" id="aboutmepage">
                    <IoPersonOutline size={30} onClick={() => navigate(1)} className={`mx-auto cursor-pointer hover:text-[#04b4e0] ${positionMenu === 1 ? "text-[#04b4e0]" : "text-[#b5b6b7]"}`} />
                  </li>
                  <li className="anim-zoom-3 pt-[15px]" id="resumepage">
                    <PiGraduationCapFill size={30} onClick={() => navigate(2)} className={`mx-auto cursor-pointer hover:text-[#04b4e0] ${positionMenu === 2 ? "text-[#04b4e0]" : "text-[#b5b6b7]"}`} />
                  </li>
                  <li className="anim-zoom-4 pt-[15px]" id="portfolio">
                    <IoBagHandleOutline size={30} onClick={() => navigate(3)} className={`mx-auto cursor-pointer hover:text-[#04b4e0] ${positionMenu === 3 ? "text-[#04b4e0]" : "text-[#b5b6b7]"}`} />
                  </li>
                  <li className="anim-zoom-5 pt-[15px]" id="messagepage">
                    <BiMessageDetail size={30} onClick={() => navigate(4)} className={`mx-auto cursor-pointer hover:text-[#04b4e0] ${positionMenu === 4 ? "text-[#04b4e0]" : "text-[#b5b6b7]"}`} />
                  </li>
                </ul>
                <ul className={`w-[70px] h-[180px] bg-[#444444] ${loading ? "animate-pulse " : ""} rounded-[35px] z-[100] pt-[15px]`}>
                  <li className="anim-zoom-1 pt-[15px]" id="vietnam">
                    <Image width={30} height={30} alt="Viet Nam Flag" onClick={() => { setLanguageMenu(0); i18n.changeLanguage("vi"); }} src={vietnameFLag}
                      className={`rounded-full opacity-35 mx-auto cursor-pointer ${langeuageMenu === 0 && "border-[0.5px] border-white"}`} />
                  </li>
                  <li className="anim-zoom-2 pt-[15px]" id="usa">
                    <Image width={30} height={30} alt="USA Flag" src={usaFLag} onClick={() => { setLanguageMenu(1); i18n.changeLanguage("en"); }}
                      className={`rounded-full p-0 mx-auto cursor-pointer ${langeuageMenu === 1 && "border-[0.5px] border-white"}`} />
                  </li>
                  <li className="anim-zoom-3 pt-[15px]" id="theme-toggle">
                    {isDark
                      ? <BsSun size={26} onClick={toggleTheme} className="mx-auto cursor-pointer text-[#b5b6b7] hover:text-[#04b4e0]" />
                      : <BsMoon size={26} onClick={toggleTheme} className="mx-auto cursor-pointer text-[#b5b6b7] hover:text-[#04b4e0]" />}
                  </li>
                </ul>

                <ul className={`w-[70px] h-[130px] bg-[#444444] ${loading ? "animate-pulse " : ""} rounded-[35px] z-[100] pt-[15px]`}>
                  <li className="anim-zoom-1 pt-[15px]">
                    <MdArrowForwardIos className="mx-auto cursor-pointer text-[#b5b6b7] hover:text-[#04b4e0]" onClick={() => navigate(positionMenu + 1)} size={30} />
                  </li>
                  <li className="anim-zoom-2 pt-[15px]">
                    <MdArrowBackIosNew className="mx-auto cursor-pointer text-[#b5b6b7] hover:text-[#04b4e0]" onClick={() => navigate(positionMenu - 1)} size={30} />
                  </li>
                </ul>
              </div>
            </div>

            {/* ── MOBILE layout ── */}
            <div className="flex md:hidden flex-col w-full min-h-screen">
              {/* Top header */}
              <div className={`flex flex-row items-center gap-3 px-4 py-3 bg-[#444444] ${loading ? "animate-pulse" : ""}`}>
                <div className="anim-rotate w-[52px] h-[52px] relative shrink-0">
                  <Image width={52} height={52} alt="avatar" src={logo} loading="eager"
                    className="rounded-full border-[2px] border-[#fff] bg-[#fff]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h1 className="text-[14px] font-semibold text-[#f5f5f5] leading-tight truncate">{t("common.name")}</h1>
                  <p className="text-[11px] font-light text-[#bbb] truncate">{t("common.title.webDeveloper")}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <BiLogoGithub className="cursor-pointer hover:text-[#04b4e0] text-white" size={20} />
                  {isDark
                    ? <BsSun size={20} onClick={toggleTheme} className="cursor-pointer text-[#b5b6b7] hover:text-[#04b4e0]" />
                    : <BsMoon size={20} onClick={toggleTheme} className="cursor-pointer text-[#b5b6b7] hover:text-[#04b4e0]" />}
                  <Image width={22} height={22} alt="Viet Nam Flag" onClick={() => { setLanguageMenu(0); i18n.changeLanguage("vi"); }} src={vietnameFLag}
                    className={`rounded-full opacity-60 cursor-pointer ${langeuageMenu === 0 && "ring-1 ring-white"}`} />
                  <Image width={22} height={22} alt="USA Flag" src={usaFLag} onClick={() => { setLanguageMenu(1); i18n.changeLanguage("en"); }}
                    className={`rounded-full cursor-pointer ${langeuageMenu === 1 && "ring-1 ring-white"}`} />
                </div>
              </div>

              {/* Page content */}
              <div className="flex-1 overflow-auto pb-[70px] bg-[#222]">
                {children}
              </div>

              {/* Bottom navigation */}
              <div className={`fixed bottom-0 left-0 right-0 bg-[#444444] flex flex-row justify-around items-center py-3 px-4 z-[100] ${loading ? "animate-pulse" : ""}`}>
                <IoHomeOutline size={26} onClick={() => navigate(0)} className={`cursor-pointer ${positionMenu === 0 ? "text-[#04b4e0]" : "text-[#b5b6b7]"}`} />
                <IoPersonOutline size={26} onClick={() => navigate(1)} className={`cursor-pointer ${positionMenu === 1 ? "text-[#04b4e0]" : "text-[#b5b6b7]"}`} />
                <PiGraduationCapFill size={26} onClick={() => navigate(2)} className={`cursor-pointer ${positionMenu === 2 ? "text-[#04b4e0]" : "text-[#b5b6b7]"}`} />
                <IoBagHandleOutline size={26} onClick={() => navigate(3)} className={`cursor-pointer ${positionMenu === 3 ? "text-[#04b4e0]" : "text-[#b5b6b7]"}`} />
                <BiMessageDetail size={26} onClick={() => navigate(4)} className={`cursor-pointer ${positionMenu === 4 ? "text-[#04b4e0]" : "text-[#b5b6b7]"}`} />
                <MdArrowBackIosNew size={22} onClick={() => navigate(positionMenu - 1)} className="cursor-pointer text-[#b5b6b7]" />
                <MdArrowForwardIos size={22} onClick={() => navigate(positionMenu + 1)} className="cursor-pointer text-[#b5b6b7]" />
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
