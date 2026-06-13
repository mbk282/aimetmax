import { ImageResponse } from "next/og";

export const alt = "AI met Max - AI-geletterdheid, praktisch en nuchter";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Gebrande social-share-kaart in de huisstijl (crème/ink/oranje).
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#FAF6EE",
          color: "#2A2A2A",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ width: "26px", height: "26px", borderRadius: "999px", background: "#E8590C" }} />
          <div style={{ fontSize: "28px", color: "#5A5550", letterSpacing: "3px" }}>AIMETMAX.NL</div>
        </div>
        <div style={{ fontSize: "92px", fontWeight: 800, marginTop: "20px", lineHeight: 1.04 }}>
          AI met Max
        </div>
        <div style={{ display: "flex", fontSize: "40px", color: "#5A5550", marginTop: "18px", maxWidth: "960px" }}>
          AI-geletterdheid voor je organisatie. Praktisch, nuchter, met voorbeelden uit je eigen werk.
        </div>
        <div style={{ display: "flex", marginTop: "44px", gap: "16px" }}>
          {["Gratis academy", "AI-tools", "Auteur AI-Pionier"].map((t) => (
            <div
              key={t}
              style={{
                display: "flex",
                border: "3px solid #2A2A2A",
                borderRadius: "999px",
                padding: "10px 26px",
                fontSize: "26px",
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
