import starlightPlugin from "@astrojs/starlight-tailwind";

// Customized colors from the Starlight theme color generator.
// accent is a teal color, and gray is a gray/purple color.
const accent = {
  200: "#5eead4",
  600: "#0d9488",
  900: "#134e4a",
  950: "#042f2e",
};
const gray = {
  100: "#f6f6f9",
  200: "#eeedf3",
  300: "#c2c1c8",
  400: "#8c8997",
  500: "#585663",
  700: "#383642",
  800: "#272530",
  900: "#18171d",
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: { accent, gray },
      fontFamily: {
        "roboto-mono": ["Roboto Mono", "monospace"],
        sovngarde: ["Sovngarde"],
      },
    },
  },
  plugins: [starlightPlugin()],
};
