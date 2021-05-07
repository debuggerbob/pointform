import { useEffect } from "react";

interface Props {
    index: number;
    value: string;
    inputHandler: (e: any, optionIndex: number) => void;
}

export const InputEditable: React.FC<Props> = ({
    index,
    value,
    inputHandler,
}) => {
    return (
        <div
            className="option max-w-400 flex items-start pl-2.5 pr-4 py-2 mb-3 border border-gray-300 rounded w-max transition focus-within:border-gray-600"
            style={{ minHeight: "35px" }}
        >
            <div
                className="flex items-center justify-center font-bold text-xs   text-white bg-gray-800 rounded"
                style={{ minWidth: "20px", height: "20px" }}
            >
                {String.fromCharCode("A".charCodeAt(0) + index)}
            </div>

            <div
                id="mcq_option"
                className="pl-4 font-body text-gray-900 leading-5 tracking-wide"
                contentEditable="true"
                suppressContentEditableWarning={true}
                placeholder={`Choice ${index + 1}`}
                onInput={(e) => inputHandler(e, index)}
            ></div>

            <style jsx>{`
                #mcq_option {
                    flex-basis: calc(100% - 20px);
                }

                #mcq_option:empty::before {
                    content: attr(placeholder);
                    display: block;
                    cursor: text;
                    color: rgba(107, 114, 128, var(--tw-text-opacity));
                }
            `}</style>
        </div>
    );
};
