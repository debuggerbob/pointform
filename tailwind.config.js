const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
	purge: [],
	darkMode: false, // or 'media' or 'class'
	theme: {
		fontFamily: {
			body: ["Pontano Sans"],
		},

		screens: {
			xs: "480px",
			...defaultTheme.screens,
		},

		extend: {
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
		extend: {},
	},
	plugins: [],
};
