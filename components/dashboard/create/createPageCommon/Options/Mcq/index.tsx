/* Styles */
import styles from "./Styles.module.scss";

interface Props {
    id: number;
    currentIndex: number;
    optionIndex: number;
    optionValue: string;
    scoreValue: number;
    showScore: boolean;
    dispatch: any;
}

export const Mcq: React.FC<Props> = ({
    id,
    currentIndex,
    optionIndex,
    optionValue,
    scoreValue,
    showScore,
    dispatch,
}) => {
    const handleScoreChange = (e: { target: { value: string } }) => {
        dispatch({
            type: "changeScoreValue",
            currentIdx: currentIndex,
            optionIdx: optionIndex,
            score: parseInt(e.target.value),
        });
    };

    const handleDelte = () => {
        dispatch({
            type: "deleteMcqOption",
            currentIdx: currentIndex,
            optionId: id,
        });
    };

    const handleOptionValue = (e: { target: { value: string } }) => {
        dispatch({
            type: "changeOptionValue",
            currentIdx: currentIndex,
            optionIdx: optionIndex,
            value: e.target.value,
        });
    };

    return (
        <div className={styles.option_input_wrapper}>
            <div className={styles.option_input}>
                <input
                    placeholder="Enter choice"
                    type="text"
                    className={styles.input}
                    value={optionValue}
                    onChange={handleOptionValue}
                />

                <button
                    className={styles.delete_btn}
                    type="button"
                    onClick={handleDelte}
                >
                    <svg width={18} height={18} fill="none">
                        <path
                            d="M14.494 7.101s-.408 5.051-.644 7.18c-.112 1.015-.74 1.61-1.768 1.63-1.957.035-3.916.037-5.872-.004-.99-.02-1.607-.623-1.717-1.622-.238-2.146-.643-7.184-.643-7.184M15.531 4.68H2.813M13.08 4.68a1.236 1.236 0 01-1.21-.993l-.183-.912a.96.96 0 00-.928-.712H7.584a.96.96 0 00-.927.712l-.183.912a1.236 1.236 0 01-1.21.993"
                            stroke="#767676"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
            </div>

            {showScore ? (
                <div className={styles.score_input}>
                    <span>Score :</span>
                    <input
                        type="number"
                        value={scoreValue.toString()}
                        onChange={handleScoreChange}
                    />
                </div>
            ) : null}
        </div>
    );
};
