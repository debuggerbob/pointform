import gsap from "gsap";

// Change Nav Display
// --------------------------
export const nav_height = (
	node1: string,
	height_prop: string,
	opacity: number
) => {
	return gsap.to(`.${node1}`, {
		duration: 0.5,
		css: {
			opacity: opacity,
			height: height_prop,
		},
	});
};

// Change Background Color
// --------------------------
export const change_bg = (node1: string, bg_color: string) => {
	return gsap.to(`.${node1}`, {
		duration: 0.35,
		ease: "power3.inOut",
		css: {
			backgroundColor: bg_color,
		},
	});
};

// Change Color
// --------------------------
export const change_color = (node1: string, color: string) => {
	return gsap.to(`.${node1}`, {
		duration: 0.35,
		ease: "power3.inOut",
		css: {
			color: color,
		},
	});
};

// Fade In Right
// --------------------------
export const fade_in_right = (
	node1: string,
	translate_x?: number,
	stagger_amt?: number
) => {
	return gsap.to(`.${node1}`, {
		duration: 0.5,
		ease: "power3.inOut",
		opacity: 1,
		translateX: translate_x,
		stagger: {
			amount: stagger_amt,
		},
	});
};

// Fade Out Right
// --------------------------
export const fade_out_right = (
	node1: string,
	translate_x?: number,
	stagger_amt?: number
) => {
	return gsap.to(`.${node1}`, {
		duration: 0.5,
		ease: "power3.inOut",
		opacity: 0,
		translateX: translate_x,
		stagger: {
			amount: stagger_amt,
		},
	});
};

// Toggle Button
// --------------------------
export const toggle_btn_animation = (node1: string, rotation: number) => {
	return gsap.to(node1, {
		duration: 0.25,
		rotate: rotation,
		ease: "power0",
	});
};

// Moving Background
// --------------------------
export const moving_bg_animation = (
	node1: string,
	translate_x_from: string,
	translate_x_to: string,
	duration: number
) => {
	return gsap.fromTo(
		`.${node1}`,
		{ translateX: translate_x_from },
		{ translateX: translate_x_to, duration: duration }
	);
};
