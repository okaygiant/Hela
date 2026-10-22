"use client"
import { useState } from "react"

const CONTACTS = [
  { name: "Alice",      color: "#E8834A", emoji: "😍" },
  { name: "Bob Smith",  color: "#3B82C4", emoji: "🙂" },
  { name: "Taylor",     color: "#4A7EC4", emoji: "😊" },
  { name: "Dana Lee",   color: "#C4B89A", emoji: "😗" },
  { name: "Evan",       color: "#4A8EC4", emoji: "😊" },
  { name: "Fiona Chen", color: "#1A3A5C", emoji: "😍" },
  { name: "George King",color: "#2A6A8C", emoji: "😴", muted: true },
]

const AVATAR_SIZE = 52

export default function ContactsPage() {
  const [open, setOpen] = useState(false)

  return (
    <div style={{
      minHeight: "100vh", background: "#000",
      display: "flex", justifyContent: "center", alignItems: "flex-start",
      paddingTop: 32, paddingBottom: 32,
    }}>
      {/* Phone frame */}
      <div style={{
        position: "relative",
        width: 390, height: 844,
        borderRadius: 44, overflow: "hidden",
        background: "#111",
        boxShadow: "0 40px 100px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.08)",
        display: "flex", flexDirection: "column",
      }}>

        {/* Top bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px 0", flexShrink: 0 }}>
          <span style={{ color: "#fff", fontSize: 17, fontWeight: 400 }}>Content</span>
          <button
            onClick={() => setOpen(o => !o)}
            style={{
              width: 44, height: 44, borderRadius: 22,
              background: "rgba(255,255,255,0.15)",
              border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 20,
            }}
          >
            ⚙️
          </button>
        </div>

        {/* Main content area (dark/empty like the recording) */}
        <div style={{ flex: 1, position: "relative" }}>

          {/* CONTACT LIST OVERLAY */}
          {open && (
            <div
              style={{
                position: "absolute", inset: 0,
                display: "flex", flexDirection: "column",
                justifyContent: "flex-end",
                padding: "0 20px 20px",
              }}
              onClick={e => { if (e.target === e.currentTarget) setOpen(false) }}
            >
              {/* Staggered contact items — each slides in from the right */}
              <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 20 }}>
                {CONTACTS.map((c, i) => (
                  <div
                    key={c.name}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "flex-end",
                      gap: 14,
                      // Stagger: item 0 appears first (shortest delay), last item appears last
                      animation: `slideInRight 380ms cubic-bezier(0.34, 1.56, 0.64, 1) both`,
                      animationDelay: `${i * 55}ms`,
                    }}
                  >
                    <span style={{
                      fontSize: 17, fontWeight: 700,
                      color: c.muted ? "rgba(255,255,255,0.4)" : "#fff",
                      letterSpacing: -0.3,
                    }}>
                      {c.name}
                    </span>

                    {/* Avatar */}
                    <div style={{
                      width: AVATAR_SIZE, height: AVATAR_SIZE, borderRadius: 14, flexShrink: 0,
                      background: c.color,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 26,
                      boxShadow: "0 2px 12px rgba(0,0,0,0.4)",
                    }}>
                      {c.emoji}
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom action bar */}
              <div
                style={{
                  display: "flex", gap: 12,
                  animation: `slideInRight 380ms cubic-bezier(0.34, 1.56, 0.64, 1) both`,
                  animationDelay: `${CONTACTS.length * 55}ms`,
                }}
              >
                <button
                  onClick={() => {}}
                  style={{
                    flex: 1, height: 60, borderRadius: 30,
                    background: "#fff", color: "#000",
                    fontSize: 17, fontWeight: 700, border: "none", cursor: "pointer",
                    letterSpacing: -0.3,
                  }}
                >
                  Manage List
                </button>
                <button
                  onClick={() => setOpen(false)}
                  style={{
                    width: 60, height: 60, borderRadius: 30,
                    background: "#fff", color: "#000",
                    fontSize: 22, fontWeight: 300, border: "none", cursor: "pointer",
                  }}
                >
                  ✕
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Trigger button — bottom center, shown only when closed */}
        {!open && (
          <div style={{ flexShrink: 0, padding: "12px 20px 32px", display: "flex", justifyContent: "center" }}>
            <button
              onClick={() => setOpen(true)}
              style={{
                padding: "14px 36px", borderRadius: 30,
                background: "rgba(255,255,255,0.15)", color: "#fff",
                fontSize: 15, fontWeight: 600, border: "none", cursor: "pointer",
                backdropFilter: "blur(10px)",
              }}
            >
              Share with contacts
            </button>
          </div>
        )}
      </div>

      {/* Keyframe animation */}
      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(70px); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
      `}</style>
    </div>
  )
}
