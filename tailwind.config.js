/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [{
      mytheme: {
        "primary": "#111827",
        "secondary": "#86efac",
        "accent": "#111827",
        "neutral": "#111827",
        "base-100": "#001919",
      },
    }]

  }
}

