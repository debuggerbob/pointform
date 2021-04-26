import { useState } from "react";

import styles from "../styles/Quiz.module.scss";

interface Props {
    currentIndex: number;
    questionId: number;
    options: { optionId: number; value: string; score: number }[];
    selectedOptionId: number;
    dispatchFn: any;
}

export const Mcq: React.FC<Props> = ({
    options,
    dispatchFn,
    currentIndex,
    questionId,
    selectedOptionId,
}) => {
    const handleClick = (optionId: number, points: number) => {
        dispatchFn({
            type: "changeUserAnswers",
            index: currentIndex,
            optionId: optionId,
            questionId: questionId,
        });

        setTimeout(() => {
            dispatchFn({ type: "increaseCurrentIdx" });
        }, 450);

        if (points != 0) {
            dispatchFn({ type: "incrementScore", incrementValue: points });
        }
    };

    return (
        <div className={styles.mcq}>
            <ul>
                {options.map((item) => {
                    return (
                        <li
                            key={item.optionId}
                            className={
                                selectedOptionId != undefined &&
                                selectedOptionId === item.optionId
                                    ? `${styles.li} ${styles.selected}`
                                    : styles.li
                            }
                            onClick={() =>
                                handleClick(item.optionId, item.score)
                            }
                        >
                            <span className={styles.circle_icon}></span>
                            <span className={styles.option_value}>
                                {item.value}
                            </span>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
