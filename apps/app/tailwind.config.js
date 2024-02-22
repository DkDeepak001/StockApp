const nativewind = require("nativewind/tailwind/native")

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  plugins: [nativewind()],
}
