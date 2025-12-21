module.exports = {
  plugins: {
    tailwindcss: process.env.VITE ? './tailwind-vite.config.js' : {},
    autoprefixer: {},
  },
};
