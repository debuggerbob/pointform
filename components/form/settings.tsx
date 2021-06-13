export const Settings = () => {
    return (
        <>
            <section className="mt-14 pb-28">
                <div className="setting_container border-b border-gray-200 max-w-4xl">
                    <button className="w-full flex items-center justify-between py-5">
                        <div className=" w-4/5 lg:w-auto">
                            <span className="block text-left text-lg text-gray-900">
                                Close Responses
                            </span>

                            <p className="text-gray-500 mt-1.5 text-left">
                                People will not be able to submit response to
                                this form anymore.
                            </p>
                        </div>

                        <div className="relative w-9 h-5 flex items-center justify-start transition bg-gray-300 rounded-full">
                            <div className="absolute w-4 h-4 mx-0.5 rounded-full transition bg-gray-50 transform"></div>
                        </div>
                    </button>
                </div>

                <div className="setting_container border-b border-gray-200 max-w-4xl">
                    <button className="w-full flex items-center justify-between py-5">
                        <div className=" w-4/5 lg:w-auto">
                            <span className="block text-left text-lg text-gray-900">
                                Limit Responses
                            </span>

                            <p className="text-gray-500 mt-1.5 text-left">
                                Set how many responses you want to receive in
                                total.
                            </p>
                        </div>

                        <div className="relative w-9 h-5 flex items-center justify-start transition bg-green-400 rounded-full">
                            <div className="absolute w-4 h-4 mx-0.5 rounded-full transition bg-gray-50 transform translate-x-full"></div>
                        </div>
                    </button>

                    <div className="mt-4 mb-10">
                        <span className="font-semibold">Max Responses</span>
                        <input
                            type="number"
                            className="w-full border rounded border-gray-300 shadow mt-4 px-4 py-2 focus:border-gray-500"
                        />
                    </div>
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
