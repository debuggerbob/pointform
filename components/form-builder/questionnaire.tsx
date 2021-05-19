import { Dispatch, useState } from "react";

import { Action, Question, UpdateType } from "@/types/form-builder";
import { Update } from "@/store/form-builder/action";

/* Components */
import { FormQuestion } from "./blocks/question";

interface Props {
    questionList: Question[];
    dispatch: Dispatch<Action>;
}

export const Questionnarie: React.FC<Props> = ({ questionList, dispatch }) => {
    const [questionSettings, setQuestionSettings] = useState({
        showSettings: false,
        topPos: 0,
        leftPos: 0,
    });

    // const optionsInputHandler = (e: any, optionIndex: number) => {
    //     if (e.target.innerHTML === "<br>") {
    //         e.target.innerHTML = "";
    //     } else {
    //         dispatch({
    //             type: "changeOptionValue",
    //             currentIndex: currentIndex,
    //             optionIndex: optionIndex,
    //             value: e.target.textContent,
    //         });
    //     }
    // };

    // const addOption = () => {
    //     dispatch({
    //         type: "addMcqOption",
    //         questionIndex: currentIndex,
    //     });
    // };

    return (
        <>
            <div
                className={` ${
                    questionList.length === 0 ||
                    questionList.length === undefined
                        ? "hidden"
                        : null
                }`}
            >
                {questionList.map((item) => {
                    let questionIndex = questionList.findIndex(
                        (element) => item.questionId === element.questionId
                    );

                    return (
                        <FormQuestion
                            key={item.questionId}
                            question={item}
                            questionIndex={questionIndex}
                            dispatch={dispatch}
                        />
                    );
                })}
            </div>
        </>
    );
};
