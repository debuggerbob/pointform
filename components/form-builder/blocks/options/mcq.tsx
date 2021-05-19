import { DeleteSVG } from "@/components/svgs";
import { Add, Delete } from "@/store/form-builder/action";
import {
    Action,
    AddType,
    DeleteType,
    QuestionType,
    UpdateType,
} from "@/types/form-builder";
import { Dispatch } from "react";
import { ContentEditable } from "../content-editable";

interface Props {
    index: number;
    questionIndex: number;
    questionId?: number;
    optionId?: number;
    isAddOptionBtn: boolean;
    dispatch: Dispatch<Action>;
}

export const McqOption: React.FC<Props> = ({
    index,
    questionIndex,
    questionId,
    optionId,
    isAddOptionBtn = false,
    dispatch,
}) => {
    const AddOption = () => {
        if (isAddOptionBtn) {
            dispatch(
                Add({
                    type: AddType.McqOption,
                    questionIndex: questionIndex,
                    questionType: QuestionType.Mcq,
                })
            );
        }
    };

    const DeleteOption = () => {
        if (questionIndex !== undefined && optionId !== undefined) {
            dispatch(
                Delete({
                    type: DeleteType.Mcq,
                    questionId: questionId,
                    questionIndex: questionIndex,
                    optionId: optionId,
                })
            );
        }
    };

    return (
        <>
            <div
                className={`mcq_input flex relative pl-2.5 pr-4 py-2 mb-3 border rounded w-max transition 
            ${
                isAddOptionBtn
                    ? "group items-center border-gray-200 cursor-pointer hover:border-gray-500"
                    : "max-w-400 items-start border-gray-300 focus-within:border-gray-600"
            } `}
                style={{ minHeight: "35px" }}
                onClick={AddOption}
            >
                {/* Column 1 */}
                <div
                    className={`flex items-center justify-center font-bold text-xs text-white rounded cursor-pointer transition
                 ${
                     isAddOptionBtn
                         ? "mr-4 bg-gray-400 group-hover:bg-gray-800"
                         : "bg-gray-800"
                 }`}
                    style={{
                        minWidth: "20px",
                        height: "20px",
                    }}
                >
                    {String.fromCharCode("A".charCodeAt(0) + index)}
                </div>

                {/* Column 2 */}
                {isAddOptionBtn ? (
                    <div
                        tabIndex={2}
                        className="font-body text-gray-400 tracking-wide transition group-hover:text-gray-800 focus:text-gray-800"
                    >
                        Add option
                    </div>
                ) : (
                    <ContentEditable
                        className="pl-4 font-body text-black leading-5 tracking-wide"
                        placeHolder={`Choice ${index + 1}`}
                        type={UpdateType.Mcq}
                        questionIndex={questionIndex}
                        optionIndex={index}
                        dispatch={dispatch}
                    />
                )}

                {/* show Delete button when not add option btn */}
                {!isAddOptionBtn ? (
                    <button
                        className="delete_btn absolute -left-8 opacity-0 transition"
                        onClick={DeleteOption}
                    >
                        <DeleteSVG width={20} height={20} />
                    </button>
                ) : null}
            </div>

            <style jsx>{`
                .mcq_input:hover .delete_btn,
                .mcq_input:focus-within .delete_btn {
                    opacity: 1;
                }
            `}</style>
        </>
    );
};
