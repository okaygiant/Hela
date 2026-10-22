"use client"
import IOSNativeHome from "@/app/ios-native/page"

export default function TelegramPreview() {
  return (
    <div style={{
      width: "100%", height: "100dvh",
      background: "#000",
      display: "flex", flexDirection: "column",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
      WebkitFontSmoothing: "antialiased",
      overflow: "hidden",
    }}>
      {/* ── TELEGRAM HEADER ── */}
      <div style={{
        flexShrink: 0,
        paddingTop: "env(safe-area-inset-top, 0px)",
        background: "#1C1C1E",
        borderBottom: "0.5px solid rgba(255,255,255,0.1)",
      }}>
        <div style={{
          height: 56,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 16px",
        }}>
          {/* Close */}
          <button style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}>
            <span style={{ fontSize: 17, color: "#007AFF", fontWeight: 400 }}>Close</span>
          </button>

          {/* App name + subtitle */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ fontSize: 17, fontWeight: 700, color: "#fff", letterSpacing: -0.4 }}>
                Hela
              </span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="8" fill="#007AFF" />
                <path d="M4.5 8L6.8 10.5L11.5 5.5" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", letterSpacing: -0.1 }}>mini app</span>
          </div>

          {/* More */}
          <button style={{
            background: "none", border: "1.5px solid rgba(255,255,255,0.25)",
            borderRadius: "50%", width: 32, height: 32,
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer",
          }}>
            <span style={{ fontSize: 16, color: "#007AFF", lineHeight: 1, letterSpacing: 1 }}>···</span>
          </button>
        </div>
      </div>

      {/* ── MINI APP CONTENT ── */}
      <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
        <IOSNativeHome hideNavBar={true} />
      </div>
    </div>
  )
}
