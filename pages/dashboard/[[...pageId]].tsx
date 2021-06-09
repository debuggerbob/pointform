import { useEffect, useState } from "react";
import nookies from "nookies";
import { useRouter } from "next/router";
import { InferGetServerSidePropsType, GetServerSidePropsContext } from "next";
import Head from "next/head";
import Image from "next/image";

import { UAParser } from "ua-parser-js";

// Auth
import { firestore, auth } from "@/lib/firebaseAdmin";
import { findUserNameByCID } from "@/lib/db";
import { useAuth } from "@/context/AuthContext";

/* Main Components */
import { Home } from "@/dashboard/home";
import { Responses } from "@/components/dashboard/responses";
import { Create } from "@/components/form-builder";
import { Settings } from "@/components/dashboard/settings";

/* Common Components */
import { Header } from "@/dashboard/common/Header";
import { Sidebar } from "@/components/dashboard/common/sidebar";

/* Styles */
import styles from "@/styles/dashboard/index.module.scss";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    try {
        const cookies = nookies.get(ctx);
        const token = await auth.verifyIdToken(cookies.token);
        const { uid, email } = token;

        const username = await auth
            .getUser(uid)
            .then((record) => record.displayName);

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

export default function Dashboard(
    user: InferGetServerSidePropsType<typeof getServerSideProps>
) {
    const { pageId } = useRouter().query;
    const userAgent = new UAParser().getDevice().type;
    const [sentEmails, setSentEmails] = useState(0);
    const [message, setMessage] = useState(null);
    const [verificationPending, setVerificationPending] = useState(true);
    const { currentUser } = useAuth();

    useEffect(() => {
        if (!currentUser?.emailVerified && sentEmails < 4) {
            // uncomment this when u want to get the mail
            // currentUser.sendEmailVerification().then(() => setSentEmails(sentEmails+1)).catch(error => setMessage(error))
        } else {
            // set this to true while designing
            setVerificationPending(false);
        }
    }, [currentUser]);

    /* Nested Ternary Operator to check the current active page. */
    let currentActivePage =
        pageId === undefined
            ? "Dashboard"
            : pageId[0] === "responses"
            ? "Responses"
            : pageId[0] === "create"
            ? "Create"
            : "Settings";

    return (
        <>
            <Head>
                <title>Pointform - {currentActivePage}</title>
            </Head>
            {currentActivePage != "Create" ? (
                <>
                    {/* Email Verification */}
                    {/* {verificationPending ? (
                        <div className="flex justify-center h-20 md:h-10 lg:h-10 py-6 px-4 w-full items-center bg-gradient-to-r from-indigo-300 via-indigo-600 to-indigo-900 text-white">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="24px"
                                viewBox="0 0 24 24"
                                width="24px"
                                fill="#ffffff"
                            >
                                <path d="M0 0h24v24H0V0z" fill="none" />
                                <path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                            </svg>
                            <p className="text-base ml-2">
                                Please check your email inbox to verify your
                                account.
                            </p>
                        </div>
                    ) : (
                        <></>
                    )} */}

                    {/* <Header styles={styles} creator={user.data} /> */}

                    <main className={styles.main}>
                        <Sidebar />
                        <div className={styles.content}>
                            {currentActivePage === "Dashboard" ? (
                                <Home creatorData={user.data} />
                            ) : currentActivePage === "Settings" ? (
                                <Settings creatorData={user.data} />
                            ) : (
                                <Responses creatorData={user.data} />
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
