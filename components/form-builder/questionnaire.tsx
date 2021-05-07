import { Dispatch } from "react";
import { question, Action } from "./index";

import { ContentEditable } from "./content-editable";
import { InputEditable } from "./block/input/input-editable";

interface Props {
    questionListLen: number;
    currentIndex: number;
    currentQuestion: question;
    dispatch: Dispatch<Action>;
}

export const Questionnarie: React.FC<Props> = ({
    questionListLen,
    currentIndex,
    currentQuestion,
    dispatch,
}) => {
    // Optimizations pending for different key combinations
    const inputHandler = (e: any) => {
        if (e.target.innerHTML === "<br>") {
            e.target.innerHTML = "";
        } else {
            console.log(e.target.textContent);

            dispatch({
                type: "changeQuestionTitle",
                questionIndex: currentIndex,
                value: e.target.textContent,
            });
        }
    };

    const optionsInputHandler = (e: any, optionIndex: number) => {
        if (e.target.innerHTML === "<br>") {
            e.target.innerHTML = "";
        } else {
            dispatch({
                type: "changeOptionValue",
                currentIndex: currentIndex,
                optionIndex: optionIndex,
                value: e.target.textContent,
            });
        }
    };

    const addOption = () => {
        dispatch({
            type: "addMcqOption",
            questionIndex: currentIndex,
        });
    };

    return (
        <div
            className={` ${
                questionListLen === 0 || questionListLen === undefined
                    ? "hidden"
                    : null
            }`}
        >
            <div className="question_container">
                {/* Question Container
					------------------------- */}
                <div className="group relative mb-3.5 inline-flex">
                    {/* Buttons container */}
                    <div
                        className=" absolute -top-9px bg-white flex justify-end transition duration-150 md:opacity-0 md:-top-0.5 group-hover:opacity-100"
                        style={{ width: "100px", left: "-100px" }}
                    >
                        {/* Seetings button */}
                        <div className="px-1 py-2 hidden md:block">
                            <svg
                                width={24}
                                height={24}
                                fill="none"
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
                        </div>

                        {/* Add Button */}
                        <div className="add px-1 py-2 hidden md:block">
                            <svg
                                width={24}
                                height={24}
                                fill="none"
                                className="stroke-current text-gray-500 cursor-pointer transition hover:text-gray-900"
                            >
                                <path
                                    d="M12 5v14M5 12h14"
                                    strokeWidth={1.5}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>

                        {/* Menu button */}
                        <div className="menu px-1 py-2">
                            <svg
                                width={24}
                                height={24}
                                fill="none"
                                className="fill-current text-gray-500 cursor-pointer transition hover:text-gray-900"
                            >
                                <path d="M15.75 7.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM15.75 13.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM15.75 19.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM9 7.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM9 13.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM9 19.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                            </svg>
                        </div>
                    </div>

                    {/* Question container */}
                    <ContentEditable
                        styleClasses="question_title font-medium text-xl leading-5 sm:text-2xl text-black"
                        inputHandler={inputHandler}
                    />

                    <span className="absolute -top-1 -right-4  text-red-500 text-xl">
                        *
                    </span>
                </div>

                <div
                    suppressContentEditableWarning={true}
                    tabIndex={0}
                    className="text-sm font-body text-gray-700 mb-8 md:text-base"
                >
                    Description (optional)
                </div>

                <div className="answer_container">
                    <div className="options">
                        {currentQuestion.options.map((item) => {
                            let optionIndex = currentQuestion.options.findIndex(
                                (obj) => obj.optionId == item.optionId
                            );

                            return (
                                <InputEditable
                                    key={item.optionId}
                                    index={optionIndex}
                                    value={item.value}
                                    inputHandler={optionsInputHandler}
                                />
                            );
                        })}

                        <div
                            className="option group flex items-center pl-2.5 pr-4 py-2 mb-3 border border-gray-200 rounded w-max cursor-pointer transition hover:border-gray-500"
                            style={{ minHeight: "35px" }}
                            onClick={addOption}
                        >
                            <div
                                className="flex items-center justify-center mr-4 font-bold text-xs text-white bg-gray-400 rounded transition group-hover:bg-gray-800"
                                style={{ width: "20px", height: "20px" }}
                            >
                                {String.fromCharCode(
                                    "A".charCodeAt(0) +
                                        currentQuestion.options.length
                                )}
                            </div>

                            <div className="font-body text-gray-400 tracking-wide transition group-hover:text-gray-800">
                                Add option
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
