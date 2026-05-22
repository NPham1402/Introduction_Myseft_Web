"use client";
import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import ScrollProgress from "../../ui/ScrollProgress";

const LOGSIGNT_CONTENT = {
  en: {
    overview:
      "LogSignT is a real-time SaaS application log monitoring platform designed for developers and teams who need system visibility without managing infrastructure. The entire stack runs on Cloudflare Edge — zero cold start, global coverage.",
    problem:
      "Traditional logging solutions (Datadog, Sentry) are too expensive for startups and too complex for indie developers. LogSignT targets that gap: setup in 5 minutes, affordable pricing, no DevOps required.",
    features: [
      "Ingest API — HTTP POST log ingestion with batch support, auto geo-enrichment (country/city/lat-lng) from Cloudflare edge",
      "Real-time stream — SSE live log feed with auto-reconnect on Valkey idle",
      "Dashboard — Recharts charts (p50/p95/p99 latency), world map traffic, top URLs/IPs/users",
      "Multi-channel alerts — Telegram, Discord, Slack, Webhook triggered by status code, response time, country",
      "Daily email report — daily metric digest sent via Cloudflare Email binding",
      "Full Auth — JWT + OAuth SSO (Google/GitHub/Microsoft) + TOTP 2FA + IP Allowlist per project",
      "Node.js SDK — Express middleware auto-capturing requests with built-in circuit breaker",
      "Privacy-first — no cookies, no tracking scripts, EU ePrivacy Directive compliant",
    ],
    tech: [
      ["Frontend", "React + Vite + Tailwind CSS (Cloudflare Pages)"],
      ["Backend", "Cloudflare Workers + Hono v2 (Edge, zero Node.js)"],
      ["Storage", "Valkey/Redis (hot logs) + D1 SQLite (metadata, stats)"],
      ["Crypto", "Web Crypto API — PBKDF2-SHA256, AES-256-GCM, HS256 JWT"],
      ["Infra", "CI/CD via GitHub Actions, auto-deploy on push"],
      ["DB Layer", "Same query runs on D1, PostgreSQL, MySQL without code changes"],
      ["Migration", "Auto schema migration at Worker startup — no pipeline needed"],
      ["Sharding", "Logs distributed across multiple Valkey DB instances, parallel queries"],
      ["Realtime", "Durable Objects — SQLite-backed ChatRoom for team chat"],
    ],
    role: "Designed the architecture and developed everything — backend Workers, frontend SPA, Node.js SDK, CI/CD pipeline, email templates, and i18n (EN/VI/ZH).",
  },
  vi: {
    overview:
      "LogSignT là nền tảng SaaS giám sát log ứng dụng theo thời gian thực, được thiết kế cho các developer và team cần visibility vào hệ thống mà không tốn công quản lý infrastructure. Toàn bộ stack triển khai trên Cloudflare Edge — zero cold start, phủ sóng toàn cầu.",
    problem:
      "Các giải pháp logging truyền thống (Datadog, Sentry) quá đắt với startup, quá phức tạp với indie developer. LogSignT nhắm vào khoảng trống đó: setup trong 5 phút, giá hợp lý, không cần DevOps.",
    features: [
      "Ingest API — nhận log qua HTTP POST, hỗ trợ batch, tự động enrich geo (country/city/lat-lng) từ Cloudflare edge",
      "Real-time stream — SSE live log feed với auto-reconnect khi Valkey idle",
      "Dashboard — biểu đồ Recharts (p50/p95/p99 latency), world map traffic, top URLs/IPs/users",
      "Multi-channel alerts — Telegram, Discord, Slack, Webhook kích hoạt theo status code, response time, country",
      "Daily email report — tổng hợp số liệu hàng ngày, gửi qua Cloudflare Email binding",
      "Auth đầy đủ — JWT + OAuth SSO (Google/GitHub/Microsoft) + TOTP 2FA + IP Allowlist per project",
      "Node.js SDK — Express middleware tự động capture request/response với circuit breaker tích hợp",
      "Privacy-first — không cookie, không tracking script, tuân thủ EU ePrivacy Directive",
    ],
    tech: [
      ["Frontend", "React + Vite + Tailwind CSS (Cloudflare Pages)"],
      ["Backend", "Cloudflare Workers + Hono v2 (Edge, zero Node.js)"],
      ["Storage", "Valkey/Redis (hot logs) + D1 SQLite (metadata, stats)"],
      ["Crypto", "Web Crypto API — PBKDF2-SHA256, AES-256-GCM, HS256 JWT"],
      ["Infra", "CI/CD qua GitHub Actions, deploy tự động khi push"],
      ["DB Layer", "Cùng một query chạy trên D1, PostgreSQL, MySQL không đổi code"],
      ["Migration", "Schema migration tự động tại Worker startup — không cần migration pipeline"],
      ["Sharding", "Log phân tán trên nhiều Valkey DB instance, query song song"],
      ["Realtime", "Durable Objects — ChatRoom SQLite-backed cho team chat realtime"],
    ],
    role: "Thiết kế kiến trúc và phát triển toàn bộ — từ backend Workers, frontend SPA, Node.js SDK, CI/CD pipeline đến email template và i18n (EN/VI/ZH).",
  },
};

const PROJECT_KEYS = [
  {
    title: "LOGSIGNT",
    key: "logsignt",
    tags: ["Cloudflare Workers", "Hono", "React", "Vite", "Valkey/Redis", "D1 SQLite"],
    link: "https://logsignt.com/",
    richContent: LOGSIGNT_CONTENT,
  },
  {
    title: "FSB School Website & Apps",
    key: "fsb",
    tags: ["ReactJS", "TailwindCSS", "Google Apps Script"],
  },
  {
    title: "Whammy Tech Company Website",
    key: "whammy",
    tags: ["RemixJS", "TailwindCSS", "AWS S3", "Framer Motion"],
    link: "https://whammytech.vercel.app",
  },
  {
    title: "Cryptocurrency for Everyone",
    key: "crypto",
    tags: ["ReactJS", "ExpressJS", "Cloudflare Workers", "Chrome MV3"],
  },
  {
    title: "Art & Visual Experience",
    key: "art",
    tags: ["Film", "Acting", "Visual Arts", "Creative"],
    video: "zIhIc8-cq1c",
  },
  {
    title: "CallSpamBlocker",
    key: "callspam",
    tags: ["React Native", "ReactJS", "ExpressJS", "MySQL", "Elasticsearch", "Docker", "NGINX"],
  },
];

function SectionHeading({ children }) {
  return (
    <p className="text-[11px] uppercase tracking-widest text-[#04b4e0] font-bold mt-[14px] mb-[6px]">
      {children}
    </p>
  );
}

function RichDetail({ content }) {
  return (
    <div className="text-[12.5px] text-[#ccc] leading-[1.7]">
      <SectionHeading>{content.lang === "vi" ? "Tổng quan" : "Overview"}</SectionHeading>
      <p>{content.overview}</p>

      <SectionHeading>{content.lang === "vi" ? "Vấn đề giải quyết" : "Problem Solved"}</SectionHeading>
      <p>{content.problem}</p>

      <SectionHeading>{content.lang === "vi" ? "Tính năng nổi bật" : "Key Features"}</SectionHeading>
      <ul className="space-y-[3px]">
        {content.features.map((f, i) => (
          <li key={i} className="flex gap-[6px]">
            <span className="text-[#04b4e0] mt-[1px] shrink-0">›</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <SectionHeading>{content.lang === "vi" ? "Technical Highlights" : "Technical Highlights"}</SectionHeading>
      <div className="space-y-[4px]">
        {content.tech.map(([label, value]) => (
          <div key={label} className="flex gap-[8px]">
            <span className="text-[#04b4e0] font-mono font-semibold w-[70px] shrink-0">{label}</span>
            <span className="text-[#bbb]">{value}</span>
          </div>
        ))}
      </div>

      <SectionHeading>{content.lang === "vi" ? "Vai trò" : "My Role"}</SectionHeading>
      <p className="text-[#e0e0e0]">{content.role}</p>
    </div>
  );
}

function ProjectCard({ project, isActive, onClick, subtitle }) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer rounded-[14px] p-[14px] border transition-all duration-200 shrink-0 md:shrink w-[160px] md:w-auto ${
        isActive
          ? "border-[#04b4e0] bg-[#04b4e0]/10"
          : "border-[#444] bg-[#2a2a2a] hover:border-[#04b4e0]/50"
      }`}
    >
      <p className="text-[15px] font-semibold text-[#f5f5f5]">{project.title}</p>
      <p className="text-[12px] text-[#888] mt-[2px]">{subtitle}</p>
      <div className="flex flex-wrap mt-[8px]">
        {project.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="text-[10px] bg-[#333] text-[#aaa] px-[7px] py-[2px] rounded-full mr-[4px] mb-[4px]"
          >
            {tag}
          </span>
        ))}
        {project.tags.length > 3 && (
          <span className="text-[10px] text-[#666] px-[4px] py-[2px]">
            +{project.tags.length - 3} more
          </span>
        )}
      </div>
    </div>
  );
}

function PortfolioPage() {
  const [selected, setSelected] = useState(0);
  const { t, i18n } = useTranslation();
  const active = PROJECT_KEYS[selected];
  const lang = i18n.language === "vi" ? "vi" : "en";
  const detailRef = useRef(null);

  return (
    <div className="page-enter w-full min-h-full bg-[#222] md:rounded-r-[30px] text-white flex flex-col">
      <ScrollProgress containerRef={detailRef} />
    <div className="flex flex-col flex-1 overflow-hidden p-4 md:p-[60px]">
      <div className="mb-[16px] md:mb-[20px]">
        <span className="text-[28px] md:text-[32px] font-semibold">PORT</span>
        <span className="text-[28px] md:text-[32px] text-[#04b4e0] font-semibold">FOLIO</span>
      </div>

      <div className="flex flex-col md:flex-row gap-[16px] md:gap-[24px] flex-1">
        {/* Project list — horizontal scroll on mobile */}
        <div className="md:w-5/12 flex flex-row md:flex-col gap-[10px] overflow-x-auto md:overflow-y-auto md:overflow-x-hidden pb-1 md:pb-0 shrink-0">
          {PROJECT_KEYS.map((p, i) => (
            <ProjectCard
              key={p.key}
              project={p}
              subtitle={t(`portfolio.projects.${p.key}.subtitle`)}
              isActive={selected === i}
              onClick={() => setSelected(i)}
            />
          ))}
        </div>

        {/* Detail panel */}
        <div ref={detailRef} className="md:w-7/12 bg-[#2a2a2a] rounded-[16px] p-[16px] md:p-[24px] overflow-auto flex flex-col">
          <p className="text-[22px] font-bold text-[#f5f5f5] mb-[2px]">{active.title}</p>
          <div className="flex items-center gap-[10px] mb-[14px]">
            <p className="text-[13px] text-[#04b4e0] italic">
              {t(`portfolio.projects.${active.key}.subtitle`)}
            </p>
            {active.link && (
              <a
                href={active.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-[#04b4e0] border border-[#04b4e0]/50 px-[10px] py-[2px] rounded-full hover:bg-[#04b4e0]/20 transition-colors whitespace-nowrap"
              >
                {t("portfolio.visit")} ↗
              </a>
            )}
          </div>

          {active.richContent ? (
            <RichDetail content={{ ...active.richContent[lang], lang }} />
          ) : (
            <p className="text-[13px] text-[#ccc] leading-[1.7] mb-[20px]">
              {t(`portfolio.projects.${active.key}.description`)}
            </p>
          )}

          {active.video && (
            <div className="mt-[16px] mb-[12px] rounded-[10px] overflow-hidden aspect-video w-full">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${active.video}`}
                title={active.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}

          <div className="mt-auto pt-[16px]">
            <p className="text-[11px] text-[#666] uppercase tracking-wide mb-[8px]">
              {t("portfolio.techStack")}
            </p>
            <div className="flex flex-wrap">
              {active.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[12px] bg-[#04b4e0]/20 text-[#04b4e0] border border-[#04b4e0]/40 px-[10px] py-[3px] rounded-full mr-[6px] mb-[6px]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default PortfolioPage;
