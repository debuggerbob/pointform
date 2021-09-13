import nookies from 'nookies'
import { useRouter } from 'next/router'
import { InferGetServerSidePropsType, GetServerSidePropsContext } from 'next'
import { UAParser } from 'ua-parser-js'
import Head from 'next/head'
import useSWR from 'swr'

// Auth
import { auth } from '@/firebase/firebaseAdmin'
import { useAuth } from '@/context/AuthContext'

/* Main Components */
import { Home } from '@/components/dashboard/home'
import { Responses } from '@/components/dashboard/responses'
import { Create } from '@/components/form-builder'
import { Settings } from '@/components/dashboard/settings'

/* Common Components */
import { Sidebar } from '@/components/dashboard/sidebar'
import { baseApiUrl } from '@/lib/config'
import { handle400 } from '@/lib/handler'

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    try {
        const cookies = nookies.get(ctx)
        const token = await auth.verifyIdToken(cookies.token)
        const { uid, email } = token

        const username = await auth
            .getUser(uid)
            .then((record) => record.displayName) ?? email.split("@")[0]

        const formData = await fetch(`${baseApiUrl}/forms/${uid}`, {
            method: 'GET'
        }).then(res => res.json()).catch(err => handle400(err))

        return {
            props: {
                data: {
                    formsData: {
                        forms: formData
                    },
                    userData: {
                        uid: uid,
                        email: email,
                        name: username
                    }
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
    commonData: InferGetServerSidePropsType<typeof getServerSideProps>
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
                        <Sidebar creatorName={commonData.data.userData.name} />

                        <section className="main_content_wrapper">
                            {currentActivePage === 'Dashboard' ? (
                                <Home creatorData={commonData.data.userData} formsData={commonData.data.formsData} />
                            ) : currentActivePage === 'Settings' ? (
                                <Settings creatorData={commonData.data.userData} />
                            ) : (
                                <Responses creatorData={commonData.data.userData} />
                            )}
                        </section>
                    </main>
                </>
            ) : (
                <Create creatorData={commonData.data.userData} userAgent={userAgent} />
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
