interface Props {
    buttonLabel: string
    onClickHandler: () => void
}

export const DeleteBtn = ({ buttonLabel, onClickHandler }: Props) => {
    return (
        <button
            className="px-4 py-2 bg-red-400 bg-opacity-30 text-red-700 border-2 rounded border-transparent transition hover:bg-red-500 hover:bg-opacity-30 focus:border-red-500 focus:border-opacity-70"
            onClick={onClickHandler}
        >
            {buttonLabel}
        </button>
    )
}
