import { useRef, useEffect, useState } from "react";
import gsap from "gsap";

import styles from "./styles/Quiz.module.scss";
import { Mcq } from "./options/Mcq";
import { Tf } from "./options/Tf";

interface Props {
    quizTitle: string;
    questionsList: {
        question: string;
        questionId: number;
        questionType: string;
        options: { optionId: number; value: string; score: number }[];
    }[];
    userAnswers: {
        questionId: number;
        choosenAnswer: any;
    }[];
    currentIndex: number;
    dispatchFn: any;
}

export const Quiz: React.FC<Props> = ({
    quizTitle,
    questionsList,
    userAnswers,
    currentIndex,
    dispatchFn,
}) => {
    const main_container = useRef<HTMLDivElement>();
    const question_wrapper = useRef<HTMLDivElement>();

    useEffect(() => {
        const tl = gsap.timeline();
        tl.to(main_container.current, {
            opacity: 1,
            duration: 0.6,
            ease: "power1",
        });
        tl.to(question_wrapper.current, {
            opacity: 1,
            translateY: 0,
            duration: 0.5,
            ease: "power1",
        });
    }, []);

    /* Animate the "Question Wrapper" when user moves among questions. */
    useEffect(() => {
        gsap.set(question_wrapper.current, { translateY: "100px", opacity: 0 });
        gsap.to(question_wrapper.current, {
            opacity: 1,
            translateY: 0,
            duration: 0.5,
            ease: "power1",
        });
    }, [currentIndex]);

    /* Common Props to MCQ, TF, Text components
    -----------------------------------*/
    const commonProps = {
        currentIndex: currentIndex,
        questionId: questionsList[currentIndex].questionId,
        dispatchFn: dispatchFn,
        options: questionsList[currentIndex].options,
    };

    /* Varibale to make life easy */
    const currentQuestionType = questionsList[currentIndex].questionType;

    return (
        <div ref={main_container} className={styles.container}>
            <header className={styles.header}>
                <div className={styles.col__1}>
                    <div onClick={() => dispatchFn({ type: "basicDetails" })}>
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M12.5 15L7.5 10L12.5 5"
                                stroke="#8C8C8C"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>

                    <span className={styles.col_1__qui_title}>{quizTitle}</span>
                </div>
            </header>

            <div className={styles.question_count_wrapper}>
                <ul>
                    {/* Rendering "Question Count" */}
                    {questionsList.map((item) => {
                        let currentElementIndex = questionsList.findIndex(
                            (obj) => obj.question === item.question
                        );

                        return (
                            <li
                                key={item.question}
                                className={
                                    currentIndex === currentElementIndex
                                        ? `${styles.question_count} ${styles.active}`
                                        : styles.question_count
                                }
                                onClick={() =>
                                    dispatchFn({
                                        type: "changeCurrentIdx",
                                        toIndex: currentElementIndex,
                                    })
                                }
                            >
                                <span className={styles.currnet_count}>
                                    {currentElementIndex + 1}
                                </span>
                            </li>
                        );
                    })}
                </ul>
            </div>

            <div className={styles.content}>
                <div ref={question_wrapper} className={styles.question_wrapper}>
                    <h2 className={styles.question}>
                        {questionsList[currentIndex].question}
                    </h2>

                    <div className={styles.option_wrapper}>
                        {/* Rendering "option" depending on the 'Question type' */}
                        {currentQuestionType === "MCQ" ? (
                            <Mcq
                                {...commonProps}
                                /* using "?" to check if the value is defined or not */
                                selectedOptionId={
                                    userAnswers[currentIndex]?.choosenAnswer
                                }
                            />
                        ) : currentQuestionType === "TF" ? (
                            <Tf
                                {...commonProps}
                                /* using "?" to check if the value is defined or not */
                                selectedOptionId={
                                    userAnswers[currentIndex]?.choosenAnswer
                                }
                            />
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
};
