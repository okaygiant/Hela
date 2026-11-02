"use client"
import IOSNativeHome from "@/app/ios-native/page"
import SortUIHome from "@/app/ios-native/sortui/page"

export default function ComparePage() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#0A0A0F",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "32px 24px 48px",
      gap: 32,
      fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
    }}>
      {/* Header */}
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "#fff", letterSpacing: -0.5, margin: 0 }}>
          Component Comparison
        </h1>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginTop: 6 }}>
          Original shadcn · SortUI
        </p>
      </div>

      {/* Side by side */}
      <div style={{
        display: "flex",
        gap: 32,
        alignItems: "flex-start",
        flexWrap: "wrap",
        justifyContent: "center",
      }}>

        {/* Original */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
          <span style={{
            fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.4)",
            letterSpacing: 1.5, textTransform: "uppercase",
          }}>
            Original · shadcn
          </span>
          <div style={{
            width: 390,
            height: 844,
            borderRadius: 44,
            overflow: "hidden",
            boxShadow: "0 40px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.08)",
            flexShrink: 0,
          }}>
            <IOSNativeHome fakeStatusBar={true} />
          </div>
        </div>

        {/* SortUI */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
          <span style={{
            fontSize: 11, fontWeight: 600, color: "rgba(123,95,255,0.8)",
            letterSpacing: 1.5, textTransform: "uppercase",
          }}>
            SortUI
          </span>
          <div style={{
            width: 390,
            height: 844,
            borderRadius: 44,
            overflow: "hidden",
            boxShadow: "0 40px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(123,95,255,0.3)",
            flexShrink: 0,
          }}>
            <SortUIHome fakeStatusBar={true} />
          </div>
        </div>

      </div>
    </div>
  )
}
