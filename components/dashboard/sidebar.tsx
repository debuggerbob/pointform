import Link from 'next/link'

import { ProfileMenu } from '@/components/profileMenu'

interface Props {
    creatorName: string
}

export const Sidebar: React.FC<Props> = ({ creatorName }) => {
    return (
        <>
            <aside className="sidebar md:fixed md:top-0 md:left-0 md:h-full md:bg-gray-100">
                <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5 md:px-0 md:pt-8 md:mx-7 md:mb-5">
                    <h1 className="text-xl font-semibold md:hidden">
                        Pointform
                    </h1>

                    <div className="pointer-events-none">
                        <ProfileMenu currentUsername={creatorName} />
                    </div>
                </div>

                <nav className="hidden md:block">
                    <ul>
                        <li className="mx-4 my-0 cursor-pointer">
                            <Link href="/dashboard">
                                <a className="flex items-center px-3 py-2 rounded group transition duration-100 hover:bg-indigo-600 hover:bg-opacity-10">
                                    <svg
                                        width={20}
                                        height={20}
                                        fill="none"
                                        className="mr-3.5 text-gray-500 stroke-current group-hover:text-indigo-700"
                                    >
                                        <path
                                            d="M7.631 17.31v-2.556c0-.65.53-1.178 1.187-1.183h2.405c.66 0 1.194.53 1.194 1.183v2.563a1.02 1.02 0 001.002 1.016h1.604c1.598 0 2.894-1.282 2.894-2.865v-7.27a2.033 2.033 0 00-.802-1.587l-5.483-4.373a2.65 2.65 0 00-3.287 0l-5.46 4.38c-.5.38-.795.965-.802 1.588v7.262c0 1.583 1.296 2.865 2.894 2.865h1.604c.571 0 1.034-.458 1.034-1.023"
                                            strokeWidth={1.2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>

                                    <span className="text-gray-700 group-hover:text-indigo-700">
                                        Dashboard
                                    </span>
                                </a>
                            </Link>
                        </li>

                        <li className="mx-4 my-0 cursor-pointer">
                            <Link href="/dashboard/settings">
                                <a className="flex items-center px-3 py-2 rounded group transition duration-100 hover:bg-indigo-600 hover:bg-opacity-10">
                                    <svg
                                        width={20}
                                        height={20}
                                        fill="none"
                                        className="mr-3.5 text-gray-500 stroke-current group-hover:text-indigo-700"
                                    >
                                        <path
                                            clipRule="evenodd"
                                            d="M17.339 6.353l-.519-.9a1.594 1.594 0 00-2.174-.587v0a1.587 1.587 0 01-2.174-.565 1.526 1.526 0 01-.213-.763v0a1.594 1.594 0 00-1.594-1.64H9.62a1.587 1.587 0 00-1.587 1.595v0a1.594 1.594 0 01-1.594 1.571 1.526 1.526 0 01-.763-.214v0a1.594 1.594 0 00-2.174.588l-.557.915c-.438.76-.179 1.733.58 2.174v0a1.594 1.594 0 010 2.761v0a1.587 1.587 0 00-.58 2.166v0l.527.908a1.594 1.594 0 002.174.618v0a1.579 1.579 0 012.166.58c.137.23.21.494.213.763v0c0 .88.714 1.594 1.595 1.594h1.045c.877 0 1.59-.71 1.594-1.587v0a1.587 1.587 0 011.594-1.594c.268.007.53.08.763.213v0c.76.439 1.732.18 2.174-.58v0l.549-.915a1.587 1.587 0 00-.58-2.173v0a1.587 1.587 0 01-.58-2.174c.139-.242.339-.442.58-.58v0a1.594 1.594 0 00.58-2.166v0-.008z"
                                            strokeWidth={1.2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <circle
                                            cx={10.146}
                                            cy={9.907}
                                            strokeWidth={1.2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            r={2.197}
                                        />
                                    </svg>

                                    <span className="text-gray-700 group-hover:text-indigo-700">
                                        Settings
                                    </span>
                                </a>
                            </Link>
                        </li>
                    </ul>

                    <div>
                        <h3 className="mx-7 mt-12 mb-4 font-semibold">
                            Get in touch
                        </h3>

                        <ul>
                            <li className="mx-4 my-0 cursor-pointer">
                                <a className="flex items-center px-3 py-2 rounded group transition duration-100 hover:bg-indigo-600 hover:bg-opacity-10">
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

                            <li className="mx-4 my-0 cursor-pointer">
                                <a className="flex items-center px-3 py-2 rounded group transition duration-100 hover:bg-indigo-600 hover:bg-opacity-10">
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

                            <li className="mx-4 my-0 cursor-pointer">
                                <a className="flex items-center px-3 py-2 rounded group transition duration-100 hover:bg-indigo-600 hover:bg-opacity-10">
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
                </nav>

                <div className="hidden">
                    <button className="flex items-center">
                        <svg width={20} height={20} fill="none">
                            <path
                                d="M9.167 14.167L5 10l4.167-4.167"
                                stroke="#888"
                                strokeWidth={1.2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M15 14.167L10.833 10 15 5.833"
                                stroke="#888"
                                strokeWidth={1.5}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>

                        <span className="ml-3.5text-gray-700 ">
                            Contract Menu
                        </span>
                    </button>
                </div>
            </aside>

            <style jsx>
                {`
                    @media (min-width: 768px) {
                        .sidebar {
                            min-width: 250px;
                        }
                    }
                `}
            </style>
        </>
    )
}
