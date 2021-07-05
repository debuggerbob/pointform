import { useAuth } from '@/context/AuthContext'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'

import { Sidebar } from '@/components/dashboard/sidebar'
import { Responses } from '@/components/form/responses'
import { Share } from '@/components/form/share'
import { Settings } from '@/components/form/settings'
import { baseApiUrl } from '@/lib/config'

type Question = {
    question: string
    questionId: number
    questinoType: string
    required: boolean
    options?: Array<Option>
}

type Option = {
    value: string
    optionId: number
    score: number
}

type ResData = {
    userId: string
    title: string
    formType: string
    fvid: string
    questions: Array<Question>
    status: string
    timestamps: {
        _seconds: number
        _nanoseconds: number
    }
}

interface Props {
    formData: ResData
}

export default function Form({ formData }: Props) {
    const { query } = useRouter()
    const { currentUser } = useAuth()

    let currentPage = query.slug[1]
    console.log(query)

    return (
        <>
            <Head>
                <title>{formData.title}</title>
            </Head>

            <main className="md:flex">
                <Sidebar creatorName={'ruyas'} />

                <section className="px-6 pb-16 md:ml-auto md:px-10 lg:px-16 overflow-ellipsis">
                    <div className="border-b border-gray-200">
                        <div className="pt-6 pb-14 flex items-center justify-between md:pt-0">
                            <span className="text-3xl pr-4 font-bold overflow-hidden whitespace-nowrap overflow-ellipsis md:text-3xl">
                                {formData.title}
                            </span>

                            <Link href={`/create/${formData.fvid}`}>
                                <a className="min-w-max text-indigo-600 bg-indigo-400 bg-opacity-30 p-2 px-4 rounded transition hover:bg-opacity-20">
                                    Edit Form
                                </a>
                            </Link>
                        </div>

                        {/* Navigation Links */}
                        <div className="relative flex overflow-auto z-0">
                            <Link href={`/form/${formData.fvid}/responses`}>
                                <a
                                    className={`${
                                        query.slug[1] === 'responses'
                                            ? 'border-indigo-500'
                                            : 'hover:border-indigo-300'
                                    } relative mr-11 pb-2 group border-b-2 border-indigo-50 transition duration-75`}
                                >
                                    Responses
                                </a>
                            </Link>

                            <Link href={`/form/${formData.fvid}/share`}>
                                <a
                                    className={`${
                                        query.slug[1] === 'share'
                                            ? 'border-indigo-500'
                                            : 'hover:border-indigo-300'
                                    } relative mr-11 pb-2 group border-b-2 border-indigo-50 transition duration-75`}
                                >
                                    Share
                                </a>
                            </Link>

                            <Link href={`/form/${formData.fvid}/settings`}>
                                <a
                                    className={`${
                                        query.slug[1] === 'settings'
                                            ? 'border-indigo-500'
                                            : 'hover:border-indigo-300'
                                    } relative mr-11 pb-2 group border-b-2 border-indigo-50 transition duration-75`}
                                >
                                    Settings
                                </a>
                            </Link>
                        </div>
                    </div>

                    {currentPage === 'responses' ? (
                        <Responses />
                    ) : currentPage === 'share' ? (
                        <Share />
                    ) : (
                        <Settings
                            fvid={formData.fvid}
                            formName={formData.title}
                        />
                    )}
                </section>
            </main>

            <style jsx>
                {`
                    @media (min-width: 768px) {
                        section {
                            padding: 3.5rem 3.5rem 3.5rem calc(250px + 3.5rem);
                            flex: 1 1 0%;
                        }
                    }
                `}
            </style>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    let resData

    try {
        resData = await fetch(
            `${baseApiUrl}/form/${context.params.slug[0]}`,
            {
                method: 'GET',
            }
        ).then((res) => res.json())
    } catch (error) {
        return {
            redirect: {
                destination: '/404',
                permanent: false,
            },
        }
    }

    if (resData === undefined) {
        return {
            redirect: {
                destination: '/404',
                permanent: false,
            },
        }
    } else {
        return {
            props: {
                formData: resData.data,
            },
        }
    }
}
