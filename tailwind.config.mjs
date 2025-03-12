/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    // "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    // "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      boxShadow: {
        'tr-border': '0px 0px 0px 1px rgba(000, 0, 0, 0.1)',
        'nav-Shadow': '4px 0px 10px 0.1px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
};
