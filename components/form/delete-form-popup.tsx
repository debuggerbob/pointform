import {
    Dispatch,
    SetStateAction,
    useState,
    useRef,
    useReducer,
    useEffect,
} from 'react'
import { useRouter } from 'next/router'

interface Props {
    fvid: string
    formName: string
    showForm: boolean
    handleShowForm: Dispatch<SetStateAction<boolean>>
}

export const DeleteFormPopup: React.FC<Props> = ({
    fvid,
    formName,
    showForm,
    handleShowForm,
}) => {
    const router = useRouter()
    const [showError, setShowError] = useState(false)
    const InputBox = useRef<HTMLInputElement>()

    const hidePopup = () => {
        if (showForm) {
            handleShowForm(false)
        }
    }

    const pushToDashboard = () => {
        router.push({ pathname: '/dashboard' })
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()

        if (InputBox.current.value === formName) {
            setShowError(false)

            fetch('/api/form', {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({ fvid: fvid }),
            }).then((res) => {
                res.status === 200 ? pushToDashboard() : setShowError(true)
            })
        } else {
            setShowError(true)
        }
    }

    useEffect(() => {
        document.getElementById('deleteForm').classList.add('fadeInUp')
    }, [])

    return (
        <>
            <div className="fixed z-50 top-0 left-0 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-30">
                <form
                    id="deleteForm"
                    onSubmit={handleFormSubmit}
                    className=" opacity-0 absolute bottom-0 bg-white rounded-md max-w-md transition ease-in sm:relative"
                >
                    <div className="p-8 text-gray-700">
                        <h3 className="text-center text-2xl font-semibold mb-6 text-gray-900">
                            Delete Pointform
                        </h3>

                        <p className="mb-6 text-center">
                            This pointform will be deleted, along with all its
                            Questions and Responsses.
                        </p>

                        <div className="px-3 py-2 mb-8 rounded border border-red-500 border-opacity-50 bg-red-400 bg-opacity-30">
                            <span className="text-red-700">
                                <b className="text-red-800">Warning:</b> This
                                action cannot be undone. Please be certain
                            </span>
                        </div>

                        <div className="mb-2">
                            <p className="mb-3">
                                Enter your pointform name <b>{formName}</b> to
                                confirm:
                            </p>

                            <input
                                ref={InputBox}
                                type="text"
                                aria-invalid="false"
                                spellCheck="false"
                                autoCapitalize="off"
                                autoComplete="off"
                                autoCorrect="off"
                                required
                                className="w-full px-3 py-2 transition duration-150 rounded border border-gray-300 focus:border-gray-600"
                            />

                            {showError ? (
                                <div className="flex align-center mt-5">
                                    <div>
                                        <svg
                                            width={24}
                                            height={24}
                                            fill="none"
                                            className="fill-current text-red-500 mr-4"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M2 12C2 6.478 6.478 2 12 2c5.523 0 10 4.478 10 10 0 5.523-4.477 10-10 10-5.522 0-10-4.477-10-10zm18.5 0a8.5 8.5 0 10-17 0 8.5 8.5 0 0017 0zm-8.505-4.546a.75.75 0 01.743.649l.007.101v4.42a.75.75 0 01-1.493.101l-.007-.102V8.204a.75.75 0 01.75-.75zm.76 8.342a.75.75 0 00-.75-.75l-.112.007a.75.75 0 00.102 1.493l.112-.007a.75.75 0 00.648-.743z"
                                            />
                                        </svg>
                                    </div>

                                    <p className="text-red-600">
                                        Entered value does not match{' '}
                                        <b>{formName}</b>.
                                    </p>
                                </div>
                            ) : null}
                        </div>
                    </div>

                    <footer className="flex items-center border-t border-gray-300">
                        <button
                            type="button"
                            className="text-xs font-medium text-gray-600 w-1/2 uppercase text-center py-6 border-r border-gray-300 transition hover:bg-gray-300 hover:bg-opacity-30 hover:text-gray-700"
                            onClick={hidePopup}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="text-xs font-medium w-1/2 uppercase text-center py-6 transition hover:bg-red-300 hover:bg-opacity-30 hover:text-red-700"
                        >
                            Delete Pointform
                        </button>
                    </footer>
                </form>
            </div>

            <style jsx>{`
                .fadeInUp {
                    -webkit-animation-name: fadeInUp;
                    animation-name: fadeInUp;
                    -webkit-animation-duration: 0.5s;
                    animation-duration: 0.5s;
                    -webkit-animation-fill-mode: both;
                    animation-fill-mode: both;
                }

                @-webkit-keyframes fadeInUp {
                    0% {
                        opacity: 0;
                        -webkit-transform: translate3d(0, 20px, 0);
                        transform: translate3d(0, 20px, 0);
                    }
                    100% {
                        opacity: 1;
                        -webkit-transform: none;
                        transform: none;
                    }
                }

                @keyframes fadeInUp {
                    0% {
                        opacity: 0;
                        -webkit-transform: translate3d(0, 20px, 0);
                        transform: translate3d(0, 20px, 0);
                    }
                    100% {
                        opacity: 1;
                        -webkit-transform: none;
                        transform: none;
                    }
                }
            `}</style>
        </>
    )
}
