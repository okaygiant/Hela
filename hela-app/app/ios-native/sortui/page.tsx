"use client"
import { useState, useEffect, useRef } from "react"
import { cn } from "cn"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardAction,
  CardDescription,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarGroup } from "@/components/ui/avatar"
import { Progress, ProgressTrack, ProgressIndicator } from "@/components/ui/progress"
import { Marker, MarkerIcon, MarkerContent } from "@/components/ui/marker"
import {
  Item,
  ItemMedia,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemActions,
} from "@/components/ui/item"
import { Spinner } from "@/components/ui/spinner"
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

const ACTIONS = [
  { label: "Work", emoji: "💼", badge: 2,  color: "#007AFF", glow: "rgba(0,122,255,0.5)",  glassClass: "lg-blue",   status: "2 shifts open",   statusColor: "rgba(255,255,255,0.45)" },
  { label: "Bet",  emoji: "⚽", badge: 3,  color: "#FF9500", glow: "rgba(255,149,0,0.5)",  glassClass: "lg-orange", status: "Match starts 3h", statusColor: "#FF9500"               },
  { label: "Play", emoji: "🎰", badge: 30, color: "#34C759", glow: "rgba(52,199,89,0.5)",  glassClass: "lg-green",  status: "Jackpot: 500 HC", statusColor: "#34C759"               },
]

const TRANSACTIONS = [
  { icon: "💼", title: "Ball crew · shift",  sub: "Oct 22 at 12:05 AM", amount: "+20",    color: "#34C759" },
  { icon: "💼", title: "Shift payment",       sub: "Oct 22 at 12:04 AM", amount: "+260",   color: "#34C759" },
  { icon: "🎮", title: "Casino payout",       sub: "Oct 20 at 03:46 PM", amount: "+24.65", color: "#34C759" },
]

const STREAK_DAYS   = ["M", "T", "W", "T", "F", "S", "S"]
const STREAK_FILLED = 3   // Mon Tue Wed done; today = Thu = index 3

type Ripple = { id: number; x: number; y: number }

const CIRCLE_R = 72
const CIRCLE_C = parseFloat((Math.PI * 2 * CIRCLE_R).toFixed(2)) // ≈452.39

// Shared Tailwind class string for glass dark cards (replaces GLASS_DARK spread)
const GLASS = "bg-white/[0.07] border-white/[0.10] backdrop-blur-xl ring-0 !py-0 !gap-0 shadow-[0_1px_0_rgba(255,255,255,0.05),0_8px_32px_rgba(0,0,0,0.36)]"

export default function IOSNativeHome({ fakeStatusBar = false, hideNavBar = false, hideStatusBar = false }: { fakeStatusBar?: boolean; hideNavBar?: boolean; hideStatusBar?: boolean }) {
  const [activeTab, setActiveTab]         = useState(0)
  const [pressedAction, setPressedAction] = useState<number | null>(null)
  const [xpValue, setXpValue]             = useState(0)
  const [diExpanded, setDiExpanded]       = useState(false)
  const [heroRipples, setHeroRipples]     = useState<Ripple[]>([])
  const [wbRipples, setWbRipples]         = useState<Ripple[]>([])
  const [arcOffset, setArcOffset]         = useState(CIRCLE_C)
  const [boostPressed, setBoostPressed]   = useState(false)
  const [menuOpen, setMenuOpen]           = useState(false)
  const rippleId = useRef(0)

  useEffect(() => {
    const t = setTimeout(() => {
      setXpValue(39)
      setArcOffset(CIRCLE_C * (1 - 0.56))
    }, 700)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (fakeStatusBar) return
    const prev     = document.body.style.background
    const prevHtml = document.documentElement.style.background
    document.body.style.background            = "#131316"
    document.documentElement.style.background = "#131316"
    return () => {
      document.body.style.background            = prev
      document.documentElement.style.background = prevHtml
    }
  }, [fakeStatusBar])

  function spawnRipple(e: React.MouseEvent, setter: React.Dispatch<React.SetStateAction<Ripple[]>>) {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const id   = ++rippleId.current
    setter(r => [...r, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }])
    setTimeout(() => setter(r => r.filter(x => x.id !== id)), 700)
  }

  function tapAction(i: number) {
    setPressedAction(i)
    setTimeout(() => setPressedAction(null), 180)
  }

  return (
    <TooltipProvider>
      <style>{`
        @keyframes float {
          0%,100% { transform: translateY(0) rotate(-1deg); }
          50%      { transform: translateY(-11px) rotate(1deg); }
        }
        @keyframes ripple {
          from { transform: scale(0); opacity: 0.5; }
          to   { transform: scale(5); opacity: 0;   }
        }
        @keyframes badgePop {
          0%   { transform: scale(0.5);  }
          70%  { transform: scale(1.25); }
          100% { transform: scale(1);    }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes dotPulse {
          0%,100% { transform: scale(1);    opacity: 1;    }
          50%     { transform: scale(1.35); opacity: 0.75; }
        }
        @keyframes giftGlow {
          0%,100% { box-shadow: 0 0 0 0px rgba(123,95,255,0.0), 0 2px 20px rgba(0,0,0,0.20); }
          50%     { box-shadow: 0 0 0 4px rgba(123,95,255,0.30), 0 2px 20px rgba(0,0,0,0.20); }
        }
        @keyframes shimmerText {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes arcIn {
          from { stroke-dashoffset: ${CIRCLE_C}; }
        }
        @keyframes pulseGlow {
          0%,100% { opacity: 0.55; transform: scale(1);    }
          50%     { opacity: 0.80; transform: scale(1.08); }
        }
        @keyframes islandIn {
          from { transform: scale(0.88) translateY(6px); opacity: 0; }
          to   { transform: scale(1)    translateY(0);   opacity: 1; }
        }
        .shimmer-text {
          background: linear-gradient(90deg, #fff 0%, rgba(255,255,255,0.55) 50%, #fff 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmerText 2.5s linear infinite;
        }
        /* ── Action icon liquid glass spheres ── */
        .lg-blue {
          background: radial-gradient(ellipse at 35% 28%, #6ABFFF 0%, #0060FF 100%);
          box-shadow: 0 8px 24px rgba(0,122,255,0.55),
                      inset 0 1.5px 0 rgba(255,255,255,0.55),
                      inset 0 -1px 0 rgba(0,0,0,0.15);
        }
        .lg-orange {
          background: radial-gradient(ellipse at 35% 28%, #FFD580 0%, #FF6A00 100%);
          box-shadow: 0 8px 24px rgba(255,149,0,0.55),
                      inset 0 1.5px 0 rgba(255,255,255,0.55),
                      inset 0 -1px 0 rgba(0,0,0,0.15);
        }
        .lg-green {
          background: radial-gradient(ellipse at 35% 28%, #80ECA0 0%, #14A040 100%);
          box-shadow: 0 8px 24px rgba(52,199,89,0.55),
                      inset 0 1.5px 0 rgba(255,255,255,0.55),
                      inset 0 -1px 0 rgba(0,0,0,0.15);
        }
        /* ── XP bar ── */
        .xp-fill {
          transition: width 1.3s cubic-bezier(0.22,1,0.36,1);
          background: linear-gradient(90deg, #3B0F8C 0%, #6B21A8 100%);
          position: relative; overflow: hidden;
        }
        .xp-fill::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.35) 50%, transparent);
          background-size: 200% 100%;
          animation: shimmer 2.2s linear infinite;
        }
        /* ── Tap states ── */
        .row-tap  { transition: background 0.15s; cursor: pointer; }
        .row-tap:active { background: rgba(255,255,255,0.06) !important; }
        .card-tap { transition: transform 0.12s ease; cursor: pointer; }
        .card-tap:active { transform: scale(0.97); }
        /* ── Vertical floating menu ── */
        @keyframes slideInRight {
          from { transform: translateX(72px); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
        .menu-trigger {
          transition: transform 0.38s cubic-bezier(0.34,1.56,0.64,1), opacity 0.22s ease;
        }
        .menu-trigger:active { opacity: 0.75; }

        /* ── Play FAB (uiverse dexter-st button) ── */
        .fab-btn {
          --border-radius: 24px;
          --padding: 4px;
          --transition: 0.4s;
          --button-color: #101010;
          --highlight-color-hue: 280deg;

          user-select: none;
          display: flex;
          justify-content: center;
          align-items: center;
          width: auto;
          height: 48px;
          padding: 0 1.4em;
          font-family: "SF Pro Display", "Inter", sans-serif;
          font-size: 15px;
          font-weight: 600;
          letter-spacing: -0.3px;
          background-color: var(--button-color);
          box-shadow:
            inset 0px 1px 1px rgba(255,255,255,0.20),
            inset 0px 2px 2px rgba(255,255,255,0.15),
            inset 0px 4px 4px rgba(255,255,255,0.10),
            inset 0px 8px 8px rgba(255,255,255,0.05),
            inset 0px 16px 16px rgba(255,255,255,0.05),
            0px -1px 1px rgba(0,0,0,0.02),
            0px -2px 2px rgba(0,0,0,0.03),
            0px -4px 4px rgba(0,0,0,0.05),
            0px -8px 8px rgba(0,0,0,0.06),
            0px -16px 16px rgba(0,0,0,0.08);
          border: solid 1px #fff2;
          border-radius: var(--border-radius);
          cursor: pointer;
          position: relative;
          transition: box-shadow var(--transition), border var(--transition), background-color var(--transition);
        }
        .fab-btn::before {
          content: "";
          position: absolute;
          top: calc(0px - var(--padding));
          left: calc(0px - var(--padding));
          width: calc(100% + var(--padding) * 2);
          height: calc(100% + var(--padding) * 2);
          border-radius: calc(var(--border-radius) + var(--padding));
          pointer-events: none;
          background-image: linear-gradient(0deg, #0004, #000a);
          z-index: -1;
          transition: box-shadow var(--transition), filter var(--transition);
          box-shadow:
            0 -8px 8px -6px #0000 inset,
            0 -16px 16px -8px #00000000 inset,
            1px 1px 1px #fff2,
            2px 2px 2px #fff1,
            -1px -1px 1px #0002,
            -2px -2px 2px #0001;
        }
        .fab-btn::after {
          content: "";
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          border-radius: inherit;
          pointer-events: none;
          background-image: linear-gradient(
            0deg,
            #fff,
            hsl(var(--highlight-color-hue), 100%, 70%),
            hsla(var(--highlight-color-hue), 100%, 70%, 50%),
            8%,
            transparent
          );
          background-position: 0 0;
          opacity: 0;
          transition: opacity var(--transition), filter var(--transition);
        }
        .fab-letter {
          position: relative;
          display: inline-block;
          color: #fff5;
          animation: fab-letter-anim 2s ease-in-out infinite;
          transition: color var(--transition), text-shadow var(--transition);
        }
        @keyframes fab-letter-anim {
          50% { text-shadow: 0 0 3px #fff8; color: #fff; }
        }
        .fab-svg {
          height: 18px;
          width: 18px;
          margin-right: 0.45rem;
          fill: #e8e8e8;
          animation: fab-flicker 2s linear infinite;
          animation-delay: 0.5s;
          filter: drop-shadow(0 0 2px #fff9);
          transition: fill var(--transition), filter var(--transition);
          flex-shrink: 0;
        }
        @keyframes fab-flicker {
          50% { opacity: 0.3; }
        }
        .fab-txt-wrapper {
          display: flex;
          align-items: center;
          gap: 1px;
        }
        @keyframes fab-appear {
          0% { opacity: 0; } 100% { opacity: 1; }
        }
        /* hover */
        .fab-btn:hover { border: solid 1px hsla(var(--highlight-color-hue), 100%, 80%, 40%); }
        .fab-btn:hover::before {
          box-shadow:
            0 -8px 8px -6px #fffa inset,
            0 -16px 16px -8px hsla(var(--highlight-color-hue), 100%, 70%, 30%) inset,
            1px 1px 1px #fff2, 2px 2px 2px #fff1,
            -1px -1px 1px #0002, -2px -2px 2px #0001;
        }
        .fab-btn:hover::after { opacity: 1; mask-image: linear-gradient(0deg, #fff, transparent); }
        .fab-btn:hover .fab-svg {
          fill: #fff;
          filter: drop-shadow(0 0 3px hsl(var(--highlight-color-hue), 100%, 70%)) drop-shadow(0 -4px 6px #0009);
          animation: none;
        }
        /* active */
        .fab-btn:active {
          border: solid 1px hsla(var(--highlight-color-hue), 100%, 80%, 70%);
          background-color: hsla(var(--highlight-color-hue), 50%, 20%, 0.5);
        }
        .fab-btn:active::before {
          box-shadow:
            0 -8px 12px -6px #fffa inset,
            0 -16px 16px -8px hsla(var(--highlight-color-hue), 100%, 70%, 80%) inset,
            1px 1px 1px #fff4, 2px 2px 2px #fff2,
            -1px -1px 1px #0002, -2px -2px 2px #0001;
        }
        .fab-btn:active::after { opacity: 1; mask-image: linear-gradient(0deg, #fff, transparent); filter: brightness(200%); }
        .fab-btn:active .fab-letter { text-shadow: 0 0 1px hsla(var(--highlight-color-hue), 100%, 90%, 90%); animation: none; }
        /* letter delays */
        .fab-letter:nth-child(1) { animation-delay: 0s; }
        .fab-letter:nth-child(2) { animation-delay: 0.08s; }
        .fab-letter:nth-child(3) { animation-delay: 0.16s; }
        .fab-letter:nth-child(4) { animation-delay: 0.24s; }
        ::-webkit-scrollbar { display: none; }

        /* ── SortUI dark theme + deep purple accent (scoped) ── */
        .sortui-dark {
          --background:         oklch(0.145 0 0);
          --foreground:         oklch(0.985 0 0);
          --card:               oklch(0.205 0 0);
          --card-foreground:    oklch(0.985 0 0);
          --popover:            oklch(0.205 0 0);
          --popover-foreground: oklch(0.985 0 0);
          --primary:            oklch(0.42 0.22 290);
          --primary-foreground: oklch(0.985 0 0);
          --secondary:          oklch(0.269 0 0);
          --secondary-foreground: oklch(0.985 0 0);
          --muted:              oklch(0.205 0 0);
          --muted-foreground:   oklch(0.708 0 0);
          --accent:             oklch(0.42 0.22 290);
          --accent-foreground:  oklch(0.985 0 0);
          --destructive:        oklch(0.637 0.237 25.331);
          --border:             oklch(1 0 0 / 10%);
          --input:              oklch(0.269 0 0);
          --ring:               oklch(0.42 0.22 290);
          --fill-1:             oklch(1 0 0 / 5%);
          --fill-2:             oklch(1 0 0 / 8%);
          --fill-3:             oklch(1 0 0 / 12%);
          --fill-4:             oklch(1 0 0 / 18%);
          --field:              oklch(1 0 0 / 4%);
          --control:            oklch(0.269 0 0);
          --control-hover:      oklch(0.32 0 0);
          --control-border:     oklch(1 0 0 / 15%);
          --raised:             oklch(0.269 0 0);
        }
      `}</style>

      {/* ── ROOT ── */}
      <div
        className="relative flex flex-col overflow-hidden sortui-dark"
        style={{
          width: fakeStatusBar ? 390 : "100%",
          height: fakeStatusBar ? undefined : "100dvh",
          minHeight: fakeStatusBar ? 844 : undefined,
          background: "oklch(0.145 0 0)",
          fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'SF Pro Rounded', 'Helvetica Neue', sans-serif",
          color: "#FFFFFF",
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
          textRendering: "optimizeLegibility",
        } as React.CSSProperties}
      >

        {/* ── STATUS BAR (fakeStatusBar only) ── */}
        <div style={{
          height: 54,
          display: fakeStatusBar ? "flex" : "none",
          alignItems: "flex-end", justifyContent: "space-between",
          padding: "0 22px 8px", position: "relative", flexShrink: 0,
        }}>
          {!hideStatusBar && (
            <>
              {/* Dynamic Island */}
              <div
                onClick={() => setDiExpanded(d => !d)}
                style={{
                  position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)",
                  width: diExpanded ? 190 : 120, height: diExpanded ? 46 : 34,
                  background: "#000", borderRadius: 22, cursor: "pointer", zIndex: 20,
                  transition: "width 0.38s cubic-bezier(0.34,1.56,0.64,1), height 0.38s cubic-bezier(0.34,1.56,0.64,1)",
                  display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden",
                }}
              >
                {diExpanded && (
                  <span style={{ color: "#fff", fontSize: 12, fontWeight: 600, opacity: 0.85, letterSpacing: -0.3 }}>HelaSimulator</span>
                )}
              </div>
              <span style={{ fontSize: 15, fontWeight: 600, color: "#fff", letterSpacing: -0.3 }}>9:41</span>
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <SignalIcon /><WifiIcon /><BatteryIcon />
              </div>
            </>
          )}
        </div>

        {/* ── TOP INFO BAR ── */}
        {!hideNavBar && (
          <div
            className="flex items-center shrink-0 px-4"
            style={{
              height: 56,
              paddingTop: fakeStatusBar ? 0 : "env(safe-area-inset-top, 0px)",
            }}
          >
            <Avatar className="size-9 shrink-0 ring-0 after:hidden">
              <AvatarFallback className="bg-white/[0.15] border border-white/25 text-white text-base font-bold rounded-full">
                S
              </AvatarFallback>
            </Avatar>

            <div className="flex-1" />

            <Button
              variant="ghost"
              size="sm"
              className="rounded-full border border-white/20 bg-white/[0.12] text-white hover:bg-white/20 gap-1.5 h-auto py-1.5 px-3.5"
            >
              <span className="text-base leading-none">🔥</span>
              <span className="text-sm font-bold tracking-tight">3 days</span>
              <span className="text-sm text-white/55 font-light">›</span>
            </Button>

            <div className="flex-1" />

            <span className="text-[17px] font-bold text-white" style={{ letterSpacing: -0.4 }}>HC 280</span>
          </div>
        )}

        {/* ── SCROLLABLE BODY ── */}
        <div
          className="flex-1 overflow-y-auto overflow-x-hidden bg-transparent"
          style={{ paddingBottom: 40, WebkitOverflowScrolling: "touch" } as React.CSSProperties}
        >

          {/* ── CHARACTER HERO CARD ── */}
          <div className="px-4 pt-3 pb-1">
            <div style={{
              borderRadius: 24,
              background: "#ECEAF5",
              overflow: "hidden",
              position: "relative",
              height: 320,
              boxShadow: "0 12px 48px rgba(0,0,0,0.50), 0 0 0 0.5px rgba(255,255,255,0.07)",
            }}>
              {/* Character image — Figma node 123-778, bust crop via overflow:hidden */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/mascot.png"
                alt="Hela mascot"
                style={{
                  position: "absolute",
                  top: 14,
                  left: "50%",
                  transform: "translateX(-50%) scale(1.5)",
                  transformOrigin: "top center",
                  height: "158%",
                  width: "auto",
                  filter: "drop-shadow(0 8px 24px rgba(60,30,120,0.10))",
                  pointerEvents: "none",
                }}
              />

              {/* Bottom badges row */}
              <div style={{
                position: "absolute", bottom: 14, left: 14, right: 14,
                display: "flex", justifyContent: "space-between", alignItems: "center",
              }}>
                <div style={{
                  background: "rgba(255,255,255,0.88)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  borderRadius: 20, padding: "8px 16px",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#1C1C1E", letterSpacing: -0.3 }}>
                    Rank bonus ×1.15
                  </span>
                </div>
                <div style={{
                  background: "#007AFF",
                  borderRadius: 20, padding: "8px 18px",
                  boxShadow: "0 4px 12px rgba(0,122,255,0.35)",
                }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#fff", letterSpacing: -0.3 }}>
                    LVL 01
                  </span>
                </div>
              </div>
            </div>

            {/* Boost button — wrapped in Tooltip, Spinner while pressed */}
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button
                    variant="ghost"
                    size="lg"
                    onPointerDown={() => setBoostPressed(true)}
                    onPointerUp={() => setBoostPressed(false)}
                    onPointerLeave={() => setBoostPressed(false)}
                    className="w-full mt-3 rounded-full border border-white/20 bg-white/[0.12] text-white font-semibold hover:bg-white/20 gap-1.5 h-auto py-2.5"
                    style={{
                      transform: boostPressed ? "scale(0.97)" : "scale(1)",
                      transition: "transform 0.22s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.22s",
                      boxShadow: boostPressed ? "none" : "0 4px 24px rgba(91,29,134,0.45), inset 0 1px 0 rgba(255,255,255,0.12)",
                      letterSpacing: -0.3,
                    } as React.CSSProperties}
                  />
                }
              >
                {boostPressed ? <Spinner className="size-4" /> : <span>⚡</span>}
                <span>Activate 2X Boost</span>
              </TooltipTrigger>
              <TooltipContent>2x more earnings today</TooltipContent>
            </Tooltip>
          </div>

          {/* ── 7-DAY STREAK STRIP ── */}
          <div className="px-4 pt-3">
            <Card className={cn(GLASS, "rounded-2xl")}>
              <CardContent className="py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🔥</span>
                  <span className="text-[14px] font-bold text-white" style={{ letterSpacing: -0.3 }}>3-day streak</span>
                </div>
                {/* Streak days — each rendered as a SortUI Marker */}
                <div className="flex gap-1 items-end">
                  {STREAK_DAYS.map((day, i) => {
                    const filled  = i < STREAK_FILLED
                    const isToday = i === STREAK_FILLED
                    return (
                      <Marker
                        key={i}
                        className="w-7 flex-col items-center gap-1 justify-center"
                      >
                        <MarkerIcon style={{ width: 26, height: 26 }}>
                          <div style={{
                            width: 26, height: 26, borderRadius: 13,
                            background: filled ? "oklch(0.42 0.22 290)" : isToday ? "transparent" : "rgba(255,255,255,0.08)",
                            border: isToday ? "2px solid #FF6B35" : filled ? "none" : "1px solid rgba(255,255,255,0.12)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            boxShadow: filled ? "0 2px 10px rgba(91,29,134,0.60)" : "none",
                            transition: "all 0.3s", flexShrink: 0,
                          }}>
                            {filled && <span style={{ fontSize: 12, color: "#fff", fontWeight: 700, lineHeight: 1 }}>✓</span>}
                          </div>
                        </MarkerIcon>
                        <MarkerContent style={{ fontSize: 9, color: "rgba(255,255,255,0.38)", fontWeight: 500 }}>{day}</MarkerContent>
                      </Marker>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ── CAREER CARD ── */}
          <div className="px-4 pt-3">
            <Card className={cn(GLASS, "rounded-2xl")}>
              <CardHeader className="pt-3.5 pb-1 px-4">
                <CardTitle className="text-[11px] font-bold text-white/45 uppercase tracking-widest">Your Career</CardTitle>
                <CardAction>
                  <span className="text-white/30 text-lg font-light">›</span>
                </CardAction>
              </CardHeader>
              <CardContent className="pt-1 pb-3.5 px-4">
                <div className="flex items-center gap-2.5 mb-2.5">
                  <span className="text-[32px] font-bold text-white" style={{ letterSpacing: -0.8 }}>Runner</span>
                  <Badge
                    variant="outline"
                    className="border-white/20 text-white/55 bg-white/[0.12] rounded-full text-xs font-semibold h-auto py-0.5 px-2.5"
                  >
                    LVL 01
                  </Badge>
                  <span className="text-xl ml-0.5">🏆</span>
                </div>
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-[13px] text-white/40" style={{ letterSpacing: -0.2 }}>Next rank · Regular</span>
                  <span className="text-[13px] font-semibold text-violet-300" style={{ letterSpacing: -0.2 }}>78 / 200 XP</span>
                </div>
                {/* XP bar — SortUI Progress, gradient indicator keeps shimmer ::after */}
                <Progress value={xpValue} className="mb-2">
                  <ProgressTrack className="h-2 bg-white/[0.08] rounded-full border border-white/[0.06]">
                    <ProgressIndicator className="xp-fill rounded-full" />
                  </ProgressTrack>
                </Progress>
                <span className="text-[11px] font-semibold text-green-400" style={{ letterSpacing: -0.1 }}>↑ Top 12% of runners this week</span>
              </CardContent>
            </Card>
          </div>

          {/* ── ACTION BUTTONS — Work / Bet / Play ── */}
          <div className="px-4 pt-3">
            <Card className={cn(GLASS, "rounded-2xl")}>
              <CardContent className="!p-0 grid grid-cols-3">
                {ACTIONS.map((a, i) => (
                  <div key={a.label} className="relative">
                    {i > 0 && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-14 bg-white/10" />
                    )}
                    <button
                      onPointerDown={() => tapAction(i)}
                      className="w-full bg-transparent border-none cursor-pointer py-3 flex flex-col items-center gap-1.5"
                    >
                      <div className="relative">
                        <div
                          className={a.glassClass}
                          style={{
                            width: 56, height: 56, borderRadius: 28,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 26,
                            transform: pressedAction === i ? "scale(0.88)" : "scale(1)",
                            transition: "transform 0.22s cubic-bezier(0.34,1.56,0.64,1)",
                          }}
                        >
                          {a.emoji}
                        </div>
                        <Badge
                          className="absolute border-2 p-0"
                          style={{
                            top: -5, right: -4,
                            background: "#FF3B30", borderRadius: 10,
                            minWidth: a.badge > 9 ? 24 : 20, height: 20,
                            borderColor: "rgba(0,0,0,0.88)",
                            boxShadow: `0 2px 6px ${a.glow}`,
                            animation: "badgePop 0.4s cubic-bezier(0.34,1.56,0.64,1) both",
                            animationDelay: i === 0 ? "0.1s" : i === 1 ? "0.2s" : "0.3s",
                            zIndex: 1,
                          }}
                        >
                          <span style={{ fontSize: 10, fontWeight: 700, color: "#fff" }}>{a.badge}</span>
                        </Badge>
                      </div>
                      <span className="text-[13px] font-semibold text-white" style={{ letterSpacing: -0.2 }}>{a.label}</span>
                      <span className="text-[10px] leading-none" style={{ color: a.statusColor, letterSpacing: -0.1 }}>{a.status}</span>
                    </button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* ── HORIZONTAL PROMO CARDS — SortUI Carousel ── */}
          <div className="px-4 pt-4 pb-1">
            <Carousel opts={{ align: "start", dragFree: true }}>
              <CarouselContent className="-ml-3">

                {/* Invite & Earn */}
                <CarouselItem className="pl-3 basis-auto">
                  <Card className={cn(GLASS, "rounded-2xl w-40 shrink-0 flex flex-col")}>
                    <CardHeader className="pt-4 pb-0 px-4">
                      <CardTitle className="text-[15px] font-bold text-white tracking-tight">Invite &amp; Earn</CardTitle>
                      <CardDescription className="text-[12px] text-white/55 mt-1">Up to HC 1,000</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 pt-2 pb-0 px-4">
                      <AvatarGroup className="[&_[data-slot=avatar]]:ring-[#1E1254]">
                        {(["A","B","C"] as const).map((l, i) => (
                          <Avatar key={l} size="sm">
                            <AvatarFallback className={cn(
                              ["bg-violet-500","bg-orange-500","bg-green-500"][i],
                              "text-white text-[9px] font-bold"
                            )}>{l}</AvatarFallback>
                          </Avatar>
                        ))}
                      </AvatarGroup>
                    </CardContent>
                    <CardFooter className="border-none bg-transparent pt-3 pb-4 px-4">
                      <Button className="w-full bg-white text-[#1E1254] font-bold rounded-full hover:bg-white/90 text-[13px] h-auto py-2">
                        Get started
                      </Button>
                    </CardFooter>
                  </Card>
                </CarouselItem>

                {/* Daily Rewards */}
                <CarouselItem className="pl-3 basis-auto">
                  <Card className={cn(GLASS, "rounded-2xl w-40 shrink-0 flex flex-col")}>
                    <CardHeader className="pt-4 pb-0 px-4">
                      <CardTitle className="text-[15px] font-bold text-white tracking-tight">Daily Rewards</CardTitle>
                      <CardDescription className="text-[12px] text-white/55 mt-1">0/3 claimed</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 pt-2 pb-0 px-4">
                      <div className="flex gap-1.5">
                        {[0,1,2].map(i => (
                          <div
                            key={i}
                            className="size-[18px] rounded-full border-2 border-[#FF6B35] bg-transparent"
                            style={{ animation: i === 0 ? "dotPulse 2s ease-in-out infinite" : undefined }}
                          />
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="border-none bg-transparent pt-3 pb-4 px-4">
                      <Button className="w-full bg-[#FF6B35] text-white font-bold rounded-full hover:bg-[#FF6B35]/80 text-[13px] h-auto py-2">
                        Claim
                      </Button>
                    </CardFooter>
                  </Card>
                </CarouselItem>

                {/* Win Bank */}
                <CarouselItem className="pl-3 basis-auto">
                  <Card
                    className={cn(GLASS, "card-tap rounded-2xl w-40 shrink-0 flex flex-col cursor-pointer relative overflow-hidden")}
                    onClick={e => spawnRipple(e, setWbRipples)}
                  >
                    {wbRipples.map(r => (
                      <span
                        key={r.id}
                        className="absolute rounded-full bg-[rgba(255,107,53,0.20)] pointer-events-none"
                        style={{ left: r.x - 30, top: r.y - 30, width: 60, height: 60, animation: "ripple 0.7s ease-out forwards" }}
                      />
                    ))}
                    <CardHeader className="pt-4 pb-0 px-4">
                      <CardTitle className="shimmer-text text-[15px] font-bold tracking-tight">Win Bank 🏦</CardTitle>
                      <CardDescription className="text-[12px] text-white/55 mt-1">2/5 bets won</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 pt-2 pb-0 px-4">
                      <div className="flex gap-1.5">
                        {[0,1,2,3,4].map(i => (
                          <div
                            key={i}
                            className={cn("size-2.5 rounded-full", i < 2 ? "bg-[#FF6B35]" : "bg-white/15")}
                            style={{
                              animation: i < 2 ? "dotPulse 2s ease-in-out infinite" : undefined,
                              animationDelay: i < 2 ? `${i * 0.3}s` : undefined,
                            }}
                          />
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="border-none bg-transparent pt-3 pb-4 px-4">
                      <Button
                        variant="ghost"
                        className="w-full border border-white/20 bg-white/[0.12] text-white font-bold rounded-full hover:bg-white/20 text-[13px] h-auto py-2"
                      >
                        Spin 🎰
                      </Button>
                    </CardFooter>
                  </Card>
                </CarouselItem>

              </CarouselContent>
            </Carousel>
          </div>

          {/* ── STATS ── */}
          <div className="px-4 pt-3">
            <Card className={cn(GLASS, "rounded-2xl overflow-hidden")}>
              <CardContent className="!p-0 flex">
                {[
                  { num: "3", label: "Days visited", trend: "↑ +1", trendColor: "#34C759" },
                  { num: "0", label: "Sports wins",  trend: "→",    trendColor: "rgba(255,255,255,0.35)" },
                ].map((s, i) => (
                  <div
                    key={s.label}
                    className={cn(
                      "flex-1 py-4 flex flex-col items-center gap-0.5 row-tap cursor-pointer",
                      i > 0 ? "border-l border-white/10" : ""
                    )}
                  >
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-[28px] font-bold text-white" style={{ letterSpacing: -0.6 }}>{s.num}</span>
                      <span className="text-[11px] font-semibold" style={{ color: s.trendColor, letterSpacing: -0.1 }}>{s.trend}</span>
                    </div>
                    <span className="text-[13px] text-white/45" style={{ letterSpacing: -0.1 }}>{s.label}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* ── BALANCE HISTORY ── */}
          <div className="px-4 pt-5 pb-2 flex justify-between items-center">
            <span className="text-[20px] font-bold text-white" style={{ letterSpacing: -0.5 }}>Balance history</span>
            <Button
              variant="ghost"
              size="sm"
              className="text-violet-300 hover:text-violet-200 hover:bg-white/[0.06] text-[14px] font-medium h-auto py-1 px-2"
              style={{ letterSpacing: -0.2 }}
            >
              Load more
            </Button>
          </div>
          <div className="mx-4 mb-1">
            <Card className={cn(GLASS, "rounded-2xl overflow-hidden")}>
              {/* Transactions — SortUI Item rows */}
              {TRANSACTIONS.map((tx, i) => (
                <Item
                  key={i}
                  size="sm"
                  className={cn(
                    "rounded-none row-tap cursor-pointer",
                    i > 0 ? "border-t border-white/[0.08]" : ""
                  )}
                >
                  <ItemMedia className="size-[38px] rounded-[10px] bg-white/10 text-lg">
                    {tx.icon}
                  </ItemMedia>
                  <ItemContent className="gap-0.5">
                    <ItemTitle className="text-[14px] font-semibold text-white" style={{ letterSpacing: -0.3 }}>{tx.title}</ItemTitle>
                    <ItemDescription className="text-[12px] text-white/40" style={{ letterSpacing: -0.1 }}>{tx.sub}</ItemDescription>
                  </ItemContent>
                  <ItemActions>
                    <span className="text-[14px] font-semibold text-green-400 shrink-0" style={{ letterSpacing: -0.3 }}>{tx.amount}</span>
                  </ItemActions>
                </Item>
              ))}
            </Card>
          </div>

          <div className="px-4 pt-2.5 pb-1 text-center">
            <p className="text-[11px] text-white/[0.22]">All earnings are final · Hela v1.0</p>
          </div>
        </div>

        {/* ── PROGRESSIVE BLUR UNDER FAB ── */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          height: 120,
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 55%)",
          maskImage: "linear-gradient(to bottom, transparent 0%, black 55%)",
          pointerEvents: "none",
          zIndex: 8,
        }} />

        {/* ── FLOATING MENU OVERLAY ── */}
        <div
          onClick={() => setMenuOpen(false)}
          style={{
            position: "absolute", inset: 0,
            background: "rgba(10,5,40,0.82)",
            backdropFilter: menuOpen ? "blur(14px)" : "none",
            WebkitBackdropFilter: menuOpen ? "blur(14px)" : "none",
            opacity: menuOpen ? 1 : 0,
            transition: "opacity 0.28s ease",
            pointerEvents: menuOpen ? "all" : "none",
            zIndex: 5,
          }}
        />

        {/* ── VERTICAL FLOATING MENU ── */}
        <div style={{
          position: "absolute", bottom: 0, right: 0,
          display: "flex", flexDirection: "column", alignItems: "flex-end",
          paddingRight: 20,
          paddingBottom: fakeStatusBar ? 32 : "calc(env(safe-area-inset-bottom, 20px) + 20px)" as any,
          gap: 10,
          zIndex: 10,
          pointerEvents: "none",
        }}>
          {/* Menu items — stagger slide in from right */}
          {menuOpen && [
            { label: "Work", icon: WorkIcon, badge: 2,  idx: 1 },
            { label: "Bet",  icon: BetIcon,  badge: 3,  idx: 2 },
            { label: "Play", icon: PlayIcon, badge: 30, idx: 3 },
            { label: "More", icon: MoreIcon, badge: 0,  idx: 4 },
          ].map((tab, i) => (
            <div
              key={tab.label}
              onClick={() => { setActiveTab(tab.idx); setMenuOpen(false) }}
              style={{
                display: "flex", flexDirection: "row", alignItems: "center",
                gap: 12, padding: "10px 14px 10px 16px",
                background: activeTab === tab.idx
                  ? "rgba(255,255,255,0.25)"
                  : "rgba(255,255,255,0.12)",
                backdropFilter: "blur(52px) saturate(180%)",
                WebkitBackdropFilter: "blur(52px) saturate(180%)",
                border: "0.5px solid rgba(255,255,255,0.22)",
                borderRadius: 30, cursor: "pointer", pointerEvents: "all",
                boxShadow: "0 4px 24px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.22)",
                animation: "slideInRight 360ms cubic-bezier(0.34,1.56,0.64,1) both",
                animationDelay: `${i * 55}ms`,
                position: "relative",
              }}
            >
              <span style={{ fontSize: 16, fontWeight: 600, color: "#fff", letterSpacing: -0.3 }}>
                {tab.label}
              </span>
              <div style={{ position: "relative", flexShrink: 0 }}>
                <tab.icon active={activeTab === tab.idx} />
                {tab.badge > 0 && (
                  <div style={{
                    position: "absolute", top: -6, right: -6,
                    background: "#FF3B30", borderRadius: 10,
                    minWidth: tab.badge > 9 ? 22 : 18, height: 18,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    padding: "0 4px", border: "1.5px solid rgba(30,18,84,0.85)",
                    boxShadow: "0 1px 6px rgba(255,59,48,0.55)",
                  }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: "#fff" }}>{tab.badge}</span>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Trigger button */}
          <button
            className="fab-btn menu-trigger"
            onClick={() => setMenuOpen(o => !o)}
            style={{ pointerEvents: "all" }}
          >
            <svg className="fab-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 5v14l11-7z"/>
            </svg>
            <div className="fab-txt-wrapper">
              {"Play".split("").map((l, i) => (
                <span key={i} className="fab-letter">{l}</span>
              ))}
            </div>
          </button>
        </div>

      </div>
    </TooltipProvider>
  )
}

// ── ICONS (all white on dark bg) ──────────────────────────────────────────
function WorkIcon({ active }: { active: boolean }) {
  const c = active ? "#FFFFFF" : "rgba(255,255,255,0.45)"
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="7" width="20" height="14" rx="2.5" stroke={c} strokeWidth="1.8" fill={active ? "rgba(255,255,255,0.15)" : "none"} />
      <path d="M8 7V5C8 3.9 8.9 3 10 3H14C15.1 3 16 3.9 16 5V7" stroke={c} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}
function BetIcon({ active }: { active: boolean }) {
  const c = active ? "#FFFFFF" : "rgba(255,255,255,0.45)"
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke={c} strokeWidth="1.8" fill={active ? "rgba(255,255,255,0.15)" : "none"} />
      <path d="M12 3C12 3 9 7 9 12C9 17 12 21 12 21M12 3C12 3 15 7 15 12C15 17 12 21 12 21" stroke={c} strokeWidth="1.5" />
      <path d="M3.5 9H20.5M3.5 15H20.5" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
function PlayIcon({ active }: { active: boolean }) {
  const c = active ? "#FFFFFF" : "rgba(255,255,255,0.45)"
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="4" width="20" height="16" rx="3" stroke={c} strokeWidth="1.8" fill={active ? "rgba(255,255,255,0.15)" : "none"} />
      <circle cx="8.5" cy="12" r="2" fill={c} />
      <circle cx="15.5" cy="12" r="2" fill={c} />
    </svg>
  )
}
function MoreIcon({ active }: { active: boolean }) {
  const c = active ? "#FFFFFF" : "rgba(255,255,255,0.45)"
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="5"  cy="12" r="2" fill={c} />
      <circle cx="12" cy="12" r="2" fill={c} />
      <circle cx="19" cy="12" r="2" fill={c} />
    </svg>
  )
}
function SignalIcon() {
  return (
    <svg width="17" height="12" viewBox="0 0 17 12" fill="#fff">
      <rect x="0"    y="8" width="3" height="4"  rx="0.6" />
      <rect x="4.5"  y="5" width="3" height="7"  rx="0.6" />
      <rect x="9"    y="2" width="3" height="10" rx="0.6" />
      <rect x="13.5" y="0" width="3" height="12" rx="0.6" />
    </svg>
  )
}
function WifiIcon() {
  return (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
      <path d="M1 4C3.8 1.5 12.2 1.5 15 4"    stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M3.2 6.5C5 4.8 11 4.8 12.8 6.5" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M5.5 9C6.5 8.1 9.5 8.1 10.5 9"  stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="8" cy="11.5" r="1" fill="#fff" />
    </svg>
  )
}
function BatteryIcon() {
  return (
    <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
      <rect x="0.5"  y="0.5" width="21" height="11" rx="3.5" stroke="rgba(255,255,255,0.55)" />
      <rect x="22.5" y="3.5" width="2"  height="5"  rx="1"   fill="rgba(255,255,255,0.55)" />
      <rect x="2"    y="2"   width="17" height="8"  rx="2"   fill="#fff" />
    </svg>
  )
}
