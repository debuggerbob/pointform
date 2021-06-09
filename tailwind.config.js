const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
    purge: [],
    darkMode: false, // or 'media' or 'class'
    theme: {
        colors: {
            transparent: "transparent",
            current: "currentColor",
            gray: colors.trueGray,
            red: colors.red,
            blue: colors.lightBlue,
            indigo: colors.indigo,
        },

        minWidth: {
            0: "0",
            "1/4": "25%",
            "1/2": "50%",
            "3/4": "75%",
            full: "100%",
            250: "250px",
        },

        screens: {
            xs: "480px",
            ...defaultTheme.screens,
        },

        extend: {
            animation: {
                bounce: "bounce 1.5s infinite",
            },

            inset: {
                "-0.5": "-2px",
                "-9px": "-9px",
            },

            padding: {
                percent5: "5%",
                px70: "70px",
            },

            spacing: {
                xsm: "1px",
                200: "200px",
                150: "150px",
            },

            maxWidth: {
                400: "400px",
                540: "540px",
                680: "680px",
                900: "900px",
            },

            height: {
                px70: "70px",
                38: "150px",
            },
        },
    },
    variants: {
        extend: {
            margin: ["first"],
            borderWidth: ["last"],
        },
    },
    plugins: [],
};
