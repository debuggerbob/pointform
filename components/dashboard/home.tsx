import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { gsap } from 'gsap'
import useSWR from 'swr'
import Link from 'next/link'

interface Props {
    creatorData: {
        uid: string
        email: string
        name: string
    }
}

type FormsData = {
    title: string
    category: string
    fvid: string
    status: string
    responses: number
    updatedAt: Date
}

export const Home: React.FC<Props> = ({ creatorData }) => {
    const router = useRouter()
    const [forms, setForms] = useState<Array<FormsData>>([])
    const [showHelp, setShowHelp] = useState(false)

    console.log(creatorData)

    const fetcher = (args) => fetch(args).then((res) => res.json())
    const { data: form, error } = useSWR(
        `/api/forms/${creatorData?.uid}`,
        fetcher
    )

    console.log(form)

    const refreshData = () => {
        router.replace(router.asPath)
    }

    useEffect(() => {
        if (form) {
            setForms(form.data)
            console.log(forms)
            refreshData()
        }
    }, [form])

    useEffect(() => {
        if (showHelp) {
            gsap.to('body', { overflow: 'hidden' })
        } else {
            gsap.to('body', { overflow: 'auto' })
        }
    }, [showHelp])

    return (
        <>
            <div className="border-b border-gray-200 mb-6 md:border-none md:mb-8">
                <div className="flex items-center justify-between p-6 border-b border-gray-200 md:p-0 md:pb-6">
                    <h2 className="text-2xl font-bold md:text-3xl">My Forms</h2>

                    <Link href="/dashboard/create">
                        <a className="text-indigo-600 bg-indigo-400 bg-opacity-30 p-2 px-4 rounded transition hover:bg-opacity-20">
                            Create Form
                        </a>
                    </Link>
                </div>

                <div className="p-6 md:p-0 md:py-6">
                    <form className="search flex items-center border border-gray-300 rounded bg-gray-100 p-2 max-w-xs focus-within:bg-gray-50">
                        <svg
                            width={16}
                            height={16}
                            fill="none"
                            viewBox="0 0 16 16"
                            className="mr-3 stroke-current text-gray-500 w-4"
                        >
                            <circle
                                cx={7.844}
                                cy={7.844}
                                r={5.992}
                                strokeWidth={1.5}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M12.012 12.323l2.35 2.344"
                                strokeWidth={1.5}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>

                        <input
                            type="text"
                            placeholder="Search for forms..."
                            className="border-none bg-transparent placeholder-gray-500"
                        />
                    </form>
                </div>
            </div>

            <div className="px-6 pb-28 md:px-0">
                {forms && forms.length > 0 ? (
                    forms.map((item) => (
                        <div key={item.fvid}>
                            <Link href={`/form/${item.fvid}/responses`}>
                                <a className="block my-2 py-4 rounded-md hover:bg-gray-100 md:px-6 md:-mx-6 md:mb-0">
                                    <span className="inline-block text-xs font-medium px-2.5 py-0.5 mb-2 rounded-3xl bg-red-500 bg-opacity-20 text-red-500">
                                        hashtag
                                    </span>

                                    <div>
                                        <h4 className="text-xl font-semibold mb-1">
                                            {item.title}
                                        </h4>
                                        <p className="flex items-center flex-wrap text-gray-500 text-sm">
                                            <span>
                                                {item.responses === undefined
                                                    ? 'No responses yet'
                                                    : item.responses}
                                            </span>
                                            <span className="block w-1 h-1 rounded-full bg-gray-500 mx-2"></span>
                                            <span>Updated 10hrs ago</span>
                                        </p>
                                    </div>
                                </a>
                            </Link>
                        </div>
                    ))
                ) : (
                    <h2 className="text-center">No forms found</h2>
                )}
            </div>

            {/* Floating Mobile buttons */}
            <div className="fixed bottom-12 right-6 flex flex-col md:hidden">
                <div className="mb-3 relative" style={{ textAlign: 'end' }}>
                    {/* Help button */}
                    <button
                        onClick={() => {
                            setShowHelp((prevState) => !prevState)
                        }}
                    >
                        <svg
                            width={30}
                            height={30}
                            fill="none"
                            className="bg-gray-50"
                        >
                            <path
                                d="M15 27.5c6.904 0 12.5-5.596 12.5-12.5S21.904 2.5 15 2.5 2.5 8.096 2.5 15 8.096 27.5 15 27.5z"
                                stroke="#71717A"
                                strokeWidth={1.8}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M11.363 11.25a3.75 3.75 0 017.287 1.25c0 2.5-3.75 3.75-3.75 3.75M15 21.25h.012"
                                stroke="#71717A"
                                strokeWidth={1.8}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>

                    <div
                        className={`${
                            showHelp ? 'block' : 'hidden'
                        } fixed w-screen h-screen top-0 right-0 z-0`}
                        onClick={() => setShowHelp(false)}
                    ></div>

                    <ul
                        className={`${
                            showHelp ? 'block' : 'hidden'
                        } help_mobile absolute right-0 p-2 bg-gray-50 bottom-12 min-w-max rounded z-50`}
                    >
                        <li>
                            <a
                                href="/"
                                className="flex items-center px-3 py-2 rounded"
                            >
                                <svg
                                    width={20}
                                    height={20}
                                    fill="none"
                                    className="mr-3.5 text-gray-500 stroke-current group-hover:text-indigo-700"
                                >
                                    <path
                                        d="M10 13.333a3.333 3.333 0 100-6.666 3.333 3.333 0 000 6.666z"
                                        strokeWidth={1.2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M13.333 6.667v4.166a2.5 2.5 0 005 0V10a8.333 8.333 0 10-3.266 6.617"
                                        strokeWidth={1.2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>

                                <span className="text-gray-700 group-hover:text-indigo-700">
                                    Send us an email
                                </span>
                            </a>
                        </li>

                        <li>
                            <a
                                href="/"
                                className="flex items-center px-3 py-2 rounded"
                            >
                                <svg
                                    width={20}
                                    height={20}
                                    fill="none"
                                    className="mr-3.5 text-gray-500 stroke-current group-hover:text-indigo-700"
                                >
                                    <path
                                        d="M19.167 2.5a9.083 9.083 0 01-2.617 1.275 3.733 3.733 0 00-6.55 2.5v.833a8.883 8.883 0 01-7.5-3.775s-3.333 7.5 4.167 10.834a9.7 9.7 0 01-5.834 1.666C8.333 20 17.5 15.833 17.5 6.25c0-.232-.023-.464-.067-.692A6.433 6.433 0 0019.167 2.5v0z"
                                        strokeWidth={1.2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>

                                <span className="text-gray-700 group-hover:text-indigo-700">
                                    Follow us on Twitter
                                </span>
                            </a>
                        </li>

                        <li>
                            <a
                                href="/"
                                className="flex items-center px-3 py-2 rounded"
                            >
                                <svg
                                    width={20}
                                    height={20}
                                    fill="none"
                                    className="mr-3.5 text-gray-500 stroke-current group-hover:text-indigo-700"
                                >
                                    <path
                                        d="M17.5 9.583a6.983 6.983 0 01-.75 3.167 7.084 7.084 0 01-6.333 3.917 6.983 6.983 0 01-3.167-.75L2.5 17.5l1.583-4.75a6.983 6.983 0 01-.75-3.167A7.083 7.083 0 017.25 3.25a6.983 6.983 0 013.167-.75h.416A7.066 7.066 0 0117.5 9.167v.416z"
                                        strokeWidth={1.2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>

                                <span className="text-gray-700 group-hover:text-indigo-700">
                                    Join us on Slack
                                </span>
                            </a>
                        </li>
                    </ul>
                </div>

                <div>
                    <Link href="/create">
                        <a className="create_btn w-11 h-11 bg-indigo-600 flex items-center justify-center rounded-full">
                            <svg width={24} height={24} fill="none">
                                <path
                                    d="M12 5v14M5 12h14"
                                    stroke="#fff"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </a>
                    </Link>
                </div>
            </div>

            <style jsx>
                {`
                    .create_btn {
                        box-shadow: 0 4px 8px 0 rgba(79, 70, 229, 0.4);
                    }

                    .help_mobile {
                        box-shadow: rgb(60 66 87 / 3%) 0px 0px 0px 1px,
                            rgb(60 66 87 / 8%) 0px 3px 6px,
                            rgb(60 66 87 / 15%) 0px 9px 24px;
                    }
                `}
            </style>
        </>
    )
}
