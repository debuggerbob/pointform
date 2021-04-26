import React from "react";
import nookies from "nookies";
import { useRouter } from "next/router";
import { InferGetServerSidePropsType, GetServerSidePropsContext } from "next";
import Head from "next/head";

import { UAParser } from "ua-parser-js";

// Auth
import { firestore, auth } from "@/lib/firebaseAdmin";
import { findUserNameByCID } from "@/lib/db";

/* Main Components */
import { Home } from "@/dashboard/home";
import { Quizzes } from "@/components/dashboard/quizzes/";
import { Create } from "@/components/dashboard/create/";

/* Common Components */
import { Header } from "@/dashboard/common/Header";
import { Sidebar } from "@/dashboard/common/Sidebar";

/* Styles */
import styles from "@/styles/dashboard/index.module.scss";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    try {
        const cookies = nookies.get(ctx);
        const token = await auth.verifyIdToken(cookies.token);
        const { uid, email } = token;

        let username = "User";
        username = await findUserNameByCID(uid);

        return {
            props: {
                data: {
                    uid: uid,
                    email: email,
                    name: username,
                },
            },
        };
    } catch (err) {
        return {
            redirect: {
                permanent: false,
                destination: "/login",
            },
            props: {} as never,
        };
    }
};

export default function AuthenticatedPage(
    user: InferGetServerSidePropsType<typeof getServerSideProps>
) {
    const { pageId } = useRouter().query;
    const userAgent = new UAParser().getDevice().type;

    /* Nested Ternary Operator to check the current active page. */
    let currentActivePage =
        pageId === undefined
            ? "Dashboard"
            : pageId[0] === "quizzes"
            ? "Quiz"
            : "Create";

    return (
        <>
            {/* Set the title of the page according to the active page. */}
            <Head>
                <title>Pointform - {currentActivePage}</title>
            </Head>
            {currentActivePage != "Create" ? (
                <>
                    <Header styles={styles} creator={user.data} />

                    <main className={styles.main}>
                        <Sidebar
                            styles={styles}
                            currentActivePage={currentActivePage}
                        />
                        <div className={styles.content}>
                            {currentActivePage === "Dashboard" ? (
                                <Home creatorData={user.data} />
                            ) : (
                                <Quizzes creatorData={user.data} />
                            )}
                        </div>
                    </main>
                </>
            ) : (
                <Create creatorData={user.data} userAgent={userAgent} />
            )}
        </>
    );
}
