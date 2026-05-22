"use client";
import React from "react";
import { useTranslation } from "react-i18next";

function HomePage() {
  const { t } = useTranslation();
  return (
    <div className="page-enter w-full min-h-full bg-[#222] md:rounded-r-[30px] text-white flex items-center justify-center">
      <div className="text-[#f5f5f5] text-center px-6">
        <h2 className="text-[40px] md:text-[60px] font-semibold">{t("common.name")}</h2>
        <p className="text-[16px] md:text-[21px] font-light text-[#bbb] mt-2">
          {t("common.title.webDeveloper")}
        </p>
      </div>
    </div>
  );
}

export default HomePage;
