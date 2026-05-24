"use client";
import dayjs from "dayjs";
import React from "react";
import { CgWebsite } from "react-icons/cg";
import { GrServerCluster } from "react-icons/gr";
import { IoIosCloud } from "react-icons/io";
import { FaDatabase } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import CopyText from "../../ui/CopyText";

const SKILL_ICONS = [
  <CgWebsite key="fe" color="#04b4e0" size={28} />,
  <GrServerCluster key="be" color="#04b4e0" size={28} />,
  <IoIosCloud key="cloud" color="#04b4e0" size={28} />,
  <FaDatabase key="db" color="#04b4e0" size={28} />,
];
const SKILL_KEYS = ["frontend", "backend", "cloud", "database"];

function AboutMe() {
  const { t } = useTranslation();

  const INFO = [
    { label: t("aboutMe.labels.age"),       value: dayjs().diff(dayjs("2001-02-14"), "year") },
    { label: t("aboutMe.labels.residence"), value: "Viet Nam" },
    { label: t("aboutMe.labels.city"),      value: "Ho Chi Minh" },
    { label: t("aboutMe.labels.email"), value: "npham140201@gmail.com", copy: true },
    { label: t("aboutMe.labels.phone"), value: "+84938 224 718",       copy: true },
  ];

  return (
    <div className="page-enter w-full overflow-auto h-full bg-[#222] md:rounded-r-[30px] text-white flex flex-col">
      {/* Top bio section */}
      <div className="px-4 md:px-[50px] pt-5 md:pt-[44px] pb-[32px] border-b border-white/10">
        <div className="mb-[20px]">
          <span className="text-[26px] md:text-[30px] font-bold">ABOUT</span>
          <span className="text-[26px] md:text-[30px] font-bold text-[#04b4e0]"> ME</span>
        </div>

        <div className="flex flex-col md:flex-row gap-[20px] md:gap-[32px]">
          {/* Bio text */}
          <p className="md:w-6/12 text-[13.5px] leading-[1.8] text-[#ccc]">
            {t("aboutMe.bio")}
          </p>

          {/* Info grid */}
          <div className="md:w-6/12 grid grid-cols-2 gap-x-[16px] gap-y-[10px] self-start">
            {INFO.map(({ label, value, copy }) => (
              <div key={label} className="flex flex-col">
                <span className="text-[11px] uppercase tracking-widest text-[#04b4e0] font-semibold">
                  {label}
                </span>
                {copy
                  ? <CopyText text={value} className="text-[13px] text-white mt-[2px] break-all" />
                  : <span className="text-[13px] text-white mt-[2px] break-all">{value}</span>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* What I Do section */}
      <div className="px-4 md:px-[50px] pt-[28px] pb-[40px]">
        <div className="mb-[20px]">
          <span className="text-[18px] font-bold text-[#04b4e0]">{t("aboutMe.whatIDo")}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
          {SKILL_KEYS.map((key, i) => {
            const points = t(`aboutMe.skills.${key}.points`, { returnObjects: true });
            return (
              <div
                key={key}
                className="bg-[#2a2a2a] rounded-[14px] p-[18px] flex flex-col gap-[8px] border border-white/[0.06] hover:border-[#04b4e0]/25 transition-colors duration-200"
              >
                <div className="flex items-center gap-[10px]">
                  {SKILL_ICONS[i]}
                  <span className="text-[12px] font-bold uppercase tracking-widest text-[#f5f5f5]">
                    {t(`aboutMe.skills.${key}.title`)}
                  </span>
                </div>
                <div className="h-px bg-white/[0.07]" />
                <ul className="space-y-[5px]">
                  {Array.isArray(points) && points.map((p) => (
                    <li key={p} className="flex items-start gap-[6px] text-[12px] text-[#aaa] leading-[1.65]">
                      <span className="text-[#04b4e0] shrink-0 mt-[1px] font-bold">›</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default AboutMe;
