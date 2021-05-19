interface Props {
    label: string;
    isOn: boolean;
    toggleFunction?: any;
}

export const ToggleBtn: React.FC<Props> = ({ label, isOn, toggleFunction }) => {
    return (
        <div
            className="flex items-center justify-between px-4 py-3.5 border-b border-gray-200 cursor-pointer hover:bg-gray-100 last:border-b-0"
            onClick={toggleFunction}
        >
            <span>{label}</span>

            <div
                className={`${
                    isOn ? "bg-green-400" : "bg-gray-400"
                } w-9 h-5 rounded-full inline-flex items-center`}
            >
                <div
                    className="rounded-full bg-white w-3 h-3 mx-1 z-10 transition"
                    style={{
                        transform: `translateX(${
                            isOn ? "calc(100% + 4px)" : "0"
                        })`,
                    }}
                ></div>
            </div>
        </div>
    );
};
