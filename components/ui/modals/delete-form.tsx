import { useState, useRef, useContext } from 'react'
import { useRouter } from 'next/router'

// API
import { baseApiUrl } from '@/lib/config'

// Context
import { ModalContext } from '@/context/modal-context'

interface DeleteFormModalProps {
    fvid: string
    formName: string
}

/**
 * Error Component
 * */
const ErrorBox = ({ formName }: { formName: string }) => {
    return (
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
                Entered value does not match <b>{formName}</b>.
            </p>
        </div>
    )
}

/**
 * Main Delete component
 * */
export const DeleteFormModal: React.FC<DeleteFormModalProps> = ({
    fvid,
    formName,
}) => {
    const router = useRouter()
    const { showModal, setShowModal } = useContext(ModalContext)
    const [showError, setShowError] = useState(false)
    const InputBox = useRef<HTMLInputElement>()

    const hidePopup = () => {
        if (showModal) {
            setShowModal(false)
        }
    }

    const pushToDashboard = () => {
        router.push({ pathname: '/dashboard' })
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()

        if (InputBox.current.value === formName) {
            setShowError(false)

            fetch(`${baseApiUrl}/form`, {
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

    return (
        <form
            onSubmit={handleFormSubmit}
            className="absolute bottom-0 bg-white rounded-md max-w-md transition ease-in sm:relative"
        >
            <div className="p-8 text-gray-700">
                <h3 className="text-center text-2xl font-semibold mb-6 text-gray-900">
                    Delete Pointform
                </h3>

                <p className="mb-6 text-center">
                    This pointform will be deleted, along with all its Questions
                    and Responsses.
                </p>

                <div className="px-3 py-2 mb-8 rounded border border-red-500 border-opacity-50 bg-red-400 bg-opacity-30">
                    <span className="text-red-700">
                        <b className="text-red-800">Warning:</b> This action
                        cannot be undone. Please be certain
                    </span>
                </div>

                <div className="mb-2">
                    <p className="mb-3">
                        Enter <b className="text-gray-700">{formName}</b> to
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

                    {showError && <ErrorBox formName={formName} />}
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
                    id="submitBtn"
                    type="submit"
                    className="text-xs font-medium w-1/2 uppercase text-center py-6 transition hover:bg-red-300 hover:bg-opacity-30 hover:text-red-700"
                >
                    Delete Pointform
                </button>
            </footer>
        </form>
    )
}
