import type { Plugin } from "vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

function unlistedBackOfficeDeck(): Plugin {
  const rewrite = (
    req: { url?: string },
    _res: unknown,
    next: () => void,
  ) => {
    if (!req.url) {
      next();
      return;
    }
    const [path, query] = req.url.split("?");
    if (path === "/lp/back-office/deck" || path === "/lp/back-office/deck/") {
      req.url = "/lp/back-office/deck.html" + (query ? `?${query}` : "");
    }
    next();
  };

  return {
    name: "unlisted-backoffice-deck",
    configureServer(server) {
      server.middlewares.use(rewrite);
    },
    configurePreviewServer(server) {
      server.middlewares.use(rewrite);
    },
  };
}

export default defineConfig({
  plugins: [react(), unlistedBackOfficeDeck()],
  server: {
    host: true,
    port: 5174,
    strictPort: true,
  },
  preview: {
    host: true,
    port: Number(process.env.PORT) || 4173,
    allowedHosts: true,
  },
});
