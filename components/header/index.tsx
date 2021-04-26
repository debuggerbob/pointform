import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

import * as ani from "../../animations/Header";
import styles from "./header.module.scss";
import { Nav } from "./Nav";

export const Header: React.FC = () => {
    const [state, setState] = useState({
        initial: false,
        clicked: null,
    });

    const handleClick = () => {
        if (state.initial === false) {
            setState({
                initial: null,
                clicked: true,
            });
        } else if (state.clicked === true) {
            setState({
                initial: null,
                clicked: !state.clicked,
            });
        } else if (state.clicked === false) {
            setState({
                initial: null,
                clicked: !state.clicked,
            });
        }
    };

    useEffect(() => {
        let height = window.innerHeight - 79.6;

        // Set moving_background styles on page load.
        gsap.set(`.${styles.move_background}`, {
            ease: "power3.easeInOut",
            translateX: "-200%",
            skewX: 44,
            display: "block",
            transformStyle: "preserve-3d",
        });

        // Set animation to elements depending on button Click.
        if (state.clicked === false) {
            document.body.classList.remove(styles.locked);
            let tl1: GSAPTimeline = gsap.timeline();

            ani.toggle_btn_animation(".toggle_bar1", 0);
            ani.toggle_btn_animation(".toggle_bar2", 0);

            ani.nav_height(styles.nav, "0", 0);

            tl1.add(
                ani.moving_bg_animation(
                    styles.move_background,
                    "120%",
                    "-200%",
                    1.8
                )
            );

            tl1.add(
                ani.fade_out_right(styles.nav__links__link, -20, 0.2),
                "-=1.6"
            );

            tl1.add(ani.change_bg(styles.toggler_bar, "#262727"), "-=1.53");

            tl1.add(ani.change_bg(styles.header, "#ffffff"), "-=1.5");

            tl1.add(
                ani.change_color(styles.header__wrapper__brandname, "#262627"),
                "-=1.2"
            );
            //
        } else if (state.clicked === true) {
            //
            document.body.classList.add(styles.locked);

            let tl2: GSAPTimeline = gsap.timeline();

            ani.toggle_btn_animation(".toggle_bar1", -45);
            ani.toggle_btn_animation(".toggle_bar2", 45);

            ani.nav_height(styles.nav, `${height}px`, 1);

            tl2.add(
                ani.moving_bg_animation(
                    styles.move_background,
                    "-200%",
                    "120%",
                    1.8
                )
            );

            tl2.add(ani.change_bg(styles.header, "#191818"), "-=1.4");

            tl2.add(
                ani.change_color(styles.header__wrapper__brandname, "#ffffff"),
                "-=1.2"
            );
            tl2.add(
                ani.fade_in_right(styles.nav__links__link, 0, 0.2),
                "-=1.15"
            );

            tl2.add(ani.change_bg(styles.toggler_bar, "#ffffff"), "-=0.8");
        }
    }, [state]);

    return (
        <header className={styles.header}>
            <div className={styles.wrapper}>
                <div className={styles.move_background}></div>

                <div className={styles.header__wrapper}>
                    <h1 className={styles.header__wrapper__brandname}>
                        <Link href="/">
                            <a
                                aria-label="Go to pointform.in"
                                title="Go to pointform.in"
                            >
                                Pointform
                            </a>
                        </Link>
                    </h1>

                    <div className={styles.nav__toggler}>
                        <button
                            className={styles.nav__toggler__btn}
                            onClick={handleClick}
                        >
                            <span
                                className={`${styles.toggler_bar} toggle_bar1`}
                            ></span>
                            <span
                                className={`${styles.toggler_bar} toggle_bar2`}
                            ></span>
                        </button>
                    </div>
                </div>

                <Nav />
            </div>
        </header>
    );
};
