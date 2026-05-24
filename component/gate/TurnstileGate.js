"use client";
import { useState, useEffect } from "react";
import { Turnstile } from "@marsidev/react-turnstile";

const SITE_KEY    = "0x4AAAAAADUZ3LY80BzlNpEY";
const SESSION_KEY = "cf_verified";

export default function TurnstileGate({ children }) {
  const [verified, setVerified]   = useState(false);
  const [checking, setChecking]   = useState(true);
  const [fading, setFading]       = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) === "1") setVerified(true);
    setChecking(false);
  }, []);

  const handleSuccess = async (token) => {
    try {
      await fetch("/api/verify-turnstile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
    } catch { /* ignore */ }
    sessionStorage.setItem(SESSION_KEY, "1");

    /* play loading effect before revealing content */
    setFading(true);
    setTimeout(() => setVerified(true), 1400);
  };

  const showGate = !checking && !verified;

  return (
    <>
      {children}

      {showGate && (
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
            transition: "opacity 0.8s ease",
            opacity: fading ? 0 : 1,
            pointerEvents: fading ? "none" : "auto",
          }}
        >
          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap');

            @keyframes gate-spin {
              to { transform: rotate(360deg); }
            }
            @keyframes gate-pulse {
              0%, 100% { opacity: 1; transform: scale(1); }
              50%       { opacity: 0.4; transform: scale(0.88); }
            }
            .gate-spinner {
              width: 44px; height: 44px;
              border: 3px solid rgba(4,180,224,0.2);
              border-top-color: #04b4e0;
              border-radius: 50%;
              animation: gate-spin 0.9s linear infinite;
            }
            .gate-dots span {
              display: inline-block;
              width: 8px; height: 8px;
              margin: 0 4px;
              border-radius: 50%;
              background: #04b4e0;
              animation: gate-pulse 1.2s ease-in-out infinite;
            }
            .gate-dots span:nth-child(2) { animation-delay: 0.2s; }
            .gate-dots span:nth-child(3) { animation-delay: 0.4s; }
          `}</style>

          {/* Brand */}
          <div style={{ textAlign: "center" }}>
            <div style={{
              fontSize: "48px", fontWeight: 700, color: "#f5f5f5",
              fontFamily: "'Playfair Display', serif",
              letterSpacing: "0.5px", lineHeight: 1.2,
            }}>
              Đỗ Phạm <span style={{ color: "#04b4e0" }}>Nguyên</span>
            </div>
            <div style={{ fontSize: "15px", color: "#888", marginTop: "6px" }}>
              Full-stack Developer · Portfolio
            </div>
          </div>

          <div style={{ width: "48px", height: "3px", background: "#04b4e0", borderRadius: "2px" }} />

          {fading ? (
            /* Loading state after verification */
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
              <div className="gate-spinner" />
              <div className="gate-dots">
                <span /><span /><span />
              </div>
              <p style={{ color: "#04b4e0", fontSize: "14px", margin: 0, letterSpacing: "0.5px" }}>
                Entering portfolio…
              </p>
            </div>
          ) : (
            /* Challenge state */
            <>
              <p style={{ color: "#aaa", fontSize: "14px", margin: 0 }}>
                Please verify you are human to continue
              </p>
              <Turnstile
                siteKey={SITE_KEY}
                onSuccess={handleSuccess}
                options={{ theme: "dark", size: "normal" }}
              />
              <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "12px", margin: 0 }}>
                Protected by Cloudflare Turnstile
              </p>
            </>
          )}
        </div>
      )}
    </>
  );
}
