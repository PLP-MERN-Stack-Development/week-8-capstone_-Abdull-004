// postcss.config.js (New/Correct)

export default {
    plugins: {
        '@tailwindcss/postcss': {}, // <-- Change to this
        // autoprefixer is no longer needed with modern Tailwind CSS
    },
}
