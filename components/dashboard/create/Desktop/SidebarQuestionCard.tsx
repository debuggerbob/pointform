import React from "react";
import styles from "./styles/Index.module.scss";

interface Props {
    currentIndex: number;
    question: string;
    questionId: number;
    setAddQuestionIdx: React.Dispatch<React.SetStateAction<number>>;
    dispatch: any;
}

export const SidebarQuestionCard: React.FC<Props> = ({
    currentIndex,
    question,
    questionId,
    setAddQuestionIdx,
    dispatch,
}) => {
    const handleAddQuestion = () => {
        dispatch({ type: "showChooseQuestion" });
        setAddQuestionIdx(currentIndex + 1);
    };

    return (
        <div className={styles.question_wrapper}>
            <div
                className={styles.question}
                onClick={() =>
                    dispatch({ type: "setCurrentQuestionId", id: currentIndex })
                }
            >
                <svg width="21" height="20" viewBox=" 0 0 24 23" fill="none">
                    <path
                        d="M0 5.268v1.927a1 1 0 001 1h6.195a1 1 0 001-1V1a1 1 0 00-1-1H1a1 1 0 00-1 1v4.268zm7.024 0v.756a1 1 0 01-1 1H2.17a1 1 0 01-1-1V2.171a1 1 0 011-1h3.854a1 1 0 011 1v3.097zM21.812 4.683h-10.69a.585.585 0 100 1.17h10.69a.585.585 0 100-1.17zM23.415.585H11.122a.585.585 0 100 1.171h12.293a.585.585 0 000-1.17zM0 19.317v1.927a1 1 0 001 1h6.195a1 1 0 001-1v-6.195a1 1 0 00-1-1H1a1 1 0 00-1 1v4.268zm7.024 0v.756a1 1 0 01-1 1H2.17a1 1 0 01-1-1V16.22a1 1 0 011-1h3.854a1 1 0 011 1v3.098zM21.812 18.732h-10.69a.585.585 0 000 1.17h10.69a.585.585 0 100-1.17zM23.415 14.634H11.122a.585.585 0 100 1.17h12.293a.585.585 0 000-1.17z"
                        fill="#656565"
                    ></path>
                </svg>

                <span>{question}</span>
            </div>

            <div className={styles.options_wrapper}>
                {/* Delete question option */}
                <a
                    className={styles.option}
                    onClick={() =>
                        dispatch({
                            type: "deleteQuestion",
                            questionId: questionId,
                        })
                    }
                >
                    <svg width={18} height={18} fill="none">
                        <path
                            d="M14.494 7.101s-.408 5.051-.644 7.18c-.112 1.015-.74 1.61-1.768 1.63-1.957.035-3.916.037-5.872-.004-.99-.02-1.607-.623-1.717-1.622-.238-2.146-.643-7.184-.643-7.184M15.531 4.68H2.813M13.08 4.68a1.236 1.236 0 01-1.21-.993l-.183-.912a.96.96 0 00-.928-.712H7.584a.96.96 0 00-.927.712l-.183.912a1.236 1.236 0 01-1.21.993"
                            strokeLinecap="round"
                            strokeWidth="1.5"
                            strokeLinejoin="round"
                        />
                    </svg>
                </a>

                {/* Add question option */}
                <a className={styles.option} onClick={handleAddQuestion}>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path
                            d="M9 3.75V14.25"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M3.75 9H14.25"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </a>
            </div>
        </div>
    );
};
