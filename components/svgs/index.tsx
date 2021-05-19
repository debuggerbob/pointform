interface Props {
    width?: number;
    height?: number;
}

export const AddSVG = ({ width, height }: Props) => {
    return (
        <svg
            width={width ? width : 24}
            height={height ? height : 24}
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-current text-gray-500 cursor-pointer group-hover:text-purple-600"
        >
            <path
                d="M12 5v14M5 12h14"
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export const DeleteSVG = ({ width, height }: Props) => {
    return (
        <svg
            width={width ? width : 24}
            height={height ? height : 24}
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-current text-gray-500 cursor-pointer group-hover:text-red-600"
        >
            <path
                d="M19.325 9.468s-.543 6.735-.858 9.572c-.15 1.355-.987 2.15-2.358 2.174-2.609.047-5.221.05-7.829-.005-1.319-.027-2.142-.83-2.289-2.162-.317-2.862-.857-9.579-.857-9.579M20.708 6.24H3.75M17.44 6.24a1.648 1.648 0 01-1.614-1.324L15.583 3.7a1.28 1.28 0 00-1.237-.95h-4.233a1.28 1.28 0 00-1.237.95l-.243 1.216A1.648 1.648 0 017.018 6.24"
                strokeWidth={1.3}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export const TwoRowMenuSVG = ({ width, height }: Props) => {
    return (
        <svg
            width={width ? width : 24}
            height={height ? height : 24}
            fill="none"
            viewBox="0 0 24 24"
            className="fill-current text-gray-500 cursor-pointer transition hover:text-gray-900"
        >
            <path d="M15.75 7.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM15.75 13.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM15.75 19.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM9 7.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM9 13.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM9 19.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
        </svg>
    );
};

export const SettingsSVG = ({ width, height }: Props) => {
    return (
        <svg
            width={width ? width : 24}
            height={height ? height : 24}
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-current text-gray-500 cursor-pointer transition hover:text-gray-900"
        >
            <path
                clipRule="evenodd"
                d="M20.806 7.624l-.622-1.08a1.913 1.913 0 00-2.609-.705v0a1.904 1.904 0 01-2.608-.678 1.83 1.83 0 01-.257-.915v0a1.913 1.913 0 00-1.913-1.968h-1.254A1.904 1.904 0 009.64 4.191v0a1.913 1.913 0 01-1.913 1.886 1.83 1.83 0 01-.915-.257v0a1.913 1.913 0 00-2.609.705l-.668 1.099a1.913 1.913 0 00.696 2.608v0a1.913 1.913 0 010 3.314v0a1.904 1.904 0 00-.696 2.6v0l.632 1.089a1.913 1.913 0 002.608.741v0a1.895 1.895 0 012.6.696c.164.277.253.593.256.915v0c0 1.056.857 1.913 1.913 1.913h1.254c1.053 0 1.908-.85 1.913-1.904v0a1.904 1.904 0 011.913-1.913c.322.009.636.097.916.256v0a1.913 1.913 0 002.608-.695v0l.66-1.099a1.904 1.904 0 00-.696-2.608v0a1.904 1.904 0 01-.696-2.61c.166-.289.406-.529.696-.695v0a1.913 1.913 0 00.695-2.6v0-.008z"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <circle
                cx={12.175}
                cy={11.889}
                r={2.636}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};
