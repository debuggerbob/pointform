export const Responses = () => {
    const skeletonClass = 'w-24 bg-gray-300 text-opacity-0'
    let loading = true

    return (
        <>
            <section className="pb-28">
                <div className="mt-14">
                    <h3 className="text-2xl mb-8 text-gray-900 rounded font-semibold w-max">
                        Big Picture
                    </h3>

                    <div className="flex flex-wrap justify-between md:justify-start">
                        <div className="flex flex-col mb-6 w-5/12 lg:w-max lg:mr-20 lg:mb-8">
                            <span className="text-gray-500 mb-2">Views</span>
                            <span
                                className={`${
                                    loading
                                        ? skeletonClass + ' ' + 'animate-pulse'
                                        : ''
                                } text-gray-900 text-3xl font-light rounded`}
                            >
                                100
                            </span>
                        </div>

                        <div className="flex flex-col mb-6 w-5/12 lg:w-max lg:mr-20 lg:mb-8">
                            <span className="text-gray-500 mb-2">Starts</span>
                            <span
                                className={`${
                                    loading
                                        ? skeletonClass + ' ' + 'animate-pulse'
                                        : ''
                                } text-gray-900 text-3xl font-light rounded`}
                            >
                                87
                            </span>
                        </div>

                        <div className="flex flex-col mb-6 w-5/12 lg:w-max lg:mr-20 lg:mb-8">
                            <span className="text-gray-500 mb-2">
                                Responses
                            </span>
                            <span
                                className={`${
                                    loading
                                        ? skeletonClass + ' ' + 'animate-pulse'
                                        : ''
                                } text-gray-900 text-3xl font-light rounded`}
                            >
                                80
                            </span>
                        </div>

                        <div className="flex flex-col mb-6 w-5/12 lg:w-max lg:mr-20 lg:mb-8">
                            <span className="text-gray-500 mb-2">
                                Completion Ratio
                            </span>
                            <span
                                className={`${
                                    loading
                                        ? skeletonClass + ' ' + 'animate-pulse'
                                        : ''
                                } text-gray-900 text-3xl font-light rounded`}
                            >
                                91.5%
                            </span>
                        </div>

                        <div className="flex flex-col mb-6 w-5/12 lg:w-max lg:mr-20 lg:mb-8">
                            <span className="text-gray-500 mb-2">
                                Average time to complete
                            </span>
                            <span
                                className={`${
                                    loading
                                        ? skeletonClass + ' ' + 'animate-pulse'
                                        : ''
                                } text-gray-900 text-3xl font-light rounded`}
                            >
                                01:21
                            </span>
                        </div>
                    </div>
                </div>

                <div className="mt-14">
                    <h4 className="text-2xl mb-8 text-gray-900 rounded font-semibold">
                        All Responses
                    </h4>

                    <div>
                        <div className="py-4 border-b border-gray-200">
                            <h4
                                className={`${
                                    loading
                                        ? skeletonClass + ' ' + 'animate-pulse'
                                        : ''
                                } text-xl font-medium mb-1 w-max rounded text-gray-900`}
                            >
                                ruthvikas sir
                            </h4>
                            <p
                                className={`${
                                    loading
                                        ? skeletonClass + ' ' + 'animate-pulse'
                                        : ''
                                } flex items-center flex-wrap w-max rounded text-gray-500 text-sm`}
                            >
                                <span>Completed On :</span>
                                <span className="pl-2">13/06/2021</span>
                            </p>
                        </div>

                        <div className="py-4 border-b border-gray-200">
                            <h4
                                className={`${
                                    loading
                                        ? skeletonClass + ' ' + 'animate-pulse'
                                        : ''
                                } text-xl font-medium mb-1 w-max rounded text-gray-900`}
                            >
                                ruthvikas sir
                            </h4>
                            <p
                                className={`${
                                    loading
                                        ? skeletonClass + ' ' + 'animate-pulse'
                                        : ''
                                } flex items-center flex-wrap w-max rounded text-gray-500 text-sm`}
                            >
                                <span>Completed On :</span>
                                <span className="pl-2">13/06/2021</span>
                            </p>
                        </div>

                        <div className="py-4 border-b border-gray-200">
                            <h4
                                className={`${
                                    loading
                                        ? skeletonClass + ' ' + 'animate-pulse'
                                        : ''
                                } text-xl font-medium mb-1 w-max rounded text-gray-900`}
                            >
                                ruthvikas sir
                            </h4>
                            <p
                                className={`${
                                    loading
                                        ? skeletonClass + ' ' + 'animate-pulse'
                                        : ''
                                } flex items-center flex-wrap w-max rounded text-gray-500 text-sm`}
                            >
                                <span>Completed On :</span>
                                <span className="pl-2">13/06/2021</span>
                            </p>
                        </div>

                        <div className="py-4 border-b border-gray-200">
                            <h4
                                className={`${
                                    loading
                                        ? skeletonClass + ' ' + 'animate-pulse'
                                        : ''
                                } text-xl font-medium mb-1 w-max rounded text-gray-900`}
                            >
                                ruthvikas sir
                            </h4>
                            <p
                                className={`${
                                    loading
                                        ? skeletonClass + ' ' + 'animate-pulse'
                                        : ''
                                } flex items-center flex-wrap w-max rounded text-gray-500 text-sm`}
                            >
                                <span>Completed On :</span>
                                <span className="pl-2">13/06/2021</span>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
