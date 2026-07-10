const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter Variable", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        accent: {
          turquoise: "#00d4aa",
          purple: "#7c3aed",
          ocean: "#0a1628",
        },
      },
      textColor: {
        default: "var(--color-text)",
        offset: "var(--color-text-offset)",
      },
      backgroundColor: {
        default: "var(--color-background)",
        offset: "var(--color-background-offset)",
      },
      borderColor: {
        default: "var(--color-border)",
      },
      backgroundImage: {
        "payesh-gradient":
          "linear-gradient(135deg, #00d4aa 0%, #7c3aed 50%, #a855f7 100%)",
        "payesh-glow":
          "radial-gradient(ellipse at center, rgba(0, 212, 170, 0.15) 0%, transparent 70%)",
      },
    },
  },
  corePlugins: {
    fontSize: false,
  },
  plugins: [require("tailwindcss-fluid-type")],
};
