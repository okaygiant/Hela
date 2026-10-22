import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Hela",
    short_name: "Hela",
    start_url: "/tg",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [],
  }
}
