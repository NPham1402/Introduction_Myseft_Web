"use client";
import { useState, useEffect } from "react";
import { Turnstile } from "@marsidev/react-turnstile";

const SITE_KEY   = "0x4AAAAAADUZ3LY80BzlNpEY";
const SESSION_KEY = "cf_verified";

export default function TurnstileGate({ children }) {
  const [verified, setVerified] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) === "1") {
      setVerified(true);
    }
    setChecking(false);
  }, []);

  const handleSuccess = async (token) => {
    try {
      await fetch("/api/verify-turnstile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
    } catch {
      /* ignore */
    }
    sessionStorage.setItem(SESSION_KEY, "1");
    setVerified(true);
  };

  /* still reading sessionStorage */
  if (checking) return null;

  /* already verified this session */
  if (verified) return children;

  /* show challenge */
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "linear-gradient(135deg,#03061a 0%,#0f1f3d 60%,#03061a 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "28px",
        fontFamily: "sans-serif",
      }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap');`}</style>

      {/* Logo / brand */}
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            fontSize: "48px",
            fontWeight: 700,
            color: "#f5f5f5",
            fontFamily: "'Playfair Display', serif",
            letterSpacing: "0.5px",
            lineHeight: 1.2,
          }}
        >
          Đỗ Phạm{" "}
          <span style={{ color: "#04b4e0" }}>Nguyên</span>
        </div>
        <div style={{ fontSize: "15px", color: "#888", marginTop: "6px" }}>
          Full-stack Developer · Portfolio
        </div>
      </div>

      {/* Divider */}
      <div style={{ width: "48px", height: "3px", background: "#04b4e0", borderRadius: "2px" }} />

      {/* Instruction */}
      <p style={{ color: "#aaa", fontSize: "14px", margin: 0 }}>
        Please verify you are human to continue
      </p>

      {/* Turnstile widget */}
      <Turnstile
        siteKey={SITE_KEY}
        onSuccess={handleSuccess}
        options={{ theme: "dark", size: "normal" }}
      />

      <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "12px", margin: 0 }}>
        Protected by Cloudflare Turnstile
      </p>
    </div>
  );
}
