"use client";
import React from "react";
import { useTranslation } from "react-i18next";

function HomePage() {
  const { t } = useTranslation();
  return (
    <div className="page-enter w-full min-h-[80vh] bg-[#222] rounded-r-[30px] text-white">
      <div className="mt-[40%] text-[#f5f5f5] text-[60px] font-semibold text-center">
        {t("common.name")}
        <p className="text-[21px] text-center font-light text-[#bbb]">
          {t("common.title.webDeveloper")}
        </p>
      </div>
    </div>
  );
}

export default HomePage;
