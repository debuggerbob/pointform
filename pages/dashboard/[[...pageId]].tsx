import nookies from 'nookies'
import { useRouter } from 'next/router'
import { InferGetServerSidePropsType, GetServerSidePropsContext } from 'next'
import { UAParser } from 'ua-parser-js'
import Head from 'next/head'

// Auth
import { auth } from '@/lib/firebaseAdmin'
import { useAuth } from '@/context/AuthContext'

/* Main Components */
import { Home } from '@/components/dashboard/home'
import { Responses } from '@/components/dashboard/responses'
import { Create } from '@/components/form-builder'
import { Settings } from '@/components/dashboard/settings'

/* Common Components */
import { Sidebar } from '@/components/dashboard/sidebar'

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

                        <section className="main_content_wrapper">
                            {currentActivePage === 'Dashboard' ? (
                                <Home creatorData={user.data} />
                            ) : currentActivePage === 'Settings' ? (
                                <Settings creatorData={user.data} />
                            ) : (
                                <Responses creatorData={user.data} />
                            )}
                        </section>
                    </main>
                </>
            ) : (
                <Create creatorData={user.data} userAgent={userAgent} />
            )}

            <style jsx>
                {`
                    @media (min-width: 768px) {
                        .main_content_wrapper {
                            padding: 3.5rem 3.5rem 3.5rem calc(250px + 3.5rem);
                            flex: 1 1 0%;
                        }
                    }
                `}
            </style>
        </>
    )
}
