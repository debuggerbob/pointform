import { useRef, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import gsap from "gsap";

import { Header } from "@/components/header/";
import { SocialLinks } from "@/components/socialLinks";
import { BannerPhone } from "@/components/BannerPhone";

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

            <main className="h-full flex flex-col justify-between flex-wrap lg:flex-nowrap md:flex-nowrap md:h-screen">
                <section className="flex flex-wrap justify-between mx-auto mb-0 p-10 max-w-screen-xl lg:mt-16 lg:p-16 lg:pb-0 lg:flex-nowrap md:flex-nowrap md:mt-16">
                    <div className="mb-12 lg:mb-0 md:mb-0 lg:w-3/5 md:w-3/5 lg:px-12 md:px-8">
                        <span className="block leading-normal text-4xl lg:text-6xl md:text-5xl font-semibold">
                            Make interactive,
                        </span>
                        <span className="block leading-normal text-4xl lg:text-6xl lg:leading-relaxed md:leading-relaxed md:text-5xl font-semibold">
                            Custom tailored
                        </span>
                        <span className="block leading-normal lg:leading-relaxed md:leading-relaxed">
                            <span className="text-4xl mr-2 text-indigo-600 font-semibold lg:text-6xl md:text-5xl ">
                                forms
                            </span>
                            <span className="text-4xl lg:text-6xl md:text-5xl font-light">and</span>
                            <span className="text-4xl ml-2 text-indigo-600 font-semibold lg:text-6xl md:text-5xl">
                                surveys
                            </span>
                        </span>

                        <p className="mt-6 mb-12 lg:w-4/5 md:w-4/5 text-base lg:text-xl md:text-xl leading-8 lg:leading-loose md:leading-loose font-normal text-gray-500">
                            Convert your boring list of questions into
                            people-friendly forms and get more answers while
                            delighting your audience in the process.
                        </p>

                        <div className="flex items-center">
                            <Link href="/login">
                                <a className="px-6 py-4 lg:py-6 lg:px-12 bg-gray-900 text-white rounded-md">
                                    <span>Get Started</span>
                                </a>
                            </Link>
                            <span className="pl-4 text-base lg:text-xl text-gray-500">
                                - It's free
                            </span>
                        </div>
                    </div>

                    <div className="mt-10 lg:p-8 lg:w-2/5 md:mt-4 md:w-2/5 md:p-8" ref={bannerPhone}>
                        <BannerPhone />
                    </div>
                </section>

                <SocialLinks />
            </main>
        </>
    );
}
