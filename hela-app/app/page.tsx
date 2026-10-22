"use client"
import { useState } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

const CIRCLE_R = 80
const CIRCLE_C = parseFloat((2 * Math.PI * CIRCLE_R).toFixed(2))
const arcOffset = CIRCLE_C * (1 - 280 / 500)

const STREAK_DAYS   = ["M", "T", "W", "T", "F", "S", "S"]
const STREAK_FILLED = 3

const ACTIONS = [
  { emoji: "💼", label: "Work", status: "2 shifts open" },
  { emoji: "⚽", label: "Bet",  status: "Match in 3h"   },
  { emoji: "🎰", label: "Play", status: "Jackpot 500"   },
]

const PROMO_CARDS = [
  { title: "Invite & Earn", sub: "Up to HC 1,000", btn: "Get started", primary: true  },
  { title: "Daily Rewards", sub: "0/3 claimed",    btn: "Claim",       primary: true  },
  { title: "Win Bank",      sub: "2/5 bets",       btn: "Spin 🎰",     primary: false },
]

const TRANSACTIONS = [
  { emoji: "💼", title: "Ball crew shift", time: "12:05  Oct 22", amount: "+HC 20"  },
  { emoji: "💼", title: "Shift payment",   time: "12:04  Oct 22", amount: "+HC 260" },
  { emoji: "🎮", title: "Casino payout",   time: "3:46  Oct 20",  amount: "+HC 25"  },
]

const TAB_ITEMS = [
  { emoji: "💼", label: "Work" },
  { emoji: "⚽", label: "Bet"  },
  { emoji: "🎰", label: "Play" },
  { emoji: "···", label: "More" },
]

// Dark iOS palette
const C = {
  bg:         "#000000",
  frame:      "#1C1C1E",
  card:       "#2C2C2E",
  elevated:   "#3A3A3C",
  border:     "rgba(255,255,255,0.10)",
  text:       "#FFFFFF",
  textSub:    "#8E8E93",
  textMuted:  "#48484A",
  tabPill:    "#1C1C1E",
  tabActive:  "rgba(255,255,255,0.13)",
  accent:     "#FFFFFF",
}

export default function HomePage() {
  const [activeTab, setActiveTab] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "flex-start", background: C.bg, paddingTop: 32, paddingBottom: 32 }}>
      {/* Phone frame — iPhone 16 390×844 */}
      <div style={{
        position: "relative", display: "flex", flexDirection: "column",
        width: 390, height: 844, borderRadius: 44, overflow: "hidden",
        background: C.frame,
        boxShadow: "0 40px 100px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.08)",
      }}>

        {/* TOP BAR */}
        <div style={{ display: "flex", alignItems: "center", padding: "14px 16px 4px", gap: 8, flexShrink: 0 }}>
          <Avatar className="size-9">
            <AvatarFallback style={{ background: C.elevated, color: C.text, fontWeight: 700, fontSize: 14 }}>S</AvatarFallback>
          </Avatar>
          <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
            <span style={{ fontWeight: 600, fontSize: 14, color: C.text }}>🔥 3 days  ›</span>
          </div>
          <span style={{ fontWeight: 700, fontSize: 15, color: C.text }}>HC 280</span>
        </div>

        {/* SCROLLABLE BODY */}
        <div style={{ flex: 1, overflowY: menuOpen ? "hidden" : "auto", scrollbarWidth: "none", position: "relative" }}>

          {/* Dim overlay when menu open */}
          {menuOpen && (
            <div
              onClick={() => setMenuOpen(false)}
              style={{
                position: "absolute", inset: 0, zIndex: 10,
                background: "rgba(0,0,0,0.72)",
                backdropFilter: "blur(2px)",
                WebkitBackdropFilter: "blur(2px)",
              }}
            />
          )}

          {/* CIRCULAR PROGRESS */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 12, paddingBottom: 12 }}>
            <div style={{ position: "relative", width: 190, height: 190 }}>
              <svg width="190" height="190" viewBox="0 0 190 190" style={{ transform: "rotate(-90deg)" }}>
                <circle cx="95" cy="95" r={CIRCLE_R} fill={C.card} stroke={C.border} strokeWidth="10" />
                <circle
                  cx="95" cy="95" r={CIRCLE_R}
                  fill="none" stroke={C.accent} strokeWidth="10" strokeLinecap="round"
                  strokeDasharray={CIRCLE_C} strokeDashoffset={arcOffset}
                />
              </svg>
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2, pointerEvents: "none" }}>
                <span style={{ fontSize: 11, color: C.textSub }}>HC today</span>
                <span style={{ fontSize: 52, fontWeight: 700, color: C.text, lineHeight: 1 }}>280</span>
                <span style={{ fontSize: 11, color: C.textSub }}>Daily goal: 500 HC</span>
              </div>
            </div>
            <Button style={{
              marginTop: 12, borderRadius: 50, background: C.elevated, color: C.text,
              fontSize: 13, fontWeight: 600, height: 40, paddingLeft: 24, paddingRight: 24,
              border: `0.5px solid ${C.border}`, boxShadow: "none",
            }}>
              ⚡ Activate 2X Boost
            </Button>
          </div>

          {/* STREAK CARD */}
          <div style={{ padding: "0 16px 12px" }}>
            <Card style={{ background: C.card, border: `0.5px solid ${C.border}`, borderRadius: 14 }}>
              <CardContent style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 12px", height: 52 }}>
                <span style={{ fontWeight: 600, fontSize: 14, color: C.text, flex: 1 }}>🔥 3-day streak</span>
                <div style={{ display: "flex", gap: 3 }}>
                  {STREAK_DAYS.map((day, i) => {
                    const filled  = i < STREAK_FILLED
                    const isToday = i === STREAK_FILLED
                    return (
                      <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                        <div style={{
                          width: 22, height: 22, borderRadius: 11, flexShrink: 0,
                          background: filled ? C.text : isToday ? "transparent" : C.elevated,
                          border: isToday ? `2px solid ${C.text}` : "none",
                        }} />
                        <span style={{ fontSize: 8, color: C.textSub }}>{day}</span>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CAREER CARD */}
          <div style={{ padding: "0 16px 12px" }}>
            <Card style={{ background: C.card, border: `0.5px solid ${C.border}`, borderRadius: 14 }}>
              <CardContent style={{ paddingTop: 10, paddingBottom: 14, paddingLeft: 12, paddingRight: 12 }}>
                <p style={{ fontSize: 10, fontWeight: 700, color: C.textSub, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>Your Career</p>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <span style={{ fontSize: 26, fontWeight: 700, color: C.text }}>Runner</span>
                  <Badge style={{ background: C.elevated, color: C.textSub, border: "none", borderRadius: 10, fontSize: 11, fontWeight: 600, padding: "2px 10px", height: 24 }}>LVL 01</Badge>
                </div>
                <Progress
                  value={39}
                  className="[&_[data-slot=progress-track]]:h-[4px] [&_[data-slot=progress-track]]:bg-white/10 [&_[data-slot=progress-indicator]]:bg-white [&_[data-slot=progress-indicator]]:rounded-full"
                />
              </CardContent>
            </Card>
          </div>

          {/* ACTIONS CARD */}
          <div style={{ padding: "0 16px 12px" }}>
            <Card style={{ background: C.card, border: `0.5px solid ${C.border}`, borderRadius: 18, overflow: "hidden" }}>
              <CardContent style={{ padding: 0 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", height: 90 }}>
                  {ACTIONS.map((a, i) => (
                    <div key={a.label} style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4 }}>
                      {i > 0 && <div style={{ position: "absolute", left: 0, top: 16, bottom: 16, width: 0.5, background: C.border }} />}
                      <span style={{ fontSize: 28 }}>{a.emoji}</span>
                      <span style={{ fontSize: 12, fontWeight: 600, color: C.text }}>{a.label}</span>
                      <span style={{ fontSize: 9, color: C.textSub }}>{a.status}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* PROMO CARDS */}
          <div style={{ display: "flex", gap: 10, padding: "0 16px 12px" }}>
            {PROMO_CARDS.map((card) => (
              <Card key={card.title} style={{ flex: 1, background: C.card, border: `0.5px solid ${C.border}`, borderRadius: 14, overflow: "hidden", height: 118 }}>
                <CardContent style={{ display: "flex", flexDirection: "column", height: "100%", padding: 0, paddingTop: 10, paddingLeft: 10, paddingRight: 10, paddingBottom: 10 }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: C.text, lineHeight: 1.2 }}>{card.title}</p>
                  <p style={{ fontSize: 10, color: C.textSub, marginTop: 2 }}>{card.sub}</p>
                  <div style={{ flex: 1 }} />
                  <Button style={{
                    width: "100%", borderRadius: 50, fontSize: 12, fontWeight: 700, height: 36, border: "none",
                    background: card.primary ? C.text : C.elevated,
                    color: card.primary ? C.frame : C.text,
                    boxShadow: "none",
                  }}>
                    {card.btn}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* BALANCE HISTORY */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 16px 8px" }}>
            <span style={{ fontSize: 18, fontWeight: 700, color: C.text }}>Balance history</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: C.textSub }}>Load more</span>
          </div>
          <div style={{ padding: "0 16px 16px" }}>
            <Card style={{ background: C.card, border: `0.5px solid ${C.border}`, borderRadius: 14, overflow: "hidden" }}>
              <CardContent style={{ padding: 0 }}>
                {TRANSACTIONS.map((tx, i) => (
                  <div key={i}>
                    {i > 0 && <Separator style={{ background: C.border }} />}
                    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px" }}>
                      <div style={{ width: 36, height: 36, borderRadius: 10, background: C.elevated, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>
                        {tx.emoji}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: 12, fontWeight: 600, color: C.text }}>{tx.title}</p>
                        <p style={{ fontSize: 10, color: C.textSub }}>{tx.time}</p>
                      </div>
                      <span style={{ fontSize: 13, fontWeight: 700, color: C.text, flexShrink: 0 }}>{tx.amount}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

        </div>

        {/* STAGGERED VERTICAL MENU — slides in from right on button tap */}
        <div style={{ flexShrink: 0, position: "relative" }}>

          {/* Expanded list overlay — positioned above the trigger button */}
          {menuOpen && (
            <div style={{
              position: "absolute", bottom: "100%", left: 0, right: 0,
              padding: "0 20px 16px",
              display: "flex", flexDirection: "column", gap: 14,
            }}>
              {TAB_ITEMS.map((tab, i) => {
                const isActive = activeTab === i
                return (
                  <div
                    key={tab.label}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 14,
                      animation: "slideInRight 360ms cubic-bezier(0.34, 1.56, 0.64, 1) both",
                      animationDelay: `${i * 55}ms`,
                    }}
                  >
                    <span style={{
                      fontSize: 17, fontWeight: 700, letterSpacing: -0.3,
                      color: isActive ? C.text : C.textSub,
                    }}>
                      {tab.label}
                    </span>
                    <button
                      onClick={() => { setActiveTab(i); setMenuOpen(false) }}
                      style={{
                        width: 52, height: 52, borderRadius: 14, flexShrink: 0,
                        background: isActive ? C.text : C.elevated,
                        border: isActive ? "none" : `0.5px solid ${C.border}`,
                        cursor: "pointer", fontSize: 26,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        boxShadow: isActive ? "0 4px 16px rgba(255,255,255,0.2)" : "0 2px 8px rgba(0,0,0,0.4)",
                      }}
                    >
                      {tab.emoji}
                    </button>
                  </div>
                )
              })}
            </div>
          )}

          {/* Bottom bar: active tab label + open/close button */}
          <div style={{ padding: "8px 20px 28px", display: "flex", gap: 12 }}>
            {menuOpen ? (
              /* Close button */
              <button
                onClick={() => setMenuOpen(false)}
                style={{
                  flex: 1, height: 58, borderRadius: 30,
                  background: C.elevated, border: `0.5px solid ${C.border}`,
                  color: C.text, fontSize: 22, cursor: "pointer",
                  animation: "slideInRight 360ms cubic-bezier(0.34, 1.56, 0.64, 1) both",
                  animationDelay: `${TAB_ITEMS.length * 55}ms`,
                }}
              >
                ✕
              </button>
            ) : (
              /* Collapsed: show active section + open button */
              <>
                <button
                  onClick={() => setMenuOpen(true)}
                  style={{
                    flex: 1, height: 58, borderRadius: 30,
                    background: C.elevated, border: `0.5px solid ${C.border}`,
                    color: C.text, fontSize: 15, fontWeight: 600, cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  }}
                >
                  <span style={{ fontSize: 22 }}>{TAB_ITEMS[activeTab].emoji}</span>
                  <span>{TAB_ITEMS[activeTab].label}</span>
                </button>
                <button
                  onClick={() => setMenuOpen(true)}
                  style={{
                    width: 58, height: 58, borderRadius: 30,
                    background: C.elevated, border: `0.5px solid ${C.border}`,
                    color: C.textSub, fontSize: 20, cursor: "pointer",
                  }}
                >
                  ···
                </button>
              </>
            )}
          </div>
        </div>

        <style>{`
          @keyframes slideInRight {
            from { transform: translateX(70px); opacity: 0; }
            to   { transform: translateX(0);    opacity: 1; }
          }
        `}</style>

      </div>
    </div>
  )
}
