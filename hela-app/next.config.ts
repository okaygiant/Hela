import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Туннель для проверки в Telegram: без этого dev-сервер блокирует запросы с чужого домена (hot reload и т.п.)
  allowedDevOrigins: ["*.trycloudflare.com"],
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
