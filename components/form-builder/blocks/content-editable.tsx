import { Action, UpdateType } from "@/types/form-builder";
import { Dispatch } from "react";
import { handleInput } from "../../../utils/input-event-handler";

interface Props {
    className: string;
    placeHolder: string;
    type: UpdateType;
    questionIndex: number;
    optionIndex?: number;
    dispatch: Dispatch<Action>;
}

export const ContentEditable: React.FC<Props> = ({
    className,
    placeHolder,
    type,
    questionIndex,
    optionIndex,
    dispatch,
}) => {
    return (
        <>
            <div
                contentEditable="true"
                suppressContentEditableWarning={true}
                tabIndex={0}
                placeholder={placeHolder}
                dangerouslySetInnerHTML={{ __html: "" }}
                className={`content_editable ${className}`}
                onInput={(e) =>
                    handleInput({
                        e: e,
                        type: type,
                        questionIndex: questionIndex,
                        optionIndex: optionIndex,
                        dispatch: dispatch,
                    })
                }
            ></div>

            <style jsx>{`
                .content_editable:empty::before {
                    content: attr(placeholder);
                    display: block;
                    cursor: text;
                    color: rgba(107, 114, 128, var(--tw-text-opacity));
                }
            `}</style>
        </>
    );
};
