/* Styles */
import styles from "./Styles.module.scss";

interface Props {
    // Type has to be changed later
    dispatchFn: any;
    showChooseQuestion: boolean;
    addQuestionIndex?: number;
    questionListLength?: number;
}

export const ChooseQuestionType: React.FC<Props> = ({
    dispatchFn,
    showChooseQuestion,
    addQuestionIndex,
    questionListLength,
}) => {
    const handleOptionClick = (quesType: string) => {
        addQuestionIndex
            ? dispatchFn({
                  type: "addQuestionAtIndex",
                  index: addQuestionIndex,
                  questionType: quesType,
              })
            : dispatchFn({
                  type: "addQuestion",
                  questionType: quesType,
              });

        if (questionListLength > 0) {
            dispatchFn({
                type: "setCurrentQuestionId",
                id: questionListLength,
            });
        }
        dispatchFn({ type: "showChooseQuestion" });
    };

    return (
        <div
            className={
                showChooseQuestion
                    ? `${styles.question_type} ${styles.show}`
                    : `${styles.question_type}`
            }
        >
            <h3 className={styles.question_type__heading}>
                Choose Question Type
            </h3>

            <ul className={styles.question_type__options_list}>
                <li
                    className={styles.option_type}
                    onClick={() => handleOptionClick("MCQ")}
                >
                    <svg width={24} height={23} fill="none">
                        <path
                            d="M0 5.268v1.927a1 1 0 001 1h6.195a1 1 0 001-1V1a1 1 0 00-1-1H1a1 1 0 00-1 1v4.268zm7.024 0v.756a1 1 0 01-1 1H2.17a1 1 0 01-1-1V2.171a1 1 0 011-1h3.854a1 1 0 011 1v3.097zM21.812 4.683h-10.69a.585.585 0 100 1.17h10.69a.585.585 0 100-1.17zM23.415.585H11.122a.585.585 0 100 1.171h12.293a.585.585 0 000-1.17zM0 19.317v1.927a1 1 0 001 1h6.195a1 1 0 001-1v-6.195a1 1 0 00-1-1H1a1 1 0 00-1 1v4.268zm7.024 0v.756a1 1 0 01-1 1H2.17a1 1 0 01-1-1V16.22a1 1 0 011-1h3.854a1 1 0 011 1v3.098zM21.812 18.732h-10.69a.585.585 0 000 1.17h10.69a.585.585 0 100-1.17zM23.415 14.634H11.122a.585.585 0 100 1.17h12.293a.585.585 0 000-1.17z"
                            fill="#656565"
                        />
                    </svg>

                    <span className={styles.option_type__name}>
                        Multiple Choice
                    </span>
                </li>

                <li
                    className={styles.option_type}
                    onClick={() => handleOptionClick("TF")}
                >
                    <svg width={24} height={24} fill="none">
                        <path
                            d="M16.5 10l-3-3 .91-.95 2.12 2.12 4.24-4.24L21.5 5l-5 5zM11 7H2v1.5h9V7zm9 7l-1-1-2 2-2.083-1.736-1 .91L16 16l-2.083 2.083 1 1L17 17l2.083 2.083 1-1L18 16l2-2zm-9 1.5H2V17h9v-1.5z"
                            fill="#656565"
                        />
                    </svg>

                    <span className={styles.option_type__name}>
                        True or False
                    </span>
                </li>
            </ul>
        </div>
    );
};
