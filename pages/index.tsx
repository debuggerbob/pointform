import { useRef, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import gsap from "gsap";

import { Header } from "@/components/header/";
import { SocialLinks } from "@/components/socialLinks";
import { BannerPhone } from "@/components/BannerPhone";
import styles from "@/styles/homepage/index.module.scss";

export default function Index({ isConnected }) {
    const bannerPhone = useRef();

    useEffect(() => {
        const tl = gsap.timeline();
        tl.to(bannerPhone.current, {
            duration: 1.1,
            opacity: 1,
            ease: "power2",
        });
        tl.to(
            bannerPhone.current,
            {
                duration: 1.3,
                translateY: "-50px",
                ease: "power3",
            },
            "-=0.9"
        );
    }, []);
    return (
        <>
            <Head>
                <title>
                    Pointform — Build beautiful custom tailored forms and
                    surveys
                </title>
            </Head>

            <Header />

            <main className={styles.main}>
                <section className={styles.section1}>
                    <div className={styles.col1}>
                        <h2 className={styles.col1__tagline}>
                            Make interactive,
                            <span className={styles.bottom_text}>
                                Custom tailored
                            </span>
                            <span className={styles.bottom_text}>
                                <span className={styles.highlight_text}>
                                    forms
                                </span>{" "}
                                <span className={styles.gray_text}>and</span>{" "}
                                <span className={styles.highlight_text}>
                                    surveys
                                </span>
                            </span>
                            {/* <span className={styles.bottom_text}></span> */}
                        </h2>

                        <p className={styles.col1__desc}>
                            Convert your boring list of questions into
                            people-friendly forms and get more answers while
                            delighting your audience in the process.
                        </p>

                        <div className={styles.col1__cta_wrapper}>
                            <Link href="/login">
                                <a className={styles.cta}>
                                    <span>Get Started</span>
                                </a>
                            </Link>
                            <span className={styles.addon_text}>
                                - It's free
                            </span>
                        </div>
                    </div>

                    <div className={styles.col2} ref={bannerPhone}>
                        <BannerPhone customClass={styles.col2__svg} />
                    </div>
                </section>

                {/* If you want to make any changes to this component do it in 
				it's own component located at "components/socialLinks" */}
                <SocialLinks />
            </main>
        </>
    );
}
