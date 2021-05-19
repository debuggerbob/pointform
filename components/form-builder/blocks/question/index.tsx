import React, { Dispatch, useState } from "react";

import {
    Action,
    DeleteType,
    Question,
    ToggleType,
    UpdateType,
} from "@/types/form-builder";
import { Delete, Toggle } from "@/store/form-builder/action";
import { AddSVG, DeleteSVG, TwoRowMenuSVG } from "@/components/svgs";

import { ContentEditable } from "../content-editable";
import { McqOption } from "../options/mcq";
import { FloatingSettings } from "./floating-settings";

interface Props {
    question: Question;
    questionIndex: number;
    dispatch: Dispatch<Action>;
}

export const FormQuestion: React.FC<Props> = ({
    question,
    questionIndex,
    dispatch,
}) => {
    const [questionSettings, setQuestionSettings] = useState({
        showSettings: false,
        topPos: 0,
        leftPos: 0,
    });

    const showQuestionSettings = (e) => {
        let rect = e.currentTarget.getBoundingClientRect();

        setQuestionSettings(() => ({
            showSettings: true,
            topPos: rect.top,
            leftPos: rect.left,
        }));
    };

    const AddQuestion = () => {
        dispatch(Toggle(ToggleType.ChooseQuestion, questionIndex));
    };

    const DeleteQuestion = () => {
        dispatch(
            Delete({
                type: DeleteType.Question,
                questionId: question.questionId,
            })
        );
    };

    return (
        <>
            <div className="question_container mt-9 first:mt-0">
                {/* Question Block */}
                <div className="group relative mb-3.5 inline-flex items-start">
                    {/* Buttons container */}
                    <div
                        className={`absolute bg-white flex justify-end ${
                            questionSettings.showSettings
                                ? "opacity-1"
                                : "  md:opacity-0"
                        } transition duration-150 group-hover:opacity-100`}
                        style={{ width: "100px", left: "-100px" }}
                    >
                        {/* Delete Button */}
                        <div
                            className={`hidden md:block p-1 pt-0.5 sm:py-1`}
                            onClick={DeleteQuestion}
                        >
                            <DeleteSVG />
                        </div>

                        {/* Add Button */}
                        <div
                            className={`hidden md:block p-1 pt-0.5 sm:py-1`}
                            onClick={AddQuestion}
                        >
                            <AddSVG />
                        </div>

                        {/* Menu button */}
                        <div
                            className={` p-1 pt-0.5 sm:py-1`}
                            onClick={showQuestionSettings}
                        >
                            <TwoRowMenuSVG />
                        </div>
                    </div>

                    {/* Question */}
                    <ContentEditable
                        className="font-semibold text-xl max-w-xl sm:text-2xl text-gray-800"
                        placeHolder="Start typing..."
                        type={UpdateType.Question}
                        questionIndex={questionIndex}
                        dispatch={dispatch}
                    />

                    <span className="absolute -top-1 -right-4  text-red-500 text-xl">
                        *
                    </span>
                </div>

                {/* Description Block */}
                <ContentEditable
                    className="text-sm font-body text-gray-700 mb-6 md:text-base"
                    placeHolder="Description (optional)"
                    type={UpdateType.Description}
                    questionIndex={questionIndex}
                    dispatch={dispatch}
                />

                {/* Options Block */}
                <div className="options">
                    {question.questionType === "MCQ" ? (
                        <>
                            {question.options.map((item) => {
                                let index = question.options.findIndex(
                                    (obj) => obj.optionId === item.optionId
                                );

                                return (
                                    <McqOption
                                        key={item.optionId}
                                        index={index}
                                        optionId={item.optionId}
                                        questionId={question.questionId}
                                        questionIndex={questionIndex}
                                        isAddOptionBtn={false}
                                        dispatch={dispatch}
                                    />
                                );
                            })}

                            <McqOption
                                index={question.options.length}
                                questionIndex={questionIndex}
                                isAddOptionBtn={true}
                                dispatch={dispatch}
                            />
                        </>
                    ) : (
                        "tf option"
                    )}
                </div>
            </div>

            {questionSettings.showSettings ? (
                <FloatingSettings
                    questionId={question.questionId}
                    questionIndex={questionIndex}
                    topPos={questionSettings.topPos}
                    leftPos={questionSettings.leftPos}
                    showScore={question.showScore}
                    isRequired={question.required}
                    dispatch={dispatch}
                    setQuestionSettings={setQuestionSettings}
                />
            ) : null}
        </>
    );
};
