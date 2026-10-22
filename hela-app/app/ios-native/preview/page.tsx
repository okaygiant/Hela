import IOSNativeHome from "../page"

export default function IPhonePreview() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#1C1C1E",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 40,
        fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* iPhone 16 hardware frame */}
      <div
        style={{
          position: "relative",
          width: 430,
          height: 932,
          background: "#1D1D1F",
          borderRadius: 55,
          boxShadow:
            "0 0 0 2px #3A3A3C, 0 0 0 6px #2C2C2E, inset 0 0 0 2px #3A3A3C, 0 50px 120px rgba(0,0,0,0.9), 0 0 60px rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Side buttons */}
        <div style={{ position: "absolute", left: -4, top: 130, width: 4, height: 36, background: "#3A3A3C", borderRadius: "2px 0 0 2px" }} />
        <div style={{ position: "absolute", left: -4, top: 180, width: 4, height: 66, background: "#3A3A3C", borderRadius: "2px 0 0 2px" }} />
        <div style={{ position: "absolute", left: -4, top: 260, width: 4, height: 66, background: "#3A3A3C", borderRadius: "2px 0 0 2px" }} />
        <div style={{ position: "absolute", right: -4, top: 190, width: 4, height: 90, background: "#3A3A3C", borderRadius: "0 2px 2px 0" }} />

        {/* Dynamic island */}
        <div
          style={{
            position: "absolute",
            top: 14,
            left: "50%",
            transform: "translateX(-50%)",
            width: 120,
            height: 34,
            background: "#000",
            borderRadius: 20,
            zIndex: 10,
          }}
        />

        {/* Screen */}
        <div
          style={{
            width: 390,
            height: 844,
            borderRadius: 44,
            overflow: "hidden",
            position: "relative",
          }}
        >
          <IOSNativeHome fakeStatusBar={true} hideStatusBar={true} />
        </div>
      </div>

      {/* Label */}
      <div style={{ position: "fixed", bottom: 24, left: 0, right: 0, textAlign: "center" }}>
        <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 12, letterSpacing: "0.05em" }}>
          iPhone 16 · iOS 18 · HelaSimulator
        </span>
      </div>
    </div>
  )
}
