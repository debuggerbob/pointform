import React, { useState, useEffect } from "react";

import { EmptyState } from "../createPageCommon/EmptyState/Index";
import { QuestionInput } from "../createPageCommon/QuestionInput";
import { Mcq } from "../createPageCommon/Options/Mcq";
import { Checkbox } from "@/components/checkbox";
import { SidebarQuestionCard } from "./SidebarQuestionCard";

/* SuperState Type */
import { State } from "../index";

import styles from "./styles/Index.module.scss";
import { ChooseQuestionType } from "../createPageCommon/ChooseQuestionType/Index";
import { Tf } from "../createPageCommon/Options/Tf";

interface Props {
    superState: State;
    dispatch: any;
}

export const Desktop: React.FC<Props> = ({ superState, dispatch }) => {
    // It is set to "0" index by default -- Programmer 1 :)
    const [addQuestionIdx, setAddQuestionIdx] = useState<number>();

    /* Some variables to make life easy -- Programmer 1 */
    const questionListObj = superState.questionList;
    const questionList = superState.questionList[superState.currentQuestionId];

    const handleShowQuestion = () => {
        dispatch({
            type: "showChooseQuestion",
        });
    };

    return (
        <div className={styles.container}>
            {/* Sidebar 
			---------------------- */}
            <div className={styles.sidebar}>
                <div className={styles.sidebar__wrapper}>
                    {/*  Map over questionList to show the number of questions 
					---- using "SidebarQuestionCard" component*/}
                    {questionListObj.map((item) => {
                        let currentIdx = questionListObj.findIndex(
                            (obj) => obj.questionId == item.questionId
                        );

                        return (
                            <SidebarQuestionCard
                                key={item.questionId}
                                currentIndex={currentIdx}
                                question={item.question}
                                questionId={item.questionId}
                                setAddQuestionIdx={setAddQuestionIdx}
                                dispatch={dispatch}
                            />
                        );
                    })}

                    <button
                        className={styles.add_question}
                        onClick={handleShowQuestion}
                    >
                        <svg
                            className={
                                superState.showChooseQuestionScreen
                                    ? `${styles.svg} ${styles.show_choose_ques_screen}`
                                    : styles.svg
                            }
                            width={30}
                            height={30}
                            fill="none"
                        >
                            <rect
                                width={30}
                                height={30}
                                rx={15}
                                fill="#215FF0"
                            />
                            <path
                                d="M15 9.75v10.5M9.75 15h10.5"
                                stroke="#fff"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>

                        <span>Add Question</span>
                    </button>
                </div>
            </div>

            {/* Main Content 
			---------------------- */}
            <main className={styles.main}>
                {/* List for the user to choose question type... */}
                <ChooseQuestionType
                    dispatchFn={dispatch}
                    addQuestionIndex={addQuestionIdx}
                    questionListLength={superState.questionList.length}
                    showChooseQuestion={superState.showChooseQuestionScreen}
                />

                {questionListObj.length === 0 ? (
                    <EmptyState
                        addQuestionFn={() =>
                            dispatch({ type: "showChooseQuestion" })
                        }
                    />
                ) : (
                    <>
                        <div className={styles.container_wrapper}>
                            <QuestionInput
                                question={questionList.question}
                                dispatchFn={dispatch}
                                currentIndex={superState.currentQuestionId}
                            />

                            <div className={styles.options_wrapper}>
                                {/* check for the option type and map over the options array if needed */}
                                {questionList.questionType === "MCQ" ? (
                                    <>
                                        {questionList.options.map((item) => {
                                            let optionIdx = questionListObj[
                                                superState.currentQuestionId
                                            ].options.findIndex(
                                                (obj) =>
                                                    obj.optionId ==
                                                    item.optionId
                                            );

                                            return (
                                                <Mcq
                                                    key={item.optionId}
                                                    id={item.optionId}
                                                    currentIndex={
                                                        superState.currentQuestionId
                                                    }
                                                    optionIndex={optionIdx}
                                                    optionValue={item.value}
                                                    scoreValue={item.score}
                                                    showScore={
                                                        questionList.showScore
                                                    }
                                                    dispatch={dispatch}
                                                />
                                            );
                                        })}

                                        <button
                                            type="button"
                                            className={styles.add_option_btn}
                                            onClick={() =>
                                                dispatch({
                                                    type: "addMcqOption",
                                                    currentIdx:
                                                        superState.currentQuestionId,
                                                })
                                            }
                                        >
                                            Add New choice
                                        </button>
                                    </>
                                ) : questionList.questionType === "TF" ? (
                                    <Tf
                                        currentIndex={
                                            superState.currentQuestionId
                                        }
                                        options={questionList.options}
                                        showScore={questionList.showScore}
                                        dispatch={dispatch}
                                    />
                                ) : null}
                            </div>

                            <div className={styles.footer}>
                                <div className={styles.col_1}>
                                    <div className={styles.score}>
                                        <Checkbox
                                            id={"score"}
                                            name={"score"}
                                            text="Score"
                                            checked={
                                                superState.questionList[
                                                    superState.currentQuestionId
                                                ].showScore
                                            }
                                            onChangeFn={() =>
                                                dispatch({
                                                    type: "showScore",
                                                    currentIdx:
                                                        superState.currentQuestionId,
                                                })
                                            }
                                        />
                                    </div>

                                    <div className={styles.required}>
                                        <Checkbox
                                            id={"required"}
                                            name={"required"}
                                            text="Required"
                                            checked={
                                                superState.questionList[
                                                    superState.currentQuestionId
                                                ].required
                                            }
                                            onChangeFn={() =>
                                                dispatch({
                                                    type: "isRequired",
                                                    currentIdx:
                                                        superState.currentQuestionId,
                                                })
                                            }
                                        />
                                    </div>
                                </div>

                                <div className={styles.col_2}>
                                    <button
                                        className={styles.add_new_question}
                                        onClick={handleShowQuestion}
                                    >
                                        Add New Question
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </main>
        </div>
    );
};
