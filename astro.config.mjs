import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://payesh.bot/",
  integrations: [tailwind(), icon()],
});
