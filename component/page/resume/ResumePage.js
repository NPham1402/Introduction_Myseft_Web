"use client";
import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import ScrollProgress from "../../ui/ScrollProgress";

function SkillTag({ label }) {
  return (
    <span className="inline-block bg-[#04b4e0]/20 text-[#04b4e0] border border-[#04b4e0]/40 text-[12px] px-[10px] py-[3px] rounded-full mr-[6px] mb-[6px]">
      {label}
    </span>
  );
}

function SectionTitle({ children }) {
  return (
    <span className="text-[20px] md:text-[22px] font-semibold text-[#f5f5f5] block mb-[6px]">
      {children}
    </span>
  );
}

function ExperienceBlock({ period, company, role, description }) {
  return (
    <div className="mb-[28px]">
      <p className="text-[#04b4e0] text-[13px] font-medium">{period}</p>
      <p className="text-[16px] md:text-[18px] font-semibold">{company}</p>
      <p className="text-[13px] text-[#bbb] italic mb-[6px]">{role}</p>
      <p className="text-[13px] text-[#ccc] leading-[1.6]">{description}</p>
    </div>
  );
}

function ResumePage() {
  const { t } = useTranslation();
  const scrollRef = useRef(null);

  return (
    <div className="page-enter w-full min-h-full flex flex-col bg-[#222] md:rounded-r-[30px] text-white">
      <ScrollProgress containerRef={scrollRef} />
    <div ref={scrollRef} className="flex-1 overflow-auto p-4 md:p-[60px]">
      <span className="text-[28px] md:text-[32px] font-semibold">RESU</span>
      <span className="text-[28px] md:text-[32px] text-[#04b4e0] font-semibold">ME</span>

      <div className="w-full flex flex-col md:flex-row mt-[24px] md:mt-[30px] gap-[24px] md:gap-[40px]">
        {/* Left column */}
        <div className="md:w-7/12">
          <SectionTitle>{t("resume.education")}</SectionTitle>
          <div className="mb-[28px]">
            <p className="text-[#04b4e0] text-[13px] font-medium">{t("resume.edu.period")}</p>
            <p className="text-[16px] md:text-[18px] font-semibold">{t("resume.edu.university")}</p>
            <p className="text-[13px] text-[#bbb] italic mb-[4px]">{t("resume.edu.major")}</p>
            <p className="text-[13px] text-[#ccc]">{t("resume.edu.gpa")}</p>
          </div>

          <SectionTitle>{t("resume.experience")}</SectionTitle>

          <ExperienceBlock
            period={t("resume.exp.fsb.period")}
            company={t("resume.exp.fsb.company")}
            role={t("resume.exp.fsb.role")}
            description={t("resume.exp.fsb.description")}
          />

          <ExperienceBlock
            period={t("resume.exp.whammy.period")}
            company={t("resume.exp.whammy.company")}
            role={t("resume.exp.whammy.role")}
            description={t("resume.exp.whammy.description")}
          />
        </div>

        {/* Right column */}
        <div className="md:w-5/12">
          <SectionTitle>{t("resume.skills")}</SectionTitle>

          <p className="text-[13px] text-[#04b4e0] font-semibold mb-[4px] uppercase tracking-wide">{t("resume.skillGroups.frontend")}</p>
          <div className="mb-[14px]">
            <SkillTag label="ReactJS" />
            <SkillTag label="NextJS" />
            <SkillTag label="RemixJS" />
            <SkillTag label="TailwindCSS" />
            <SkillTag label="HTML / CSS" />
          </div>

          <p className="text-[13px] text-[#04b4e0] font-semibold mb-[4px] uppercase tracking-wide">{t("resume.skillGroups.backend")}</p>
          <div className="mb-[14px]">
            <SkillTag label="ExpressJS" />
            <SkillTag label="Hono" />
            <SkillTag label="ASP.NET (C#)" />
            <SkillTag label="Google Apps Script" />
          </div>

          <p className="text-[13px] text-[#04b4e0] font-semibold mb-[4px] uppercase tracking-wide">{t("resume.skillGroups.database")}</p>
          <div className="mb-[14px]">
            <SkillTag label="SQL / MySQL" />
            <SkillTag label="MongoDB" />
            <SkillTag label="Firebase" />
            <SkillTag label="D1 SQLite" />
          </div>

          <p className="text-[13px] text-[#04b4e0] font-semibold mb-[4px] uppercase tracking-wide">{t("resume.skillGroups.devops")}</p>
          <div className="mb-[14px]">
            <SkillTag label="Cloudflare Workers" />
            <SkillTag label="AWS S3" />
            <SkillTag label="Docker" />
            <SkillTag label="NGINX" />
            <SkillTag label="Zalo Mini App" />
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default ResumePage;
