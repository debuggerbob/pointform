import styles from "./Styles.module.scss";

interface Props {
	question: string;
	dispatchFn: any;
	currentIndex: number;
}

export const QuestionInput: React.FC<Props> = ({
	question,
	dispatchFn,
	currentIndex,
}) => {
	const handleChangeQuestion = (e: { target: { value: string } }) => {
		dispatchFn({
			type: "changeQuestionValue",
			value: e.target.value,
			currentIdx: currentIndex,
		});
	};

	return (
		<div className={styles.question_wrapper}>
			<input
				className={styles.input}
				type='text'
				value={question}
				placeholder='Type your question here...'
				onChange={handleChangeQuestion}
			/>

			<span
				className={
					question.length <= 0
						? `${styles.question_container} ${styles.inactive}`
						: `${styles.question_container}`
				}>
				{question.length <= 0 ? "Type your question here..." : question}
			</span>
		</div>
	);
};
