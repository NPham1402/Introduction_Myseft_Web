export const runtime = "edge";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "sans-serif",
        color: "#f5f5f5",
        flexDirection: "column",
        textAlign: "center",
        padding: "24px",
      }}
    >
      <div
        style={{
          fontSize: "clamp(80px, 20vw, 160px)",
          fontWeight: 900,
          lineHeight: 1,
          background: "linear-gradient(135deg, #04b4e0, #ffffff)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          filter: "drop-shadow(0 0 40px rgba(4,180,224,0.4))",
          marginBottom: "16px",
          letterSpacing: "-4px",
        }}
      >
        404
      </div>

      <div style={{ width: "60px", height: "3px", background: "#04b4e0", borderRadius: "2px", marginBottom: "24px" }} />

      <h1 style={{ fontSize: "24px", fontWeight: 600, marginBottom: "12px" }}>
        Page not found
      </h1>
      <p style={{ fontSize: "16px", color: "#888", marginBottom: "40px", maxWidth: "360px", lineHeight: 1.6 }}>
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>

      <a
        href="/"
        style={{
          padding: "12px 36px",
          borderRadius: "30px",
          border: "2px solid #04b4e0",
          background: "transparent",
          color: "#04b4e0",
          fontSize: "15px",
          fontWeight: 500,
          cursor: "pointer",
          textDecoration: "none",
          display: "inline-block",
        }}
      >
        ← Back to Home
      </a>

      <p style={{ marginTop: "60px", fontSize: "13px", color: "rgba(255,255,255,0.2)" }}>
        © 2020 Do Pham Nguyen · dophamnguyen.xyz
      </p>
    </div>
  );
}
