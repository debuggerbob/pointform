import { useEffect, useState } from 'react'
import nookies from 'nookies'
import { useRouter } from 'next/router'
import { InferGetServerSidePropsType, GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import Image from 'next/image'

import { UAParser } from 'ua-parser-js'

// Auth
import { firestore, auth } from '@/lib/firebaseAdmin'
import { findUserNameByCID } from '@/lib/db'
import { useAuth } from '@/context/AuthContext'

/* Main Components */
import { Home } from '@/components/dashboard/home'
import { Responses } from '@/components/dashboard/responses'
import { Create } from '@/components/form-builder'
import { Settings } from '@/components/dashboard/settings'

/* Common Components */
import { Sidebar } from '@/components/dashboard/common/sidebar'

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    try {
        const cookies = nookies.get(ctx)
        const token = await auth.verifyIdToken(cookies.token)
        const { uid, email } = token

        const username = await auth
            .getUser(uid)
            .then((record) => record.displayName)

        return {
            props: {
                data: {
                    uid: uid,
                    email: email,
                    name: username,
                },
            },
        }
    } catch (err) {
        return {
            redirect: {
                permanent: false,
                destination: '/login',
            },
            props: {} as never,
        }
    }
}

export default function Dashboard(
    user: InferGetServerSidePropsType<typeof getServerSideProps>
) {
    const { pageId } = useRouter().query
    const userAgent = new UAParser().getDevice().type
    const { currentUser } = useAuth()

    /* Nested Ternary Operator to check the current active page. */
    let currentActivePage =
        pageId === undefined
            ? 'Dashboard'
            : pageId[0] === 'responses'
            ? 'Responses'
            : pageId[0] === 'create'
            ? 'Create'
            : 'Settings'

    return (
        <>
            <Head>
                <title>Pointform - {currentActivePage}</title>
            </Head>
            {currentActivePage != 'Create' ? (
                <>
                    <main className="md:flex">
                        <Sidebar creatorName={user.data.name} />

                        <div className="main_content_wrapper overflow-auto md:h-screen md:ml-auto">
                            {currentActivePage === 'Dashboard' ? (
                                <Home creatorData={user.data} />
                            ) : currentActivePage === 'Settings' ? (
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

            <style jsx>
                {`
                    @media (min-width: 768px) {
                        .main_content_wrapper {
                            width: calc(100vw - 250px);
                        }
                    }
                `}
            </style>
        </>
    )
}
