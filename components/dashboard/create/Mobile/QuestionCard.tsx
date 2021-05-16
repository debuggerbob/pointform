/* Styles */
import styles from "./styles/QuestionCard.module.scss";

/* Components */
import { Checkbox } from "@/components/checkbox";
import { QuestionInput } from "../createPageCommon/QuestionInput";
import { Mcq } from "../createPageCommon/Options/Mcq";
import { Tf } from "../createPageCommon/Options/Tf";

interface Props {
    superDispatch: any;
    currentIndex: number;
    currentQuestion: {
        questionId: number;
        questionType: string;
        question: string;
        options: {
            optionId: number;
            value: string;
            score: number;
        }[];
        showScore: boolean;
        required: boolean;
    };
}

export const QuestionCard: React.FC<Props> = ({
    superDispatch,
    currentIndex,
    currentQuestion: { questionType, question, options, showScore, required },
}) => {
    const handleAddQuestion = () => {
        superDispatch({ type: "showChooseQuestion" });
    };

    return (
        <div className={styles.question_card_wrapper}>
            <div className={styles.question_card}>
                <form className={styles.form_container}>
                    <QuestionInput
                        question={question}
                        dispatchFn={superDispatch}
                        currentIndex={currentIndex}
                    />

                    <div className={styles.mcq}>
                        <div className={styles.options_wrapper}>
                            {questionType === "MCQ" ? (
                                <>
                                    {options.map((item) => {
                                        let optionIdx = options.findIndex(
                                            (obj) =>
                                                obj.optionId == item.optionId
                                        );

                                        return (
                                            <Mcq
                                                key={item.optionId}
                                                id={item.optionId}
                                                currentIndex={currentIndex}
                                                optionIndex={optionIdx}
                                                optionValue={item.value}
                                                scoreValue={item.score}
                                                dispatch={superDispatch}
                                                showScore={showScore}
                                            />
                                        );
                                    })}
                                    <button
                                        type="button"
                                        className={styles.add_option_btn}
                                        onClick={() =>
                                            superDispatch({
                                                type: "addMcqOption",
                                                currentIdx: currentIndex,
                                            })
                                        }
                                    >
                                        Add New choice
                                    </button>
                                </>
                            ) : questionType === "TF" ? (
                                <Tf
                                    currentIndex={currentIndex}
                                    dispatch={superDispatch}
                                    options={options}
                                    showScore={showScore}
                                />
                            ) : null}
                        </div>
                    </div>
                </form>

                <div className={styles.form_bottom}>
                    <div className={styles.row_1}>
                        <div className={styles.score}>
                            <Checkbox
                                id={"score"}
                                name={"score"}
                                text="Score"
                                onChangeFn={() =>
                                    superDispatch({
                                        type: "showScore",
                                        currentIdx: currentIndex,
                                    })
                                }
                            />
                        </div>

                        <div className={styles.required}>
                            <Checkbox
                                id={"required"}
                                name={"required"}
                                text="Required"
                                onChangeFn={() =>
                                    superDispatch({
                                        type: "isRequired",
                                        currentIdx: currentIndex,
                                    })
                                }
                            />
                        </div>
                    </div>

                    <div className={styles.row_2}>
                        <div className={styles.add_new_question}>
                            <button
                                className={styles.add_new_question__btn}
                                onClick={handleAddQuestion}
                            >
                                Add New Question
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
