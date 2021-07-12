import { createContext, ReactNode, Dispatch, SetStateAction } from 'react'
import { CSSTransition } from 'react-transition-group'

interface ContextProviderProps {
    children: ReactNode
    showModal: boolean
    setShowModal: Dispatch<SetStateAction<boolean>>
}

export const ModalContext = createContext({
    showModal: false,
    setShowModal: (showModal: boolean) => {},
})

export const ModalContextProvider: React.FC<ContextProviderProps> = ({
    children,
    showModal,
    setShowModal,
}) => {
    return (
        <ModalContext.Provider value={{ showModal, setShowModal }}>
            <CSSTransition
                in={showModal}
                timeout={300}
                unmountOnExit
                id="modalWrapper"
                classNames="modal"
            >
                <div className="fixed z-50 top-0 left-0 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-30">
                    {children}
                </div>
            </CSSTransition>

            <style jsx>{`
                .modal-enter {
                    opacity: 0;
                    transform: translateY(50px);
                }
                .modal-enter-active {
                    opacity: 1;
                    transform: translateY(0px);
                    transition: 300ms ease-out;
                }

                .modal-exit {
                    opacity: 1;
                }

                .modal-exit-active {
                    opacity: 0;
                    transform: translateY(50px);
                    transition: 300ms ease-in-out;
                }

                @media (min-width: 768px) {
                    .modal-exit {
                        opacity: 1;
                    }

                    .modal-exit-active {
                        opacity: 0;
                        transform: translateY(-50px);
                        transition: 300ms ease-in-out;
                    }
                }
            `}</style>
        </ModalContext.Provider>
    )
}
