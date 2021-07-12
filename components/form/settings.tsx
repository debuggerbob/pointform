import { useEffect, useState, useContext, ReactNode } from 'react'

import { ModalContext, ModalContextProvider } from '@/context/modal-context'

// Modals
import { DeleteFormModal } from '@/components/ui/modals/delete-form'

// Buttons
import { ToggleBtn } from '@/components/ui/buttons/toggle'
import { DeleteBtn } from '@/components/ui/buttons/delete'

interface Props {
    fvid: string
    formName: string
}

interface FormControllerProps {
    heading: string
    description: string
    onClickHandler: () => void
    toggleStatus: boolean
    children?: ReactNode
}

const FormController = ({
    heading,
    description,
    onClickHandler,
    toggleStatus,
    children,
}: FormControllerProps) => {
    return (
        <>
            <div className="setting_container border-b border-gray-200 max-w-4xl">
                <button
                    className="w-full flex items-center justify-between py-5"
                    onClick={onClickHandler}
                >
                    <div className=" w-4/5 lg:w-auto">
                        <span className="block text-left text-lg text-gray-900">
                            {heading}
                        </span>

                        <p className="text-gray-500 mt-1.5 text-left">
                            {description}
                        </p>
                    </div>

                    <ToggleBtn toggled={toggleStatus} />
                </button>

                {children}
            </div>
        </>
    )
}

export const Settings: React.FC<Props> = ({ fvid, formName }) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false)

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

    const handleShowDeleteModal = () => {
        console.log('clicked')
        setShowDeleteModal(true)
    }

    useEffect(() => {
        if (showDeleteModal) {
            document.getElementsByTagName('body')[0].style.overflow = 'hidden'
        } else if (!showDeleteModal) {
            document.getElementsByTagName('body')[0].style.overflow = 'auto'
        }
    }, [showDeleteModal])

    return (
        <>
            <section className="mt-14 pb-28">
                <FormController
                    heading={'Close Responses'}
                    description={
                        'Others will not be able to submit response to this form anymore.'
                    }
                    onClickHandler={handleCloseResponses}
                    toggleStatus={closeResponses}
                />

                <FormController
                    heading={'Limit Responses'}
                    description={
                        'Set how many responses you want to receive in total.'
                    }
                    onClickHandler={handleLimitResponses}
                    toggleStatus={limitResponses.status}
                    children={
                        <>
                            {limitResponses.status && (
                                <div className="mt-4 mb-10">
                                    <span className="font-semibold">
                                        Max Responses
                                    </span>
                                    <input
                                        type="number"
                                        className="w-full border rounded border-gray-300 shadow mt-4 px-4 py-2 focus:border-gray-500"
                                        onChange={setResponseLimit}
                                    />
                                </div>
                            )}
                        </>
                    }
                />

                <div className="mt-12">
                    <DeleteBtn
                        buttonLabel={'Delete this Pointform'}
                        onClickHandler={handleShowDeleteModal}
                    />
                </div>
            </section>

            <ModalContextProvider
                showModal={showDeleteModal}
                setShowModal={setShowDeleteModal}
            >
                <DeleteFormModal fvid={fvid} formName={formName} />
            </ModalContextProvider>

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
