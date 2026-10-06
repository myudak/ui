import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Type-check only the app; db/ and worker/ target the Cloudflare runtime.
  typescript: { tsconfigPath: "tsconfig.app.json" },
};

export default nextConfig;
