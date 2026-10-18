/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          top: "#181727",
          mid: "#1A1B2F",
          bottom: "#1B1C30",
          900: "#181727",
          800: "#1A1B2F",
          700: "#202138",
        },
        wave: {
          steel: "#314F81",
          blue: "#354F82",
          royal: "#146FE8",
          electric: "#1684FF",
          cyan: "#19C6E8",
        },
        surface: {
          card: "rgba(36, 38, 62, 0.72)",
          pill: "#333446",
          ice: "#F5F9FF",
          blueWhite: "#EAF3FF",
        },
        brand: {
          indigo: "#4E34C8",
          violet: "#6548E8",
          violetHover: "#5538D4",
          periwinkle: "#8B7FF5",
          iceBlue: "#93C5FD",
          cyan: "#19C6E8",
          ink: "#FFFFFF",
          inkDark: "#181727",
          slate: "#E2E8F0",
          muted: "#94A3B8",
          canvas: "transparent",
          card: "rgba(36, 38, 62, 0.72)",
          surface: "rgba(40, 43, 72, 0.72)",
          hover: "rgba(25, 198, 232, 0.12)",
          border: "rgba(255, 255, 255, 0.14)",
          borderIce: "rgba(255, 255, 255, 0.22)",
          borderCyan: "rgba(25, 198, 232, 0.45)",
          pill: "#333446",

          // Backwards-compatible aliases for existing components
          "violet-hover": "#5538D4",
          "violet-light": "#8B7FF5",
          "violet-soft": "rgba(101, 72, 232, 0.18)",
          bg: "#181727",
          "bg-soft": "rgba(36, 38, 62, 0.72)",
          "bg-tint": "rgba(40, 43, 72, 0.72)",
          heading: "#FFFFFF",
          body: "#CBD5E1",
          link: "#19C6E8",
          success: "#10B981",
          warning: "#F59E0B",
          danger: "#EF4444",
        },
      },
      fontFamily: {
        serif: ["'Source Serif 4'", "Georgia", "'Times New Roman'", "serif"],
        sans: ["'Inter'", "'Roboto'", "Arial", "Helvetica", "sans-serif"],
        hero: ["'Manrope'", "'Inter'", "Arial", "sans-serif"],
      },
      backgroundImage: {
        "logo-gradient":
          "linear-gradient(90deg, #4E34C8 0%, #6548E8 48%, #19C6E8 100%)",
        "logo-ink-mesh":
          "radial-gradient(at 85% 15%, rgba(25, 198, 232, 0.22) 0px, transparent 50%), radial-gradient(at 15% 85%, rgba(101, 72, 232, 0.28) 0px, transparent 55%), linear-gradient(135deg, #181727 0%, #1A1B2F 60%, #1B1C30 100%)",
        "midnight-ambient":
          "radial-gradient(ellipse 80% 50% at 50% 45%, rgba(53, 79, 130, 0.42) 0%, rgba(25, 198, 232, 0.14) 45%, transparent 75%), radial-gradient(circle at 18% 30%, rgba(101, 72, 232, 0.20) 0%, transparent 45%), radial-gradient(circle at 85% 55%, rgba(25, 198, 232, 0.22) 0%, transparent 50%), radial-gradient(circle at 50% 15%, rgba(255, 255, 255, 0.07) 0%, transparent 40%), linear-gradient(180deg, #181727 0%, #1A1B2F 52%, #1B1C30 100%)",
        "brand-gradient": "linear-gradient(90deg, #4E34C8 0%, #6548E8 48%, #19C6E8 100%)",
        "brand-gradient-button": "linear-gradient(135deg, #6548E8 0%, #4E34C8 100%)",
      },
      boxShadow: {
        "brand-card":
          "0 14px 32px rgba(25, 198, 232, 0.10), 0 0 0 1px rgba(101, 72, 232, 0.14)",
        "brand-hover":
          "0 14px 32px rgba(25, 198, 232, 0.16), 0 0 0 1px rgba(25, 198, 232, 0.55)",
        subtle: "0 2px 10px rgba(0, 0, 0, 0.2), 0 1px 3px rgba(0, 0, 0, 0.3)",
        card: "0 14px 32px rgba(25, 198, 232, 0.10), 0 0 0 1px rgba(101, 72, 232, 0.14)",
        "card-hover":
          "0 14px 32px rgba(25, 198, 232, 0.16), 0 0 0 1px rgba(25, 198, 232, 0.55)",
        dropdown: "0 12px 36px rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [],
};
