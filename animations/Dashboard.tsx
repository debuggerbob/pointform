import gsap from "gsap";

// Toggle Arrow
// --------------------------
export const toggleArrow = (node1: string, angle: number) => {
	return gsap.to(node1, {
		duration: 0.35,
		rotate: angle,
		ease: "power1",
	});
};

// Toggle Menu
// --------------------------
export const toggle_menu = (node1: string, height: number, opacity: number) => {
	return gsap.to(node1, {
		duration: 0.35,
		height: height,
		opacity: opacity,
		ease: "power3.inOut",
	});
};
