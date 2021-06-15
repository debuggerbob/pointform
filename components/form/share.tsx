import { useRef } from 'react'

export const Share: React.FC = () => {
    const handleCopiedStatus = (target) => {
        target.innerText = 'Copied...'

        setTimeout(() => {
            target.innerText = 'Copy Link'
        }, 3000)
    }

    const copyToClipBoard = (e) => {
        const target = e.target
        const text = (document.getElementById('formLink') as HTMLInputElement)
            .value

        navigator.clipboard.writeText(text).then(() => {
            handleCopiedStatus(target)
        })
    }

    return (
        <>
            <section className="mt-14 pb-28">
                <div className="flex items-start text-2xl">
                    <svg width={24} height={24} fill="none">
                        <path
                            d="M10 13a5.001 5.001 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"
                            stroke="#737373"
                            strokeWidth={1.5}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M14 11a5.001 5.001 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"
                            stroke="#737373"
                            strokeWidth={1.5}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                    <span className="pl-4 font-medium">
                        Share your pointform
                    </span>
                </div>

                <div className="pl-10">
                    <p className="mt-5 text-gray-600 max-w-lg">
                        Your form is now live and ready to be shared to the
                        world! Copy the link below or click on a social icon to
                        share your pointform on social media, message apps or
                        via email.
                    </p>

                    <div className="mt-5 flex flex-wrap items-center">
                        <input
                            id="formLink"
                            type="text"
                            readOnly
                            value="https://pointform.com/in9Sinik"
                            className="w-full max-w-xs mt-3 px-4 py-2 border border-opacity-80 rounded border-gray-300 shadow text-gray-900 focus:border-gray-900"
                        />

                        <button
                            onClick={copyToClipBoard}
                            className="ml-auto mt-3 px-4 py-2 bg-gray-900 text-gray-50 rounded transition sm:ml-4"
                        >
                            Copy link
                        </button>
                    </div>

                    <div className="mt-9">
                        <h3 className="text-gray-900 text-lg font-medium mb-2">
                            Other Links
                        </h3>

                        <ul className="flex items-center -ml-3">
                            <li>
                                <a className="p-3 block group" href="">
                                    <svg
                                        width={32}
                                        height={32}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        className="fill-current text-gray-900 transition group-hover:text-gray-600"
                                    >
                                        <circle cx={12} cy={12} r={12} />
                                        <path
                                            d="M7.333 7.333h9.334A1.17 1.17 0 0117.832 8.5v7a1.17 1.17 0 01-1.166 1.167H7.332A1.17 1.17 0 016.166 15.5v-7a1.17 1.17 0 011.167-1.167z"
                                            stroke="#fff"
                                            strokeWidth={1.1}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M17.833 8.5L12 12.583 6.167 8.5"
                                            stroke="#fff"
                                            strokeWidth={1.1}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </a>
                            </li>

                            <li>
                                <a className="p-3 block group" href="">
                                    <svg
                                        width={32}
                                        height={32}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        className="fill-current text-gray-900 transition group-hover:text-gray-600"
                                    >
                                        <path d="M11.99.48C5.626.48.47 5.638.47 12c0 6.362 5.157 11.52 11.52 11.52 6.362 0 11.52-5.158 11.52-11.52C23.51 5.638 18.351.48 11.99.48zm2.728 7.96h-1.732c-.205 0-.433.27-.433.63v1.25h2.166l-.327 1.783h-1.839v5.353H10.51v-5.353H8.656V10.32h1.854V9.271c0-1.505 1.044-2.727 2.476-2.727h1.732V8.44z" />
                                    </svg>
                                </a>
                            </li>

                            <li>
                                <a className="p-3 block group" href="">
                                    <svg
                                        width={32}
                                        height={32}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        className="fill-current text-gray-900 transition group-hover:text-gray-600"
                                    >
                                        <path d="M12 .48C5.638.48.48 5.638.48 12c0 6.362 5.158 11.52 11.52 11.52 6.362 0 11.52-5.158 11.52-11.52C23.52 5.638 18.362.48 12 .48zm4.686 9.437c.005.098.006.197.006.293 0 3-2.281 6.457-6.455 6.457a6.403 6.403 0 01-3.477-1.02c.176.021.357.03.54.03a4.544 4.544 0 002.818-.971A2.274 2.274 0 018 13.132c.34.064.69.05 1.024-.04a2.27 2.27 0 01-1.82-2.225v-.027c.305.169.656.272 1.028.284a2.268 2.268 0 01-.702-3.031 6.451 6.451 0 004.676 2.372 2.27 2.27 0 013.867-2.07c.507-.1.994-.287 1.44-.55a2.28 2.28 0 01-.998 1.256 4.56 4.56 0 001.304-.359 4.602 4.602 0 01-1.132 1.175z" />
                                    </svg>
                                </a>
                            </li>

                            <li>
                                <a className="p-3 block group" href="">
                                    <svg
                                        width={32}
                                        height={32}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        className="fill-current text-gray-900 transition group-hover:text-gray-600"
                                    >
                                        <path d="M12 .48C5.638.48.48 5.638.48 12c0 6.362 5.158 11.52 11.52 11.52 6.362 0 11.52-5.158 11.52-11.52C23.52 5.638 18.362.48 12 .48zM9.18 16.775H6.847V9.268H9.18v7.507zM8 8.346c-.738 0-1.214-.522-1.214-1.168 0-.658.49-1.165 1.243-1.165.753 0 1.213.507 1.228 1.165 0 .646-.475 1.168-1.258 1.168zm9.7 8.429h-2.333v-4.16c0-.969-.338-1.627-1.182-1.627-.644 0-1.027.446-1.196.874-.063.152-.078.368-.078.583v4.329h-2.334v-5.112c0-.938-.03-1.721-.061-2.396h2.026l.107 1.043h.047c.307-.49 1.06-1.212 2.318-1.212 1.535 0 2.686 1.029 2.686 3.239v4.439z" />
                                    </svg>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </>
    )
}
