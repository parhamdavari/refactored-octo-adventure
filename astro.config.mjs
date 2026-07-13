import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://payesh.bot/",
  i18n: {
    defaultLocale: "en",
    locales: ["en", "fa"],
    routing: {
      prefixDefaultLocale: false, // en → /, fa → /fa/
    },
  },
  integrations: [tailwind(), icon()],
});
