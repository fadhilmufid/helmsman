import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Helmsman · A playbook for your AI coding assistant";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#fbfbfa",
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #d4d4d8 1px, transparent 0)",
          backgroundSize: "32px 32px",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "72px",
              height: "72px",
              borderRadius: "18px",
              background: "#18181b",
              color: "#fafafa",
              fontSize: "40px",
              fontWeight: 700,
            }}
          >
            H
          </div>
          <div style={{ fontSize: "40px", fontWeight: 600, color: "#18181b" }}>
            Helmsman
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              fontSize: "24px",
              color: "#52525b",
            }}
          >
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "9999px",
                background: "#10b981",
              }}
            />
            Steady results, every project
          </div>
          <div
            style={{
              fontSize: "76px",
              lineHeight: 1.05,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "#18181b",
              maxWidth: "1000px",
            }}
          >
            A playbook for your AI coding assistant.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "26px",
            color: "#71717a",
          }}
        >
          <div>Plan first. Follow the rules. Verify the work.</div>
          <div style={{ fontFamily: "monospace" }}>helmsman-agent/</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
