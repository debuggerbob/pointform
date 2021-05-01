import { useState, useEffect } from "react";

/* SuperState Type */
import { State } from "../index";

/* Main Components */
import { EmptyState } from "../createPageCommon/EmptyState/Index";
import { QuestionCard } from "./QuestionCard";
import { ChooseQuestionType } from "../createPageCommon/ChooseQuestionType/Index";

/* Styles */
import styles from "./styles/Index.module.scss";
import useSWR from "swr";
import generateFVID from "@/lib/generateFVID";

interface Props {
    superState: State;
    dispatch: any;
}

export const Mobile: React.FC<Props> = ({ superState, dispatch }) => {
    const getFetcher = (args) => fetch(args).then((res) => res.json());
    const { data: user, error } = useSWR(`/api/auth/verify`, getFetcher);

    const postFetcher = (args) =>
        fetch(args, {
            method: "POST",
            body: JSON.stringify({
                title: "Dummy Quiz",
                fvid: generateFVID(),
                userId: user.userId,
                questions: superState.questionList,
            }),
        }).then((res) => res.json());

    const { data: resp } = useSWR(`/api/form`, postFetcher);
    console.log(resp);

    return (
        <main
            className={`${styles.main} ${
                superState.questionList.length === 0 ? styles.empty : null
            }`}
        >
            <ChooseQuestionType
                dispatchFn={dispatch}
                showChooseQuestion={superState.showChooseQuestionScreen}
            />

            {superState.questionList.length === 0 ? (
                <EmptyState
                    addQuestionFn={() =>
                        dispatch({ type: "showChooseQuestion" })
                    }
                />
            ) : (
                <>
                    {superState.questionList.map((item) => {
                        let currentIdx = superState.questionList.findIndex(
                            (obj) => obj.questionId == item.questionId
                        );

                        return (
                            <QuestionCard
                                key={item.questionId}
                                superDispatch={dispatch}
                                currentIndex={currentIdx}
                                currentQuestion={
                                    superState.questionList[currentIdx]
                                }
                            />
                        );
                    })}
                    <button
                        className={
                            superState.showChooseQuestionScreen
                                ? `${styles.add_new_question__sticky_btn} ${styles.focused}`
                                : `${styles.add_new_question__sticky_btn}`
                        }
                        onClick={() => dispatch({ type: "showChooseQuestion" })}
                    >
                        <svg width={30} height={30} fill="none">
                            <path
                                d="M15 6.25v17.5M6.25 15h17.5"
                                stroke="#fff"
                                strokeWidth={3}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                </>
            )}
        </main>
    );
};
