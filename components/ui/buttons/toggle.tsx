interface Props {
    toggled: boolean
}

export const ToggleBtn: React.FC<Props> = ({ toggled }) => {
    return (
        <div
            className={`${
                toggled ? 'bg-green-400' : 'bg-gray-300'
            } relative w-9 h-5 flex items-center justify-start transition rounded-full`}
        >
            <div
                className={`${
                    toggled && 'translate-x-full'
                } absolute w-4 h-4 mx-0.5 rounded-full transition bg-gray-50 transform`}
            ></div>
        </div>
    )
}
