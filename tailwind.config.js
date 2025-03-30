module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        "page-bg": "#ffffff",
        "text-primary": "#333",
        "text-secondary": "#666",
        "border-color": "#ccc",
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "Times New Roman", "serif"],
      },
    },
  },
  // other config options
};
