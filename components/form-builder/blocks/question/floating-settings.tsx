import React, { Dispatch, SetStateAction } from "react";

import { Action, AddType, DeleteType, ToggleType } from "@/types/form-builder";

import { ToggleBtn } from "@/components/buttons/toggle";
import { Add, Delete, Toggle } from "@/store/form-builder/action";
import { AddSVG, DeleteSVG } from "@/components/svgs";

export const FloatingSettings = ({
    questionIndex,
    questionId,
    topPos,
    leftPos,
    showScore,
    isRequired,
    dispatch,
    setQuestionSettings,
}: {
    questionIndex: number;
    questionId: number;
    topPos: number;
    leftPos: number;
    showScore: boolean;
    isRequired: boolean;
    dispatch: Dispatch<Action>;
    setQuestionSettings: Dispatch<
        SetStateAction<{
            showSettings: boolean;
            topPos: number;
            leftPos: number;
        }>
    >;
}) => {
    const AddQuestion = () => {
        dispatch(Toggle(ToggleType.ChooseQuestion, questionIndex));
    };

    const DeleteQuestion = () => {
        dispatch(Delete({ type: DeleteType.Question, questionId: questionId }));
    };

    return (
        <>
            <div
                className="fixed left-0 top-0 bg-transparent w-full h-full z-40"
                onClick={() =>
                    setQuestionSettings((prevState) => ({
                        ...prevState,
                        showSettings: false,
                    }))
                }
            ></div>

            <div
                className="absolute bg-white shadow-lg pt-4 pb-3.5 rounded z-50"
                style={{
                    top: `${topPos + 40}px`,
                    left: `${leftPos}px`,
                    width: "300px",
                }}
            >
                <span className="block text-xs font-semibold text-gray-500 mb-1 p-4 tracking-wide">
                    QUESTION SETTINGS
                </span>

                <div className="group flex items-center px-4 py-3.5 border-b border-gray-200 cursor-pointer">
                    <AddSVG width={20} height={20} />
                    <span className="ml-4 group-hover:text-purple-700">
                        Insert Question below
                    </span>
                </div>

                <div
                    className="group flex items-center px-4 py-3.5 border-b border-gray-200 cursor-pointer"
                    onClick={DeleteQuestion}
                >
                    <DeleteSVG width={20} height={20} />

                    <span className="ml-4 group-hover:text-red-500">
                        Delete Current Question
                    </span>
                </div>

                <ToggleBtn
                    label="Score"
                    isOn={showScore}
                    toggleFunction={() =>
                        dispatch(Toggle(ToggleType.ShowScore, questionIndex))
                    }
                />

                <ToggleBtn
                    label="Required"
                    isOn={isRequired}
                    toggleFunction={() =>
                        dispatch(Toggle(ToggleType.IsRequired, questionIndex))
                    }
                />
            </div>
        </>
    );
};
