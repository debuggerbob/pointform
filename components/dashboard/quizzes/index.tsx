import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";

// Components
import { QuizListItem } from "../common/ListOfQuizzes";

// Styles
import styles from "../../../styles/dashboard/index.module.scss";

interface Props {
	creatorData: {
		uid: string;
		email: string;
		name: string;
	};
}

export const Quizzes: React.FC<Props> = ({ creatorData }) => {
	const router = useRouter();
	const [quizzes, setQuizzes] = useState([]);

	console.log('c', creatorData)
	
	const fetcher = (args) => fetch(args).then((res) => res.json());
	const { data: quiz, error } = useSWR(
		`/api/quizzes/${creatorData?.uid}`,
		fetcher
	);

	const refreshData = () => {
		router.replace(router.asPath);
	};

	useEffect(() => {
		if (quiz) {
			setQuizzes(quiz.data);
			refreshData();
		}
	}, [quiz]);

	return (
		<>
			<h1 className={styles.heading}>Your Quizzes</h1>

			<ul className={styles.quiz_list__content}>
				{quizzes && quizzes.length > 0
					? quizzes.map((quiz) => (
						<QuizListItem
							key={quiz.id}
							quizTitle={quiz.title}
							updatedAt={quiz.lastUpdated}
							responses={quiz.responses}
							acceptingResponses={quiz.acceptingResponses}
						/>
						))
					: "No quizzes found!"}
			</ul>
		</>
	);
};
