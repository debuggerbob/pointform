import { useEffect, useState } from 'react'

export const Settings: React.FC = () => {
    const [closeResponses, setCloseResponses] = useState(false)
    const [limitResponses, setLimitResponses] = useState({
        status: false,
        limitValue: 0,
    })

    const handleLimitResponses = () => {
        setLimitResponses((prevState) => ({
            ...prevState,
            status: !prevState.status,
        }))
    }

    const setResponseLimit = (e) => {
        setLimitResponses((prevState) => ({
            ...prevState,
            limitValue: parseInt(e.target.value, 10),
        }))
    }

    const handleCloseResponses = () => {
        setCloseResponses((prevState) => !prevState)
    }

    return (
        <>
            <section className="mt-14 pb-28">
                <div className="setting_container border-b border-gray-200 max-w-4xl">
                    <button
                        className="w-full flex items-center justify-between py-5"
                        onClick={handleCloseResponses}
                    >
                        <div className=" w-4/5 lg:w-auto">
                            <span className="block text-left text-lg text-gray-900">
                                Close Responses
                            </span>

                            <p className="text-gray-500 mt-1.5 text-left">
                                People will not be able to submit response to
                                this form anymore.
                            </p>
                        </div>

                        <div
                            className={`${
                                closeResponses ? 'bg-green-400' : 'bg-gray-300'
                            } relative w-9 h-5 flex items-center justify-start transition rounded-full`}
                        >
                            <div
                                className={`${
                                    closeResponses ? 'translate-x-full' : ''
                                } absolute w-4 h-4 mx-0.5 rounded-full transition bg-gray-50 transform`}
                            ></div>
                        </div>
                    </button>
                </div>

                <div className="setting_container border-b border-gray-200 max-w-4xl">
                    <button
                        className="w-full flex items-center justify-between py-5"
                        onClick={handleLimitResponses}
                    >
                        <div className=" w-4/5 lg:w-auto">
                            <span className="block text-left text-lg text-gray-900">
                                Limit Responses
                            </span>

                            <p className="text-gray-500 mt-1.5 text-left">
                                Set how many responses you want to receive in
                                total.
                            </p>
                        </div>

                        <div
                            className={`${
                                limitResponses.status
                                    ? 'bg-green-400'
                                    : 'bg-gray-300'
                            } relative w-9 h-5 flex items-center justify-start transition rounded-full`}
                        >
                            <div
                                className={`${
                                    limitResponses.status
                                        ? 'translate-x-full'
                                        : ''
                                } absolute w-4 h-4 mx-0.5 rounded-full transition bg-gray-50 transform`}
                            ></div>
                        </div>
                    </button>

                    {limitResponses.status ? (
                        <div className="mt-4 mb-10">
                            <span className="font-semibold">Max Responses</span>
                            <input
                                type="number"
                                className="w-full border rounded border-gray-300 shadow mt-4 px-4 py-2 focus:border-gray-500"
                                onChange={setResponseLimit}
                            />
                        </div>
                    ) : null}
                </div>
            </section>

            <style jsx>
                {`
                    section .setting_container:last-child {
                        border: none;
                    }
                `}
            </style>
        </>
    )
}
