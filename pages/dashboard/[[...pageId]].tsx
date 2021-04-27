import { useEffect, useState } from 'react'
import nookies from "nookies";
import { useRouter } from "next/router";
import { InferGetServerSidePropsType, GetServerSidePropsContext } from "next";
import Head from "next/head";
import Image from 'next/image'

import { UAParser } from "ua-parser-js";

// Auth
import { firestore, auth } from "@/lib/firebaseAdmin";
import { findUserNameByCID } from "@/lib/db";
import { useAuth } from '@/context/AuthContext'

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
        console.log(err)
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
    const [sentEmails, setSentEmails] = useState(0)
    const [message, setMessage] = useState(null)
    const [verificationPending, setVerificationPending] = useState(true)
    const { currentUser } = useAuth()


    useEffect(() => {
        if(!currentUser.emailVerified && sentEmails < 4) {
            // uncomment this when u are ready to get the mail
            // currentUser.sendEmailVerification().then(() => setSentEmails(sentEmails+1)).catch(error => setMessage(error))
        } else {
            // set this to true while designing
            setVerificationPending(false)
        }
    }, [currentUser])

    /* Nested Ternary Operator to check the current active page. */
    let currentActivePage =
        pageId === undefined
            ? "Dashboard"
            : pageId[0] === "quizzes"
            ? "Quiz"
            : "Create";

    return (
        <>
            <Head>
                <title>Pointform - {currentActivePage}</title>
            </Head>
            {currentActivePage != "Create" ? (
                <>
                    <Header styles={styles} creator={user.data} />

                    <main className={`${styles.main} ${ verificationPending ? "filter blur-sm" : ""}`}>
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
            {
            verificationPending ? (
            <div className="absolute top-0 left-0 flex justify-center h-screen w-screen items-center bg-blend-darken">
                <div className="bg-gray-50 flex flex-col w-11/12 sm:w-5/6 lg:w-1/2 max-w-2xl mx-auto rounded-lg text-left shadow p-8">
                    <h2 className="text-2xl text-gray-800">
                        Please Verify your email
                    </h2>
                    <div className="my-8 text-center">
                        <Image className="" src="/images/verification.svg" alt="Verification Pending" width="320px" height="auto" />
                    </div>
                    <p className="text-xl">Sorry to keep you waiting, please check your email to verify your account.</p>
                </div>
            </div>
            ) : <></>
            }
        </>
    );
}
