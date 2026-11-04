"use client"

import { useEffect, useRef } from "react"

/**
 * Фоновое видео на весь родитель: без звука, по кругу, без плеера.
 * Пока видео грузится, виден постер. При включённом «уменьшении движения» в системе стоит на постере.
 * Родитель должен быть position: relative (или absolute), видео заполняет его целиком.
 */
export function BackgroundVideo({ src, poster }: { src: string; poster: string }) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) ref.current?.pause()
  }, [])

  return (
    <video
      ref={ref}
      aria-hidden
      className="absolute inset-0 size-full object-cover"
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      disablePictureInPicture
      tabIndex={-1}
    />
  )
}
