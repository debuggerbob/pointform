import styles from "./Styles.module.scss";

interface Props {
    currentIndex: number;
    options: {
        optionId: number;
        value: string;
        score: number;
    }[];
    showScore: boolean;
    dispatch: any;
}

export const Tf: React.FC<Props> = ({
    currentIndex,
    options,
    showScore,
    dispatch,
}) => {
    const handleScoreChange = (e, optionIndex: number) => {
        dispatch({
            type: "changeScoreValue",
            currentIdx: currentIndex,
            optionIdx: optionIndex,
            score: parseInt(e.target.value),
        });
    };

    return (
        <div className={styles.true_false}>
            <div className={styles.true}>
                <button>
                    <svg width={50} height={50} fill="none">
                        <path
                            d="M14.583 20.833h-4.166A4.167 4.167 0 006.25 25v12.5c0 1.105.439 2.165 1.22 2.946.782.782 1.842 2.682 2.947 2.682l5.208.497h6.794c.331.083 2.043 0 2.383 0l6.996.125a4.166 4.166 0 003.73-2.304l7.29-14.583a4.165 4.165 0 00-3.726-6.03h-9.925V10.417A4.167 4.167 0 0025 6.25h-.198a1.885 1.885 0 00-1.885 1.885c0 1.488-.44 2.942-1.267 4.18l-7.067 8.772v22.239"
                            stroke="#5C5C5C"
                            strokeWidth={1.5}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                    <span className={styles.text}>True</span>
                </button>

                {showScore ? (
                    <div className={styles.score_input}>
                        <input
                            type="number"
                            value={options[0].score.toString()}
                            onChange={(e) => handleScoreChange(e, 0)}
                        />
                    </div>
                ) : null}
            </div>

            <div className={styles.false}>
                <button>
                    <svg width={50} height={50} fill="none">
                        <path
                            d="M20.833 29.167h-9.925a4.167 4.167 0 01-3.727-6.03l7.292-14.583A4.166 4.166 0 0118.2 6.25h8.37c.341 0 .68.042 1.01.125l5.754.498 1.04.07M20.832 29.166v10.416a4.167 4.167 0 004.167 4.167h.2a1.884 1.884 0 001.885-1.883c0-1.49.44-2.944 1.267-4.184l6.025-8.516m0 0h5.208A4.167 4.167 0 0043.75 25V12.5a4.167 4.167 0 00-1.22-2.946c-.782-.782-1.842-2.262-2.947-2.262l-5.208-.35m0 22.225V6.942"
                            stroke="#5C5C5C"
                            strokeWidth={1.5}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                    <span className={styles.text}>False</span>
                </button>

                {showScore ? (
                    <div className={styles.score_input}>
                        <input
                            type="number"
                            value={options[1].score.toString()}
                            onChange={(e) => handleScoreChange(e, 1)}
                        />
                    </div>
                ) : null}
            </div>
        </div>
    );
};
