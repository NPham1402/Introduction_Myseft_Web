export const runtime = "edge";
import { ImageResponse } from "next/og";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const title    = searchParams.get("title")    || "Đỗ Phạm Nguyên";
  const subtitle = searchParams.get("subtitle") || "Full-stack Developer";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%)",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Decorative circles */}
        <div style={{ position: "absolute", top: -80, right: -80, width: 320, height: 320, borderRadius: "50%", background: "rgba(4,180,224,0.12)", display: "flex" }} />
        <div style={{ position: "absolute", bottom: -60, left: -60, width: 240, height: 240, borderRadius: "50%", background: "rgba(4,180,224,0.08)", display: "flex" }} />

        {/* Accent line */}
        <div style={{ width: 80, height: 4, background: "#04b4e0", borderRadius: 2, marginBottom: 32, display: "flex" }} />

        {/* Name */}
        <div style={{ fontSize: 72, fontWeight: 700, color: "#f5f5f5", letterSpacing: -2, display: "flex" }}>
          {title}
        </div>

        {/* Subtitle */}
        <div style={{ fontSize: 32, fontWeight: 300, color: "#04b4e0", marginTop: 16, display: "flex" }}>
          {subtitle}
        </div>

        {/* Domain */}
        <div style={{ position: "absolute", bottom: 40, fontSize: 22, color: "rgba(255,255,255,0.4)", display: "flex" }}>
          dophamnguyen.xyz
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
