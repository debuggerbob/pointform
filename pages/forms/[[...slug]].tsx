import { useAuth } from '@/context/AuthContext'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { Sidebar } from '@/components/dashboard/common/sidebar'

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
    const router = useRouter()
    console.log(router)
    const { currentUser } = useAuth()
    // console.log(currentUser)

    // console.log('formData', formData)
    return (
        <>
            <Head>
                <title>{formData.title}</title>
            </Head>

            <main className="md:flex">
                <Sidebar creatorName={'ruyas'} />

                <section className="md:h-screen">
                    <div className="p-6 pb-0 border-b border-gray-200 md:mx-10 md:px-0 md:pt-10 lg:mx-16 lg:pt-14">
                        <div className="pb-14 flex items-center justify-between">
                            <h2 className="text-2xl font-bold md:text-3xl">
                                {formData.title}
                            </h2>

                            <Link href="/dashboard/create">
                                <a className="min-w-max text-indigo-600 bg-indigo-400 bg-opacity-30 p-2 px-4 rounded transition hover:bg-opacity-20">
                                    Edit Form
                                </a>
                            </Link>
                        </div>

                        <div className="relative flex overflow-auto">
                            <Link href={`/forms/${formData.fvid}/responses`}>
                                <a className="relative mr-11 pb-2 group">
                                    <span>Responses</span>
                                    <span className="absolute bottom-0 left-0 block w-full h-0.5 transition group-hover:bg-indigo-300"></span>
                                </a>
                            </Link>

                            <Link href={`/forms/${formData.fvid}/respnoses`}>
                                <a className="relative mr-11 pb-2 group">
                                    <span>Share</span>
                                    <span className="absolute bottom-0 left-0 block w-full h-0.5 transition group-hover:bg-indigo-300"></span>
                                </a>
                            </Link>

                            <Link href={`/forms/${formData.fvid}/responses`}>
                                <a className="relative mr-11 pb-2 group">
                                    <span>Settings</span>
                                    <span className="absolute bottom-0 left-0 block w-full h-0.5 transition group-hover:bg-indigo-300"></span>
                                </a>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <style jsx>
                {`
                    @media (min-width: 768px) {
                        section {
                            width: calc(100vw - 250px);
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
            `http://localhost:3000/api/form/${context.params.slug[0]}`,
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
